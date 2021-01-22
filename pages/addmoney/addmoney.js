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
    val: "",
    time: '2020-07-30',
    time_copy: '',
    switchlist: ["支出", "收入"],
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
    },
    isTag: 0
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
      time: r0,
      time_copy: r0
    })
  },
  // 选择钱 键盘 子组件传值过来（只是修改和确认提交）
  moneyFun: async function (e) {
    this.data.money.money = Number(e.detail.val)
    var r0 = util.formatYMD(new Date(), 1)
    var r1 = util.formatYMD(new Date(), 0)
    this.data.money["usr"] = app.globalData.userInfo.nickName
    this.data.money["time"] = r0
    this.data.money["year"] = r1[0]
    this.data.money["month"] = r1[1]
    this.data.money["day"] = r1[2]
    this.setData({
      val: e.detail.val,
      money: this.data.money
    })
    if (e.detail.sub == 1) {
      var res = await addMoney(this.data.money)
      console.log(res);
      // 向后台添加一条数据
      this.data.money.flag = 0
      this.setData({
        isTag: 0,
        money: this.data.money
      })
      this.goBack()
    }
    // 这一步完成要向moneyswitch组件也传值

  },
  // 图标的选择 tag
  iconSwitch: function (e) {
    this.data.money.tag = e.detail.index
    this.data.money.name = e.detail.name
    this.setData({
      money: this.data.money
    })
  },
  // flag 0 支出 1 收入
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
    this.setData({
      val: 0,
      isTag: 0,
      time: this.data.time_copy
    })
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