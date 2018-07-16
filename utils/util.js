const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 封装 微信请求
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve,reject){
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res){
        console.log(res, 'success')
        resolve(res)
      },
      fail: function(err){
        wx.showLoading({
          title: '出错啦',
        })
        reject(err)
      }
    })
  })
}

const gotoDetail = (e)=>{
  console.log(id, 'id')
  const id = e.currentTarget.dataset.id
  wx.navigateTo({
    url: `/pages/detail/detail?id=${id}`
  })
}
export const ERR_OK = 0
module.exports = {
  formatTime: formatTime,
  request: request,
  ERR_OK: ERR_OK,
  gotoDetail: gotoDetail
}
