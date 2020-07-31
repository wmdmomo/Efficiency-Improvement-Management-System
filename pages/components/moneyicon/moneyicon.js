// pages/components/moneyicon/moneyicon.js
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
    iconlist: [{
        path: "../../image/icons/0.png",
        name: "奖金"
      },
      {
        path: "../../image/icons/1.png",
        name: "服饰"
      },
      {
        path: "../../image/icons/2.png",
        name: "餐饮"
      },
      {
        path: "../../image/icons/3.png",
        name: "水果"
      },
      {
        path: "../../image/icons/4.png",
        name: "礼物"
      },
      {
        path: "../../image/icons/5.png",
        name: "美容"
      },
      {
        path: "../../image/icons/6.png",
        name: "购物"
      },
      {
        path: "../../image/icons/7.png",
        name: "零食"
      },
      {
        path: "../../image/icons/8.png",
        name: "学习"
      },
      {
        path: "../../image/icons/9.png",
        name: "交通"
      },
      {
        path: "../../image/icons/10.png",
        name: "旅行"
      }
    ]



  },
  attached: function () {
    this.swiper(this.data.iconlist, 10)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    iconSuc: function (e) {
      // 返回选择的icon的图标序列和名字
      this.triggerEvent('iconSwitch', {
        index: e.currentTarget.dataset.index,
        name: e.currentTarget.dataset.name
      })
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