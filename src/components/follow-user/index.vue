<template>
 <van-button
          v-if="isFollowed"
            class="follow-btn"
            round
            size="small"
             @click="onFollow"
             :loading="loading"
          >已关注</van-button>
          <van-button
          v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="loading"
            @click="onFollow"
          >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
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
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
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
    async onFollow () {
      this.loading = true
      try {
        if (this.isFollowed) {
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }
        // this.article.is_follwed = !this.is_follwed
        this.$emit('update:is-followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，稍后重试'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
