import request from '@/utils/request'
// import store from '@/store'

// 用户登录注册
export const login = data => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data
})

// 短信验证
export const sendSms = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'GET'
})

// 获取用户自己的信息
export const getUserInfo = () => request({
  url: '/v1_0/user',
  method: 'GET'
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})

// 获取用户频道
export const getUserChannels = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'

})

// 关注用户
export const addFollow = target => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target
  }

})

// 取消关注用户
export const deleteFollow = target => request({
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE'
})

// 获取用户个人资料
export const getUserProfile = ()=>request({
  url:'/v1_0/user/profile',
  method:'GET'
})

// 编辑用户个人资料
export const updateUserProfile = data =>request({
  url:'/v1_0/user/profile',
  method:'PATCH',
  data
})

// 更改用户头像
export const updateUserPhoto = data =>request({
  url:' /v1_0/user/photo',
  method:'PATCH',
  data
})