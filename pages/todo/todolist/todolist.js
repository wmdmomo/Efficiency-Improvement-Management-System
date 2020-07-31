const app = getApp()
import {
  getTodo
} from '../../service/api'
var util = require('../../../utils/util')
Page({
  data: {
    item: '今天',
    p2List: [],
    p1List: [],
    p0List: [],
    add: false
  },
  onLoad: async function (options) {
    var str = ''
    str = options.item == 'today' ? '今天' : '明天'
    var getdata = {
      time: util.formatYMD(new Date()),
      name: app.globalData.userInfo.nickName
    }
    var res = await getTodo(getdata)
    this.setData({
      item: str,
      p2List: res.p2List,
      p1List: res.p1List,
      p0List: res.p0List
    })
  },
  changeImg: function () {
    // this.data.add=!this.data.add
    this.setData({
      add: true
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