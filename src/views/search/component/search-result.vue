<template>
    <div class='search-result'>
       <van-list
         v-model="loading"
         :finished="finished"
         finished-text="没有更多了"
         @load="onLoad"
         :error.sync="error"
         error-text="加载失败，请点击重试"
         >
         <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
         </van-list>
    </div>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20,
      error: false
    }
  },
  created () {
  },
  components: {
  },
  props: {
    searchText: {
      type: String,
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
    async  onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perpage,
          q: this.searchText
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
