const app = getApp()
import {
  getMoney
} from './../service/api'
var util = require('../../utils/util')
Page({
  data: {
    moneyList: [],
    tabbar: {},
    income: 0,
    expenditure: 0
  },
  onLoad: function () {
    // 上面的top组件返回年和月的值 在调用接口
    this.reqMoney()
    app.editTabbar()
  },
  reqMoney: async function (e) {
    var res = util.formatYM(new Date())
    var obj = {
      year: e ? e.detail.year : res[0],
      month: e ? e.detail.month : res[1],
      usr: app.globalData.userInfo.nickName
    }
    var res = await getMoney(obj)
    this.setData({
      moneyList: res.newMoneyList,
      income: res.all_income,
      expenditure: res.all_exp
    })
  }
})