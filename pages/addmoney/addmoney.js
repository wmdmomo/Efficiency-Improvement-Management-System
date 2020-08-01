// pages/money/addmoney/addmoney.js
const app = getApp()
import {
  addMoney
} from './../service/api'
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: "0.00",
    time: '2020-07-30',
    switchlist: ["收入", "支出"],
    money: {
      name: '奖金',
      flag: 0,
      tag: 0,
      money: 0,
      time: '',
      remark: '',
      usr: '',
      year: '',
      month: '',
      day: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var r0 = util.formatYMD(new Date(), 1)
    var r1 = util.formatYMD(new Date(), 0)
    this.data.money["usr"] = app.globalData.userInfo.nickName
    this.data.money["time"] = r0
    this.data.money["year"] = r1[0]
    this.data.money["month"] = r1[1]
    this.data.money["day"] = r1[2]
    this.setData({
      money: this.data.money,
      time: r0
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
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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

  },

  // 选择钱 键盘 子组件传值过来（只是修改和确认提交）
  moneyFun: async function (e) {
    this.data.money.money = Number(e.detail.val)
    this.setData({
      val: e.detail.val,
      money: this.data.money
    })
    if (e.detail.sub == 1) {
      var res = await addMoney(this.data.money)
      console.log(res);
      // 向后台添加一条数据
      this.setData({
        val: 0
      })
      this.goBack()
    }
  },
  // 图标的选择 tag
  iconSwitch: function (e) {
    this.data.money.tag = e.detail.index
    this.data.money.name = e.detail.name
    this.setData({
      money: this.data.money
    })
  },
  // 收入支出 flag 0 支出 1 收入之类
  switchTag: function (e) {
    this.data.money.flag = e.detail
    this.setData({
      money: this.data.money
    })
  },
  bindDateChange: function (e) {
    // time(外部和money内部) 和年月日都需要改变
    var res = e.detail.value.split('-')
    this.data.money.year = res[0]
    this.data.money.month = res[1]
    this.data.money.day = res[2]
    this.data.money.time = e.detail.value
    this.setData({
      time: e.detail.value,
      money: this.data.money
    })
  },
  goBack: function () {
    // 跳转到前一页并且刷新数据
    wx.switchTab({
      url: '../money/money',
      success: function () {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  }
})