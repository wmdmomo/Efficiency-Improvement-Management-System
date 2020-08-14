// pages/components/addicon/addicon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconShow:{
      type:Number,
      value:0
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
    addSuc: function (e) {
      var flag=e.currentTarget.dataset.flag
      if(flag){
        this.triggerEvent('addIcon',this.data.newTag)
      }
      this.setData({
        iconShow:0,
        newTag:''
      })
    }
  }
})