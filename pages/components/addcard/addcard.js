// pages/components/addcard/addcard.js.js
const app = getApp()
import {
  addTodo
} from './../../service/api'
var util = require('../../../utils/util')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    isClose: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isTag: -1,
    detail: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addSubmit: async function () {
      console.log(this.data.detail);
      var obj = {
        name: app.globalData.userInfo.nickName,
        time: util.formatYMD(new Date()),
        detail: this.data.isDetail,
        flag: 0,
        tag: this.data.isTag
      }
      const res = await addTodo(obj)
      console.log(res)
      this.triggerEvent('addSuc', {
        obj: obj,
        tag: this.data.isTag
      })
      this.changeDel()
      
    },
    changeTag: function (e) {
      this.data.isTag = e.currentTarget.dataset.tags
      this.setData({
        isTag: this.data.isTag
      })
    },
    changeDel: function () {
      this.setData({
        isClose: false,
        isTag: -1
      })
      this.triggerEvent('addClose', {
        add: false
      })
    }
  }
})