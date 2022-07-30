<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class='channel-edit'>
      <van-cell  :border="false">
      <div slot="title" class="title-text">我的频道</div>
        <van-button size="mini" round plain type="danger" class="edit-btn" @click="isEdit=!isEdit">{{isEdit ? '完成' : '编辑'}} </van-button>
      </van-cell>
     <van-grid :gutter="10" class="my-grid">
        <van-grid-item @click="onMyChannelClick(channel,index)" class="grid-item" v-for="(channel,index)  in myChannels" :key="index" >
         <van-icon slot="icon" name="clear" v-show="isEdit && !fiexChannels.includes(channel.id)"></van-icon>
         <span slot="text" class="text" :class="{active:index===active}">{{channel.name}}</span>
        </van-grid-item>
      </van-grid>

       <van-cell  :border="false">
      <div slot="title" class="title-text">频道推荐</div>
      </van-cell>
     <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item icon="plus" class="grid-item" v-for="(channel,index) in recommendChannels" :key="index"  :text="channel.name" @click="onAddChannel(channel)"/>
      </van-grid>
    </div>
</template>
<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0]
    }
  },
  created () {
    this.loadAllChannels()
  },
  components: {
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  watch: {
  },
  mounted () {
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    async  onAddChannel (channel) {
      // eslint-disable-next-line vue/no-mutating-props
      this.myChannels.push(channel)

      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('保存失败! ')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1)
        }
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.myChannels.splice(index, 1)
        this.deleteChannel(channel)
      } else {
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('删除失败!')
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .channel-edit{
     padding:85px 0;
     .title-text{
      font-size: 32px;
      color:#333;
     }
     .edit-btn{
      width: 104px;
      height: 48px;
      font-size: 26px;
      color:#f85959;
      border:1px solid #f85959;
     }
     /deep/ .grid-item{
      width:160px;
      height: 86px;
     .van-grid-item__content{
      white-space: nowrap;
        background-color: #f4f5f6;
        .van-grid-item__text,.text{
          font-size: 28px;
          color:#222;
          margin-top: 0;
        }
        .active{
          color:red;
        }
        .van-grid-item__icon-wrapper{
          position: unset;
        }
      }
     }
     /deep/.my-grid{
      .grid-item{
        .van-icon-clear {
          position: absolute;
          right: -10px;
          top:-10px;
          font-size: 15px;
          z-index:2;
          color:#cacaca;
        }
      }
     }
    /deep/ .recommend-grid{
      .grid-item{
        .van-grid-item__content{
         flex-direction: row;
         .van-icon-plus{
          font-size: 28px;
          margin-right: 6px;
         }

        }
      }
     }
  }
</style>
