// pages/components/keyboard/keyboard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:{
      type:String,
      value:'0'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dot: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapkey: function (v) {
      var val = v.target.dataset.key
      if (val == ".") {
        if (this.data.dot) return
        this.setData({
          dot: true
        })
      }
      this.setData({
        num: this.data.num == '0' ? val : this.data.num + val
      })
      this.triggerEvent('moneySuc', {
        val: this.data.num,
        sub: 0
      })
    },
    subkey: function () {
      // 把值传递给父组件
      this.triggerEvent('moneySuc', {
        val: this.data.num,
        sub: 1
      })
      this.setData({
        num: '0',
        dot: false
      })
    },

    delkey: function () {
      if (this.data.num == '0') return
      if (this.data.num[this.data.num.length - 1] == '.') this.setData({
        dot: false
      })
      this.setData({
        num: this.data.num.length == 1 ? '0' : this.data.num.substring(0, this.data.num.length - 1)
      })
      this.triggerEvent('moneySuc', {
        val: this.data.num,
        sub: 0
      })
    },
    clearkey: function () {
      this.setData({
        num: '0',
        dot: false
      })
      this.triggerEvent('moneySuc', {
        val: this.data.num,
        sub: 0
      })
    }
  }
})