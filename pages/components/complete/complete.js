// pages/components/complete/complete.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready: function () {
    let ring = this.selectComponent('#ring_id')
    ring.showRing()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close: function () {
      this.triggerEvent('close')
    }
  }
})