import {
  request,
  ERR_OK,
  gotoDetail
} from "../../utils/util.js"
import getData from "../../config/api.js"
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKey: [], // 热门搜索
    historyArr: [], // 搜索历史
    movies: [],
    arr: {
      history: [

      ]
    }, // 临时
    timer: null
  },
  // 事件处理
  gotoDetail,
  getHotKey() {
    getData.getHotKey().then((res) => {
      console.log(res)
      if (res.code === ERR_OK) {
        this.setData({
          hotKey: res.data.movies
        })
      }

    })
  },
  // 搜索
  searchInp(e) {
    const hisVal = e.detail.value
    if (!hisVal) {
      return
    }
    console.log(hisVal, 'hisVal')
    this.timer = setTimeout(() => {
      // 存本地
      if (this.data.arr.history.length > 0 && hisVal === this.data.arr.history[this.data.arr.history.length - 1].title)     {
        console.log('error')
        this.data.arr.history.pop()
      }
      this.data.arr.history.push({
        title: hisVal,
        _id: ''
      })
      try {
        wx.setStorageSync('history', this.data.arr.history)
        let params = {
          q: hisVal
        }
        getData.searchMovie(params).then((res) => {
          if (res.code === ERR_OK) {
            this.setData({
              movies: res.data.movies
            })
          }
        })
        this.setData({
          historyArr: wx.getStorageSync('history')
        })
        console.log(this.data.historyArr, 'historyArr')
      } catch (e) {
        console.log(e)
      }
    }, 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotKey()
    this.setData({
      historyArr: wx.getStorageSync('history')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  // 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})