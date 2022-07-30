<template>

      <van-button
        :icon="value ? 'star' :'star-o'"
        :class="{
          collected:value
        }"
        :loading="loading"
        @click="onCollect"
      />

</template>
<script>
import { deleteCollect, addCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  data () {
    return {
      loading: false
    }
  },
  created () {
  },
  components: {
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, Object, String],
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
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.$toast('操作失败')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
   .collected{
     .van-icon{
      color:#ffa500;
     }
   }
</style>
