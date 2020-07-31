const app = getApp()
Page({
  onLoad:function(){
   console.log(app.globalData.userInfo);
  }
})