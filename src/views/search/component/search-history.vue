<template>
    <div class='search-history'>
       <van-cell title="历史记录" >
        <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-historyies')">全部删除</span>
        &nbsp;
        &nbsp;
        <span @click="isDeleteShow=false">完成</span>
        </div>

        <van-icon  v-else @click="isDeleteShow=true" name="delete-o" />
       </van-cell>
       <van-cell v-for="(item,index) in serachHistories" :key="index" :title="item" @click="onSearchItemClick(item,index)">
        <van-icon v-show="isDeleteShow" name="close" />
       </van-cell>

    </div>
</template>
<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteShow: false
    }
  },
  created () {
  },
  components: {
  },
  props: {
    serachHistories: {
      type: Array,
      required: true
    }
  },
  watch: {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // eslint-disable-next-line vue/no-mutating-props
        this.serachHistories.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
