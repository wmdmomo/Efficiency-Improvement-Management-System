// pages/components/moneyitem/moneyitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    moneylist:{
      type:Object
    },
    inMoney:{
      type:Number,
      value:1000
    },
    outMoney:{
      type:Number,
      value:1000
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    pic: [
      './../../image/icons/0.png',
      './../../image/icons/1.png',
      './../../image/icons/2.png',
      './../../image/icons/3.png'
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
  
  }
})