// index.js 
// 获取应用实例
const app = getApp()

import { request, ERR_OK } from "../../utils/util.js"
import getData from "../../config/api.js"
Page({
  data: {
    isSearchTap: false, // 是否点击搜索
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hot_title: '正在热映',
    hot_movies: [],
    hot_count: 0,
    comming_movies: [],
    comming_count: 0,
    comming_title: '即将上映'
  },
  onLoad() {
    this.setData({
      imgUrls: app.globalData.swiper_data
    })
    this._getMovies()
  },
  onShow() {
    this.setData({
      isSearchTap: false
    })
  },
  // 事件处理
  toSearch() {
    this.setData({
      isSearchTap: true
    })
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 获取电影
  _getMovies() {
    const params = { page: 1, page_size: 8 }
    getData.getMovies({
      ...params,
      type: 1
    }).then((res) => {
      if (res.code === ERR_OK) {
        this.setData({
          hot_movies: res.data.movies,
          hot_count: res.data.count
        })
      }
    })
    // 即将上映
    getData.getMovies({
      ...params,
      type: 0
    }).then((res) => {
      if (res.code === ERR_OK) {
        this.setData({
          comming_movies: res.data.movies,
          comming_count: res.data.count
        })
      }
    })
  },
  // block 组件事件
  more(e) {
    const type = e.currentTarget.dataset.type
    console.log(type, 'more')
    wx.navigateTo({
      url: './more/more?type=' + type,
    })
  },
  select(e) {
    console.log(e, 'selectIndex')
    wx.navigateTo({
      url: '../detail/detail?id=' + e.detail,
    })
  }
})