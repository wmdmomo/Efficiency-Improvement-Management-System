// pages/components/progress/progress.js
var windWidth = wx.getSystemInfoSync().windowWidth
const app = getApp()
import Animation from './../../../utils/animation'
import {
  measureText
} from '../../../utils/util'
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    ringList: {
      type: Array
    },
    total: {
      type: Number,
      value: 0
    },
    type: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: windWidth,
    canvasWidth: windWidth * 0.5,
    x_position: windWidth / 2,
    y_position: 0,
    height: windWidth * 0.5 + 40,
    index: 0,
    exp_color: ["#FCE38A", "#FFD487", "#FFC48E", "#ffde7d", "#f9ed69", "#fce38a", "#FFB59E"],
    in_color: ["#3c9099", "#1fab89", "#62d2a2", "#9df3c4", "#a7d7c5"],
    angleList: [],
    radius: 0,
    empty: false
  },

  ready: function () {
    var that = this
    setTimeout(function () {
      that.showRing(that.data.ringList, that.data.total, that.data.type)
    }, 50)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    choicePart(e) {
      var curx = e.touches[0].clientX
      var cury = e.touches[0].clientY
      var x = this.data.x_position
      var y = this.data.height / 2 + e.currentTarget.offsetTop
      var radius_in = this.data.height / 2 - this.data.radius / 2
      var radius_out = radius_in + this.data.radius / 2
      var angle = -1
      var index = 0
      var dis = Math.pow(curx - x, 2) + Math.pow(cury - y, 2)
      if (dis <= Math.pow(radius_out, 2) && dis >= Math.pow(radius_in, 2)) {
        angle = Math.atan(Math.abs(cury - y) / (Math.abs(curx - x)))
        if (curx > x) {
          if (cury < y) angle = 2 * Math.PI - angle
        } else {
          if (cury < y) angle = Math.PI + angle
          else angle = Math.PI - angle
        }
      }
      for (let i = 0; i < this.data.angleList.length; i++) {
        if (i == this.data.angleList.length - 1) {
          if (angle >= this.data.angleList[i].startAngle) {
            index = i
            break
          }
        }
        if (this.data.angleList[i].startAngle <= angle && this.data.angleList[i + 1].startAngle > angle) {
          index = i
          break
        }
      }
      this.setData({
        index: index
      })
      this.triggerEvent('figureSwitch', {
        type: this.data.type,
        index: this.data.index
      })

    },
    cailPieAngle(series, count, process = 1) {
      let startAngle = 0;
      if (series.length == 0) {
        return [{
          startAngle: 0,
          proportion: 1 * process
        }]
      }
      return series.map((item) => {
        item.proportion = item.val / count * process
        item.startAngle = startAngle
        startAngle += 2 * Math.PI * item.proportion
        return item;
      })
    },
    drawLegend(context, series, count, x, y, radius) {
      var pieSeries = this.cailPieAngle(series, count, 1)
      context.font = "35px sans-serif"
      for (let i = 0; i < pieSeries.length; i++) {
        var off_x = 0,
          off_y = 0,
          angle = 0,
          legend_x = 0,
          legend_y = 0,
          text = ''
        angle = pieSeries[i].startAngle + pieSeries[i].proportion * Math.PI
        text = `${app.globalData.iconlist[pieSeries[i].tag].name}${(pieSeries[i].proportion*100).toFixed(2)}%`
        off_x = Math.cos(angle) * radius
        off_y = Math.sin(angle) * radius
        var textwidth = measureText(text)
        legend_x = off_x >= 0 ? off_x + x : x + off_x - textwidth
        legend_y = off_y + y
        context.beginPath()
        context.fillStyle = '#999999'
        context.fillText(text, legend_x, legend_y);
        context.closePath();
        // context.stroke();
      }
    },
    drawPie(ctx, series, x, y, radius, count, line, process, flag) {
      var pieSeries = this.cailPieAngle(series, count, process)
      this.setData({
        angleList: pieSeries
      })
      var that = this
      pieSeries.forEach((item, index) => {
        ctx.beginPath()
        ctx.lineWidth = line
        ctx.arc(x, y, radius, item.startAngle, item.startAngle + 2 * Math.PI * item.proportion)
        //数组为空 前面让他有一个占了100%的单元项 还要在判断一下金钱是是否为0
        //新增加图注 圆环旁边的注释及百分比
        if (pieSeries.length == 1 && this.data.total == 0) {
          ctx.strokeStyle = "#a4a4a4"
        } else {
          if (flag == 0) {
            if (index == pieSeries.length - 1 && index % 5 == 0) {
              ctx.strokeStyle = that.data.exp_color[1]
            } else {
              ctx.strokeStyle = that.data.exp_color[index % that.data.exp_color.length]
            }
          } else {
            if (index == pieSeries.length - 1 && index % 5 == 0) {
              ctx.strokeStyle = that.data.in_color[1]
            } else {
              ctx.strokeStyle = that.data.in_color[index % that.data.in_color.length]
            }
          }
        }
        ctx.stroke()
        // ctx.closePath()
      })
    },
    showRing: function (itemlist, total, flag) {
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
          if (itemlist.length == 0) {
            this.setData({
              total: 0
            })
          }
          let centerPosition = {
            x: this.data.x_position,
            y: this.data.height / 2 + res[0].node._top
          }
          Animation({
            duration: 1000,
            onProcess: (process) => {
              this.drawPie(ctx, itemlist, x, y, radius, this.data.total, line, process, flag)
              this.drawLegend(ctx, itemlist, this.data.total, x, y, radius)
            }
          })

          // drawPieText(this.data.angleList, config, ctx, radius, centerPosition)
        })
    },
    switchItem: function () {
      this.data.type = !this.data.type
      this.setData({
        type: this.data.type,
        index: 0
      })
      this.triggerEvent('figureSwitch', {
        type: this.data.type,
        index: this.data.index
      })
      this.showRing(this.data.ringList, this.data.total, this.data.type)
    }
  }
})