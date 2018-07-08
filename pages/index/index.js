// index.js 
// 获取应用实例
const app = getApp()

import { request } from "../../utils/util.js"
import baseUrl from "../../config/api.js"
Page({
  data: {
    isSearchTap: false, // 是否点击搜索
  },
  onLoad(){
  },
  onShow(){
    wx.showToast('OBJECT')
    this.setData({
      isSearchTap: false
    })
  },
  // 事件处理
  toSearch(){
    this.setData({
      isSearchTap: true
    })
    wx.navigateTo({
      url: '../search/search',
    })
  }
})