<template>
    <div class='login-container'>
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" title="登录">
        <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
      </van-nav-bar>
      <!-- 导航栏 -->

      <!-- 登录表单 -->
      <van-form @submit="onSubmit" ref="loginForm">
         <van-field
          name="mobile"
          placeholder="请输入手机号"
          v-model="user.mobile"
          type="number"
          maxlength="11"
          :rules="userFormRules.mobile"
        >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>

         <van-field
          name="code"
          placeholder="请输入验证码"
          v-model="user.code"
            type="number"
          maxlength="6"
           :rules="userFormRules.code"
         >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

           <template #button>
            <van-count-down
                :time="6000"
                format="ss 秒"
                @finish="isCountDownShow=false"
                v-if="isCountDownShow"
                />
              <van-button v-else @click="onSendSms" native-type="button" class="send-sms-btn" size="mini" round  type="default">获取验证码</van-button>
            </template>
          </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <!-- 登录表单 -->
    </div>

</template>
<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      userFormRules: {
        mobile: [{ required: true, message: '手机号不能为空' }, { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '验证码不能为空' }, { pattern: /^\d{6}$/, message: '验证码格式有误' }]
      },
      isCountDownShow: false
    }
  },
  created () {
  },
  components: {
  },
  props: {
  },
  watch: {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user

      // 2.表单验证

      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })

      //  3.提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或密码错误', err)
          this.$toast.fail('手机号或密码错误')
        } else {
          console.log('登录错误', err)
          this.$toast.fail('登录失败，请稍后重试')
        }
      }

      // 4.根据请求响应结果处理后续操作
    },
    async onSendSms () {
      try {
        this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败')
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true

      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功，注意接收')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送频繁，一分钟后重试')
        } else {
          this.$toast('发送失败，稍后重试')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container{
  .toutiao{
    font-size: 37px;
  }
  .send-sms-btn{
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
