// start.js
const devicesId = "858629760"
const api_key = "ZtrXe4tsblp4eqawj=d8IqObkas="
Page({

  data: {
    temp: 0,
    humidity: 0,
    battery: 0,
    weight: 0,
    latitude: 0,
    longitude: 0,
    timer:''
  },
  onLoad: function () {
    //console.log(`your deviceId: ${devicesId}, apiKey: ${api_key}`)
    this.getLocate()
    this.getDatapoints()
   
  },
  onShow:function(){
    this.getLocate()
    this.getDatapoints()
    this.setData({
        timer:setInterval(() => {
      if (this.data.humidity != 0 && this.data.temp != 0) {
        wx.hideLoading()
      }
      //console.log(this.data.latitude,this.data.longitude)
      this.getDatapoints()
    }, 2000)
    })
    wx.showLoading({
      title: '数据获取中'
    })
  },
  getLocate: function () {
    var that = this;
    wx.getLocation({
      type: "gcj02",
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })
  },
  getDatapoints: function () {
    var that = this;
    wx.request({
      url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Temperature,Humidity,Weight,Battery&limit=10`,
      header: {
        'content-type': 'application/json',
        'api-key': api_key
      },
      success: (res) => {
        //console.log(res)
        that.setData({
          temp: res.data.data.datastreams[0].datapoints[0].value,
          humidity: res.data.data.datastreams[1].datapoints[0].value,
          battery: res.data.data.datastreams[2].datapoints[0].value,
          weight: res.data.data.datastreams[3].datapoints[0].value
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
    //console.log(this.data.humidity,this.data.temp)
  },
  clickTemp: function () {
    wx.navigateTo({
      url: '../demoss/temperature/temperature',
    })
  },
  clickHumi: function () {
    wx.navigateTo({
      url: '../demoss/humidity/humidity',
    })
  },
  clickMap: function () {
    wx.navigateTo({
      url: '../demoss/maps/maps',
    })
  },
 //开启跟踪事件
  onTrack:function(){
    console.log("track")
    wx.request({
      url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
      header:{
          'content-type':'application/json',
          "api-key":`${api_key}`
      },
      method:'POST',
      data:5,//5为跟踪
      success(res){
        console.log("跟踪")
        console.log(res)
        console.log(res.data)
      },
      fail(res){
          console.log(res)
      }
    })
  },
// 这里是小车操作接口，按钮点击事件触发
  front: function () {
    console.log("front")
    wx.request({
      url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
      header:{
          'content-type':'application/json',
          "api-key":`${api_key}`
      },
      method:'POST',
      data:1,//1为前进
      success(res){
        console.log("前进")
        console.log(res)
        console.log(res.data)
      },
      fail(res){
          console.log(res)
      }
    })
  },

  left: function () {
    console.log("left")
    wx.request({
        url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
        header:{
            'content-type':'application/json',
            "api-key":`${api_key}`
        },
        method:'POST',
        data:2,//2为左转
        success(res){
          console.log("左转")
          console.log(res)
          console.log(res.data)
        },
        fail(res){
            console.log(res)
        }
      })
  },

  right: function () {
    console.log("right")
    wx.request({
        url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
        header:{
            'content-type':'application/json',
            "api-key":`${api_key}`
        },
        method:'POST',
        data:3,//3为右转
        success(res){
          console.log("右转")
          console.log(res)
          console.log(res.data)
        },
        fail(res){
            console.log(res)
        }
      })
  },

  back: function () {
    console.log("back")
    wx.request({
        url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
        header:{
            'content-type':'application/json',
            "api-key":`${api_key}`
        },
        method:'POST',
        data:4,//4为后退
        success(res){
          console.log("后退")
          console.log(res)
          console.log(res.data)
        },
        fail(res){
            console.log(res)
        }
      })
  },

// 这里是长按触发事件
  setfront: function () {
    console.log("setfront")
    wx.request({
        url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
        header:{
            'content-type':'application/json',
            "api-key":`${api_key}`
        },
        method:'POST',
        data:11,//长前进
        success(res){
          console.log("前进")
          console.log(res)
          console.log(res.data)
        },
        fail(res){
            console.log(res)
        }
      })
  },

  setleft: function () {
    console.log("setleft")
    wx.request({
        url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
        header:{
            'content-type':'application/json',
            "api-key":`${api_key}`
        },
        method:'POST',
        data:22,//长左转
        success(res){
          console.log("前进")
          console.log(res)
          console.log(res.data)
        },
        fail(res){
            console.log(res)
        }
      })
  },

  setright: function () {
    console.log("setright")
    wx.request({
        url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
        header:{
            'content-type':'application/json',
            "api-key":`${api_key}`
        },
        method:'POST',
        data:33,//长右转
        success(res){
          console.log("前进")
          console.log(res)
          console.log(res.data)
        },
        fail(res){
            console.log(res)
        }
      })
  },

  setback: function () {
    console.log("setback")
    wx.request({
        url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
        header:{
            'content-type':'application/json',
            "api-key":`${api_key}`
        },
        method:'POST',
        data:44,//长后退
        success(res){
          console.log("前进")
          console.log(res)
          console.log(res.data)
        },
        fail(res){
            console.log(res)
        }
      })
  },
  onHide:function(){
    let timer = this.data.timer;
    clearInterval(timer)
},
 onUnload:function(){
     let timer = this.data.timer;
     clearInterval(timer)
 }


  
})