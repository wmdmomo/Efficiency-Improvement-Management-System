const baseURL = 'http://39.97.238.253:8080/test'
const timeout = 5000

function request(url, method, params) {
  console.log(params);

  wx.showLoading({
    title: '数据加载中ing',
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      // url: url,
      timeout: timeout,
      method: method == 'post' ? 'post' : 'get',
      data: params,
      success: function (res) {
        resolve(res.data.data)
      },
      fail: reject,
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}
export default request;