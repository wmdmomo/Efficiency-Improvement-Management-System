const app = getApp()
import {
  getTodo
} from '../service/api'
var util = require('../../utils/util')
Page({
  data: {
    p2List: [],
    p1List: [],
    p0List: [],
    add: false,
    com: false
  },
  onLoad: async function (options) {
    // str = options.item == 'today' ? '今天' : '明天'
    var getdata = {
      time: util.formatYMD(new Date(), 1),
      name: app.globalData.userInfo.nickName
    }
    var res = await getTodo(getdata)
    console.log("$$$$$$$$$$$$$$$", res)
    this.setData({
      p2List: res.p2List,
      p1List: res.p1List,
      p0List: res.p0List
    })
  },
  changeImg: function () {
    this.setData({
      add: true
    })
  },
  changeCom: function () {
    this.setData({
      com: true
    })
  },
  comClose: function () {
    this.setData({
      com: false
    })
  },
  addClose: function (e) {
    this.data.add = e.detail.add
    this.setData({
      add: this.data.add
    })
  },
  addSuc: function (e) {
    const res = 'p' + e.detail.tag + 'List'
    this.data[res].push(e.detail.obj)
    this.setData({
      [res]: this.data[res]
    })
  }
})