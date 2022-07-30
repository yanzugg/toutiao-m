import request from '@/utils/request'

// 获取评论

export const getComments = params => request({
  url: '/v1_0/comments',
  method: 'GET',
  params
})

// 点赞评论
export const addCommentLike = target => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target
  }

})

// 取消点赞评论
export const deleteCommentLike = target => request({
  url: `/v1_0/comment/likings/${target} `,
  method: 'DELETE'

})

// 发布文章评论和回复
export const addComment = data => request({
  url: '/v1_0/comments',
  method: 'POST',
  data

})

