import request from '@/utils/request'

// 用户登陆
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // urlSearchParams用于将data组合后用tostring转换为字符串，详见mdn文档
    data: new URLSearchParams(data).toString()
  })
}
