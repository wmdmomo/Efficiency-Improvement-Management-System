// pages/components/budget/budget.js
const app = getApp()
import {
  postBud
} from '../service/api'
Page({
  data: {
    budget: 500,
    btnblur: 0,
    had: 0
  },
  onLoad: function (option) {
    console.log(option)
    this.setData({
      had: option.had,
      budget: option.bud
    })
  },
  changeShow: function () {
    this.setData({
      btnblur: 1
    })
  },
  setSuc: async function () {
    this.setData({
      btnblur: 0
    })
    var res = await postBud(app.globalData.userInfo.nickName, this.data.budget)
    console.log(res)
    wx.reLaunch({
      url: '/pages/figure/figure?budget'
    })

  }
})