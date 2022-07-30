<template>
    <div class='article-list'>

      <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh"  :success-text="refreshSuccessText" success-duration="1000">

      <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="onLoad"
        >
  <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
  <ArticleItem  v-for="(article,index) in list" :key="index" :article="article" ></ArticleItem>
</van-list>
</van-pull-refresh>
    </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },
  created () {
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
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
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        const { results } = data.data
        this.list.push(...results)
        this.isRefreshLoading = false
      } catch (err) {
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }

}
</script>
<style lang="less" scoped>
.article-list{
  height:80vh;
  overflow-y: auto;
}
</style>
