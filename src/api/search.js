import request from '@/utils/request'

// 获取搜索联想
export const getSearchSuggestions = q => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q
  }
})

// 获取搜索结果
export const getSearchResult = params => request({
  url: '/v1_0/search',
  method: 'GET',
  params

})
