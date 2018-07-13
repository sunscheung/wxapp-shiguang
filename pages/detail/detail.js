// pages/detail/detail.js
import getData from "../../config/api.js"
import { request, ERR_OK } from "../../utils/util.js"
import dayjs from "../../utils/dayjs.min.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    relative_movies: [], // 相关推荐
    desc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id, 'options')
    this._getDetail(options.id)
    this._getRelative(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 事件处理
  _getDetail(id) {
    getData.getDetail(id).then(res => {
      if (res.code === ERR_OK) {
        this.setData({
          movie: res.data.movie,
          desc: this.getDesc(res.data.movie)
        })
      }
    })
  },
  // 获取相关推荐
  _getRelative(id) {
    getData.getRelative(id).then(res => {
      if(res.code === ERR_OK){
        console.log(res.data.movies, 'res.data.movies')
        this.setData({
          relative_movies: res.data.movies
        })
      }
    })
  },
  // 相关推荐点击跳转
  toDetail(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
  // computed
  getDesc(movie) {
    console.log(movie, 'this.movie')
    const length = movie.pubdate.length
    const duration = movie.duration || dayjs(movie.pubdate[length - 1].date).format('DD-MM')
    const rate = movie.rate ? `${movie.rate}分` : '即将上映'
    return `${rate} · ${movie.movieTypes.join(' ')} · ${duration}`
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})