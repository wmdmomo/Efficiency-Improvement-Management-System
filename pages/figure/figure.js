// pages/money/figure/figure.js
const app = getApp()
var util = require('../../utils/util')
import {
  getFigure,
  getBud
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
    ring_list: [],
    choiceTotal: 0,
    choiceType: 0,
    choiceIndex: 0,
    budget: 500,
    subbudget: 400,
    had:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
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
    var ans2 = await getBud(app.globalData.userInfo.nickName)
    var bud = ans2.usr[0].bud
    // 要考虑一下当收入或支出的数组为空时的情况 并且每次请求的时候 圆环要回到支出的初始状态
    // 选择ring这个组件 执行画图的方法
    var title = ''
    var list = []
    if (ans.expList.length > 0) {
      list = ans.expList[0]
      title = app.globalData.iconlist[ans.expList[0].tag].name
    }
    var sub = bud - ans.exp_money
    this.setData({
      in_val: ans.in_money,
      exp_val: ans.exp_money,
      in_list: ans.incomeList,
      exp_list: ans.expList,
      choiceList: list,
      choiceTotal: ans.exp_money,
      choiceType: 0,
      typeTitle: title,
      ring_list: ans.expList,
      budget: bud,
      subbudget: sub
    })
    let ring = this.selectComponent('#ring_id')
    ring.showRing(this.data.ring_list, this.data.choiceTotal, 0)
  },
  figureSwitch: function (e) {
    var type = e.detail.type
    var index = e.detail.index
    var ring_list = type ? this.data.in_list : this.data.exp_list
    var total = type ? this.data.in_val : this.data.exp_val
    var list = []
    var typeTitle = ''
    if (ring_list.length > 0) {
      list = type ? this.data.in_list[index] : this.data.exp_list[index]
      typeTitle = app.globalData.iconlist[list.tag].name
    }
    this.setData({
      choiceType: type,
      choiceTotal: total,
      choiceList: list,
      typeTitle: typeTitle,
      ring_list: ring_list
    })
  }
})