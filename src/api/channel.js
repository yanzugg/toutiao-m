import request from '@/utils/request'

// 获取所有频道
export const getAllChannels = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 添加用户频道
export const addUserChannel = channel => request({
  url: '/v1_0/user/channels',
  method: 'PATCH',
  data: {
    channels: [channel]
  }
})

// 删除用户频道
export const deleteUserChannel = channelId => request({
  url: `/v1_0/user/channels/${channelId}`,
  method: 'DELETE'
})
