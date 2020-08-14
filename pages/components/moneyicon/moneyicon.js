// pages/components/moneyicon/moneyicon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iconShow: 0,
    
    iconlist: []

  },
  attached: async function () {
    var res = await wx.getStorageSync('icon')
    this.setData({
      iconlist: res
    })
    this.swiper(this.data.iconlist, 10)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    iconSuc: function (e) {
      var index = e.currentTarget.dataset.index
      if (index == 11) {
        this.setData({
          iconShow: 1
        })
      } else {
        // 返回选择的icon的图标序列和名字
        this.triggerEvent('iconSwitch', {
          index: index,
          name: e.currentTarget.dataset.name
        })
      }
    },
    addIcon: function (e) {
      var obj = {
        id: 12,
        name: e.detail
      }
      var len = this.data.iconlist.length
      this.data.iconlist.splice(len - 1, 0, obj)
      wx.setStorageSync('icon', this.data.iconlist)
      this.setData({
        iconlist: this.data.iconlist
      })
      this.swiper(this.data.iconlist, 10)
    },
    swiper(arr, size) {
      let that = this
      var length = that.data.iconlist.length;
      var page = Math.ceil(length / size);
      var newData = []
      var start = 0
      for (var i = 1; i < page; i++) {
        var newArr = arr.slice(start, i * size)
        newData.push(newArr)
        var remainder = length - i * size
        start = i * size
      }
      if (remainder > size) {
        return
      } else {
        var newArr = arr.slice(start, length)
        newData.push(newArr)
        that.setData({
          newData: newData
        })
      }
    }
  }
})