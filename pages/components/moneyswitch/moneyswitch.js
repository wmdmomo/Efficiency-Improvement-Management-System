// pages/components/moneyswitch/moneyswitch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    switchlist: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isTag: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchSuc: function (e) {
      this.setData({
        isTag: e.target.dataset.tag
      })
      this.triggerEvent('switchTag',this.data.isTag)

    }
  }
})