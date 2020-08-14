// pages/money/figure/figure.js
const app = getApp()
var util = require('../../utils/util')
import {
  getFigure
} from './../service/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    in_list: [],
    in_val: 0,
    exp_list: [],
    exp_val: 0,
    choiceList: {},
    choiceTotal: 0,
    choiceType: 0,
    choiceIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    app.editTabbar()
    this.reqMoney()

  },

  reqMoney: async function (e) {
    var res = util.formatYM(new Date())
    var obj = {
      year: e ? e.detail.year : res[0],
      month: e ? e.detail.month : res[1],
      usr: app.globalData.userInfo.nickName
    }
    var ans = await getFigure(obj)
    this.setData({
      in_val: ans.in_money,
      exp_val: ans.exp_money,
      in_list: ans.incomeList,
      exp_list: ans.expList,
      choiceList: ans.expList[0],
      choiceTotal: ans.exp_money,
      choiceType: 0
    })

  },
  figureSwitch: function (e) {
    var type = Number(e.detail.type)
    var index = e.detail.index
    var total = type ? this.data.in_val : this.data.exp_val
    var list = type ? this.data.in_list[index] : this.data.exp_list[index]
    var typeTitle = app.globalData.iconlist[list.tag].name
    console.log("LOOK " + type,index);

    this.setData({
      choiceType: type,
      choiceTotal: total,
      choiceList: list,
      typeTitle: typeTitle
    })
  }
})