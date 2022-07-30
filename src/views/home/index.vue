<template>
  <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search" to="/search">搜索</van-button>
      </van-nav-bar>

      <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
         <ArticleList :channel="channel">1</ArticleList>
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn" @click="ischannelEditShow=true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </van-tabs>

      <van-popup
          v-model="ischannelEditShow"
          closeable
          round
          position="bottom"
          close-icon-position="top-left"
          :style="{ height: '100%' }"
        >
         <ChannelEdit :my-channels="channels" :active="active" @update-active="onUpdateActive"></ChannelEdit>
        </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ChannelEdit from './component/channel-edit.vue'
import ArticleList from './component/article-list.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      ischannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const channels = []
        // const { data } = await getUserChannels()
        // this.channels = data.data.channels
        if (this.user) {
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            this.channels = localChannels
          } else {
            const { data } = await getUserChannels()
            this.channels = data.data.channels
          }
        }
        this.channles = channels
      } catch (err) {
        this.$toast('获取频道数据失败!稍后重试')
      }
    },
    onUpdateActive (index, ischannelEditShow) {
      this.active = index
      this.ischannelEditShow = ischannelEditShow
    }
  },
  components: { ArticleList, ChannelEdit }
}
</script>

<style scoped lang="less">
  .home-container{
    padding-bottom: 100px;
    padding-top:174px;
  /deep/ .van-nav-bar__title{
      max-width: unset;
    }
    .search-btn{
       width:555px ;
       height:64px ;
       background-color: #5babfb;
       font-size: 28px;
       border:none;
       .van-icon{
        font-size: 32px;
       }
    }
   /deep/ .channel-tabs{
    .van-tabs__content{
      min-height:79vh;
    }
    .van-tabs__wrap{
      position: fixed;
      top:92px;
      z-index: 1;
      left:0;
      right:0;
      height: 82px;
    }
    .van-tab{
        min-width:200px;
        border-right: 1px solid #edeff3;
        font-size: 30px;
        color:#777;
      }
      .van-tab--active{
        color:#333;
      }
      .van-tabs__nav{
        padding-bottom:0;
      }
      .van-tabs__line{
        bottom:8px;
        width:31px !important;
        height: 6px;
        background-color: #3296fa;
      }
   }
   .placeholder{
     width: 66px;
    height: 82px;
    flex-shrink: 0;
   }
   .hamburger-btn{
    position: fixed;
    right:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao{
      font-size: 33px;
    }
    &:before{
        content:'';
        position: absolute;
        left:0;
        width: 1px;
        height: 100%;
        background: url(@/assets/gradient-gray-line.png);
         background-size: contain;
    }
   }
  }
</style>
