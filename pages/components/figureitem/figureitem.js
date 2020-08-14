// pages/components/figureitem/figureitem.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemList: {
      type: Object,
      value: {}
    },
    type: {
      type: Number,
      value: 0
    },
    total: {
      type: Number,
      value: 0
    },
    typeTitle:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    ready: function () {    
      var that=this
      setTimeout(function () {
        that.data.typeTitle = app.globalData.iconlist[that.data.itemList.tag].name
        that.data.percent = (that.data.itemList.val / that.data.total * 100).toFixed(2)
        that.setData({
          typeTitle: that.data.typeTitle,
          percent: that.data.percent
        })
      }, 1000)
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})