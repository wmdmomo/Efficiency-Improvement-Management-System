// pages/components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [{
            "pagePath": "pages/money/money",
            "text": "明细",
            "iconPath": "icon/detail.png",
            "selectedIconPath": "icon/detail1.png"
          },
          {

            "pagePath": "pages/addmoney/addmoney",
            "text": "添加",
            "isSpecial": true,
            "iconPath": "icon/add1.png",
            "selectedIconPath": "icon/add1.png"

          },
          {

            "pagePath": "pages/figure/figure",
            "text": "图表",
            "iconPath": "icon/figure.png",
            "selectedIconPath": "icon/figure1.png"

          }
        ]
      }
    }

  },


  /**
   * 组件的初始数据
   */
  data: {


  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})