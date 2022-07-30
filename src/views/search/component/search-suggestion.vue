<template>
    <div class='search-suggestion'>
       <van-cell @click="$emit('search',text)" v-for="(text,index) in Suggestions" :key="index"  icon="search">
       <div slot="title" v-html="highlight(text)"></div>
       </van-cell>

    </div>
</template>
<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      Suggestions: []
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
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.Suggestions = data.data.options
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>
<style lang="less" scoped>
.search-suggestion{
  /deep/.active{
    color:#3296fa;
  }
}
</style>
