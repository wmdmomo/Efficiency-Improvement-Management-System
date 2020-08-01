// pages/components/moneytop/moneytop.js
var util = require('../../../utils/util')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    income: {
      type: Number
    },
    expenditure: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: '',
    month: '',
    budget:0
  },
  attached: function () {
    var res = util.formatYM(new Date())
    this.setData({
      year: res[0],
      month: res[1]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange: function (e) {
      var [year, month] = e.detail.value.split('-')
      this.setData({
        year: year,
        month: month
      })
      // 向父组件触发事件 申请当月的全部消费记录
      this.triggerEvent('reqMoney', {
        year: this.data.year,
        month: this.data.month
      })
    }

  }
})