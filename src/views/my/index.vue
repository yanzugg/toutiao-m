<template>
    <div class="my-container">
      <!-- 未登录 -->
      <div v-if="!user" class="header not-login">
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="@/assets/mobile.png" alt="">
          <span class="text">登录 / 注册</span>
        </div>
      </div>

      <!-- 已登录 -->
       <div v-else class="header user-info">
        <div class="base-info">
           <div class="left">
            <van-image
            fit="cover"
            round
            class="avatar"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
           </div>
           <div class="right">
            <van-button size="mini" to="/user/profile" round>编辑资料</van-button>
           </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">获赞</span>
          </div>
        </div>

        <van-grid class="grid-nav" :column-num="2" clickable>
            <van-grid-item class="grid-item">
              <i slot="icon" class="toutiao toutiao-shoucang"></i>
              <span slot="text" class="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
              <i slot="icon" class="toutiao toutiao-lishi"></i>
              <span slot="text" class="text">历史</span>
            </van-grid-item>
         </van-grid>

         <van-cell title="消息通知" is-link />
         <van-cell title="小智同学" is-link />
         <van-cell v-if="user" clickable @click="onLogout" title="退出登录" class="lgout-cell" />
       </div>
    </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '确认是否退出登录'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
          this.$toast.success('退出登录成功!')
        })
        .catch(() => {
          // on cancel
          this.$toast.fail('退出登录失败!稍后重试')
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取个人信息失败!稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .my-container{
    .header{
      height: 361px;
       background: url(@/assets/banner.png);
       background-size: cover;
    }
    .not-login{
       display: flex;
       justify-content: center;
       align-items: center;
       .login-btn{
        display: flex;
        flex-direction: column;
       justify-content: center;
       align-items: center;
       .mobile-img{
         height: 132px;
         width: 132px;
       }
       .text{
           font-size: 28px;
           margin-top: 15px;
           color:#fff
       }
       }
    }
     .user-info{
      .base-info{
         height: 231px;
         padding:76px 32px 23px;
         box-sizing: border-box;
         display: flex;
         align-items: center;
         justify-content: space-between;
       .left{
        display: flex;
        align-items: center;
        .avatar{
           width: 132px;
           height: 132px;
           margin-right: 23px;
           border: 3px solid #fff;
        }
        .name{
          font-size: 30px;
          color: #fff;
        }
       }
      }
      .data-stats{
        display: flex;
        .data-item{
         height: 130px;
          flex:1;
         display: flex;
         justify-content: center;
         align-items: center;
         flex-direction: column;
         color:#fff;
         .count{
          font-size: 36px;

         }
         .text{
          font-size: 23px;
         }
        }
      }
     }
     .grid-nav{
      .grid-item{
          height: 141px;
          i.toutiao{
            font-size: 45px;
          }
          .toutiao-shoucang{
            color:#eb5253;
          }
          .toutiao-lishi{
            color:#ff9d1d;
          }
          span.text{
            font-size: 28px;
          }
      }
     }
     .lgout-cell{
      text-align: center;
      color:#d86262;
      margin-top: 9px;
     }
  }
</style>
