<template>
    <van-button
        :icon="attitude ===1 ? 'good-job' :'good-job-o'"
        :class="{
          liked:attitude===1
        }"
        :loading="loading"
        @click="onCollect"
      />
</template>
<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
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
    attitude: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
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
        let status = -1
        if (this.attitude === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('update:attitude', status)
        this.$toast(status === 1 ? '点赞' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
  .liked{
    .van-icon{
      color:#e5645f;
    }
  }
</style>
