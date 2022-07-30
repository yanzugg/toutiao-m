<template>
   <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check="false"
>
  <CommentItem @reply-click="$emit('reply-click',$event)" v-for="(item,index) in list" :key="index" :comment="item" />
</van-list>
</template>
<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'

export default {
  name: 'CommentList',
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  created () { 
    this.onLoad()
  },
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, Object, String],
      required: true
    },
    list:{
      type:Array,
      default:()=>([])
    },
    type:{
       type:String,
       validator(value){
        return ['a','c'].includes(value)
       },
       default:'a'
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
        const { data } = await getComments({
          type:this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        const { results } = data.data

        this.$emit('onload-success', data.data)
        this.list.push(...results)

        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {

      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
