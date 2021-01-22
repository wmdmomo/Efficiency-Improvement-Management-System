//app.js

App({
  onLaunch: function () {
    wx.hideTabBar()
    // 展示本地存储能力
    wx.setStorage({
      data: this.globalData.iconlist,
      key: 'icon',
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    userInfo: null,
    iconlist: [{
        id: 0,
        name: "奖金"
      },
      {
        id: 1,
        name: "服饰"
      },
      {
        id: 2,
        name: "餐饮"
      },
      {
        id: 3,
        name: "水果"
      },
      {
        id: 4,
        name: "礼物"
      },
      {
        id: 5,
        name: "美容"
      },
      {
        id: 6,
        name: "购物"
      },
      {
        id: 7,
        name: "零食"
      },
      {
        id: 8,
        name: "学习"
      },
      {
        id: 9,
        name: "交通"
      },
      {
        id: 10,
        name: "旅行"
      },
      {
        id: 11,
        name: "添加"
      }
    ],
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [{
          "pagePath": "/pages/money/money",
          "text": "明细",
          "iconPath": "icon/detail.png",
          "selectedIconPath": "icon/detail1.png"
        },
        {

          "pagePath": "/pages/addmoney/addmoney",
          "text": "添加",
          "isSpecial": true,
          "iconPath": "icon/add1.png",
          "selectedIconPath": "icon/add1.png"

        },
        {
          "pagePath": "/pages/figure/figure",
          "text": "图表",
          "iconPath": "icon/figure.png",
          "selectedIconPath": "icon/figure1.png"

        }
      ]
    }
  }
})