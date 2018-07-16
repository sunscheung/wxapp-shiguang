// pages/index/more/more.js
import { request, ERR_OK, gotoDetail } from "../../../utils/util.js"
import getData from "../../../config/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfo: ['即将上映', '正在热映'],
    activeIndex: 0,
    movies: [],
    state: 'begin',
    page: 1,
    max_page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(+options.type, '22')
    this._getMovies(+options.type)
    this.setData({
      activeIndex: +options.type
    })
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
  // shi见处理
  _toggleTabs(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index
    })
    wx.navigateTo({
      url: 'more?type=' + index
    })
  },
  // 更多点击跳转
  // toDetail(e) {
  //   const id = e.currentTarget.dataset.id
  //   wx.navigateTo({
  //     url: '../../detail/detail?id=' + id
  //   })
  // },
  gotoDetail,
  _getMovies(type) {
    let that = this
    this.setData({
      state: 'load'
    })
    setTimeout(() => { }, 1000)
    console.log(this.data, 'this.page')
    const params = {
      page: this.data.page,
      page_size: 8
    }
    getData.getMovies({
      ...params,
      type: type
    }).then((res) => {
      if (res.code === ERR_OK) {
        this.setData({
          movies: that.data.movies.concat(res.data.movies),
          max_page: Math.ceil(res.data.count / 10),
          state: 'end'
        })
      }
    })
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
    console.log('到底')
    let tmpPage = ++this.data.page
    console.log(tmpPage, 'tmpPage')
    this.setData({
      page: tmpPage
    })
    this._getMovies(this.data.activeIndex)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})