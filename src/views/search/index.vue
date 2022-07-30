<template>
    <div class='search-container'>
       <form action="/" class="search-form">
  <van-search
    v-model="searchText"
    show-action
    background="#3296fa"
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    @focus="isResultShow=false"
  />
</form>

     <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>

     <SearchSuggestion @search="onSearch" :searchText="searchText" v-else-if="searchText"></SearchSuggestion>

     <SearchHistory @search="onSearch" :serachHistories="serachHistories" v-else @clear-search-historyies="serachHistories=[]"></SearchHistory>

    </div>
</template>
<script>
import SearchHistory from './component/search-history.vue'
import SearchSuggestion from './component/search-suggestion.vue'
import SearchResult from './component/search-result.vue'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      serachHistories: getItem('TOUTIAO_SEARCH_HISTOR') || []
    }
  },
  created () {
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {
  },
  watch: {
    serachHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.serachHistories.indexOf(val)
      if (index !== -1) {
        this.serachHistories.splice(index, 1)
      }
      this.serachHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
  .search-container{
    padding-top:108px;
    .van-search__action{
      color:#fff;
    }
    .search-form{
      position: fixed;
      top:0;
      left:0;
      right:0;
      z-index:1;
    }
  }
</style>
