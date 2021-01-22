// pages/components/ring/ring.js
var windWidth = wx.getSystemInfoSync().windowWidth
import Animation from './../../../utils/animation'
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
    width: windWidth,
    height: windWidth * 0.5 + 40,
    canvasWidth: windWidth * 0.5,
    x_position: windWidth / 2,
    y_position: 0,
    do: 5,
    count: 10,
    com: 50
  },
  ready: function () {
    var that = this
    setTimeout(function () {
      that.showRing()
    }, 50)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    draw: function (ctx, line, x, y, radius, process) {
      ctx.beginPath()
      ctx.lineWidth = line
      console.log("***********", x, y, radius)
      ctx.arc(x, y, radius, 0, 0 + 2 * Math.PI * 0.5 * process)
      ctx.strokeStyle = "#B39CD0"
      ctx.stroke()
    },
    showRing: function () {
      const query = wx.createSelectorQuery().in(this)
      query.select('#myCanvas')
        .fields({
          node: true,
          size: true
        })
        .exec((res) => {
          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          const dpr = wx.getSystemInfoSync().pixelRatio
          var ori_radius = this.data.canvasWidth / 2
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          const x = this.data.x_position * dpr
          const y = this.data.height / 2 * dpr
          const radius = (ori_radius - 10) * dpr
          const line = radius * 0.5
          this.setData({
            radius: ori_radius - 10
          })
          ctx.beginPath()
          ctx.lineWidth = line
          console.log("***********", x, y, radius)
          ctx.arc(x, y, radius, 0, 0 + 2 * Math.PI)
          ctx.strokeStyle = "#FBEAFF"
          ctx.stroke()

          Animation({
            duration: 1000,
            onProcess: (process) => {
              this.draw(ctx, line, x, y, radius, process)
            }
          })
          // drawPieText(this.data.angleList, config, ctx, radius, centerPosition)
        })
    },
    close:function(){
      this.triggerEvent('close')
    }

  }
})