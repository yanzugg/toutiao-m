<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div  v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail" >
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>

          <FollowUser class="follow-btn" :is-followed.sync="article.is_followed" :user-id="article.aut_id" ></FollowUser>
          <!-- <van-button
          v-if="!article.is_follwed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followloading"
            @click="onFollow"
          >关注</van-button>
          <van-button
          v-else
            class="follow-btn"
            round
            size="small"
             @click="onFollow"
             :loading="followloading"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="article-content" class="article-content markdown-body" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>

        <CommentList @reply-click="onReplyClick" :list="CommentList" @onload-success="totalCommentCount=$event.total_count" :source="article.art_id"></CommentList>

        <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow=true"
      >写评论</van-button>
      <van-icon
       class="comment-icon"
        name="comment-o"
        :info="totalCommentCount"
      />
      <CollectArticle :article-id="article.art_id" class="btn-item" v-model="article.is_collected"></CollectArticle>
      <!-- <van-icon
        color="#777"
        name="star-o"
      /> -->
      <LikeArticle class="btn-item" :attitude.sync="article.attitude" :article-id="article.art_id"></LikeArticle>
      <!-- <van-button
        color="#777"
        name="good-job-o"
      /> -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-popup
     v-model="isPostShow" 
     position="bottom" >
     <CommentPost :target="article.art_id" @post-success="onPostSuccess"></CommentPost>
    </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus===404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
     
     <van-popup
     v-model="isReplyShow" 
     position="bottom" 
     style="height:100%;"
     >
     <CommentReply v-if="isReplyShow" :comment="currentComment" @close="isReplyShow=false"></CommentReply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import CollectArticle from '@/components/collect-article/index.vue'
import LikeArticle from '@/components/like-article/index.vue'
import FollowUser from '@/components/follow-user/index.vue'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: { FollowUser, CollectArticle, LikeArticle, CommentList, CommentPost, CommentReply },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  provide: function () {
  return {
    articleId: this.articleId
  }
},
  data () {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      followloading: false,
      totalCommentCount: 0,
      isPostShow:false,
      CommentList:[],
      isReplyShow:false,
      currentComment:{}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.errStatus === 404) {
          this.errStatus = 404
        }
        console.log(err)
      }
      this.loading = false
    },
    previewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onPostSuccess(data){
      this.isPostShow = false
      this.CommentList.unshift(data.new_obj)
    },
     onReplyClick(comment){
      this.isReplyShow = true
      this.currentComment = comment
     }
  }
}
</script>

<style scoped lang="less">
@import url(./github-markdown.css);
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }
  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>
