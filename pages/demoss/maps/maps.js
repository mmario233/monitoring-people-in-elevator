const devicesId = "858629760"
const api_key = "ZtrXe4tsblp4eqawj=d8IqObkas="
Page({
    data: {
      ilatitude: 0,
      ilongitude: 0,
      devicelatitude:0,
      devicelongitude:0,
      timer:"",
      marker:[
      {id:0,
        iconPath:"../../../images/location.png",
        latitude:0,
        longitude:0,
        width:30,
        height:30
      }],
      historyList:[],
      cityList:[],
      timer:''
    },
    onLoad: function () {
      this.getDatapoints()
      this.getHistory()
      this.getLocate()
    },
    onShow:function(){
        this.getDatapoints()
        this.getHistory()
        this.getLocate()
        this.setData({timer:setInterval(() => {
          if (this.data.cityList != 0 && this.data.historyList != 0) {
            wx.hideLoading()
          }
          else{
              this.getHistory()
          }
          this.getLocate()
          this.getDatapoints()
        }, 5000)})
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
              ilatitude: latitude,
              ilongitude: longitude
            })
          }
        })
      },
      getDatapoints: function () {
        var that = this;
        wx.request({
          url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Location,HistoryLocation&limit=10`,
          header: {
            'content-type': 'application/json',
            'api-key': api_key
          },
          success: (res) => {
            //console.log(res)
            that.setData({
                'marker[0].latitude': res.data.data.datastreams[1].datapoints[0].value.lat,
                'marker[0].longitude': res.data.data.datastreams[1].datapoints[0].value.lon,
                historyList:res.data.data.datastreams[0].datapoints
            })
            //console.log(this.data.historyList)
          },
          fail: (err) => {
            console.log(err)
          }
        })
        //console.log(this.data.humidity,this.data.temp)
      },
      getHistory:function(){
          let ak = "sjOwA04idfMjoUj8tj7yPZuTLEYNrdO6";
          let length = this.data.historyList.length;
          var that = this;
          for(var i=0;i<length-1;i++){
             wx.request({
            url: 'http://api.map.baidu.com/reverse_geocoding/v3/?ak='+ak+'&output=json&coordtype=wgs84ll&location='+that.data.historyList[i].value.lat+','+that.data.historyList[i].value.lon,
            header:{
                'Content-Type':'application/json'
            },
            success:function(res){
                console.log(res)
                var obj={};
                let cityList = that.data.cityList;
                obj.time=that.data.historyList[i].at.slice(0,7);
                obj.country=res.data.result.addressComponent.country;
                obj.city=res.data.result.addressComponent.city;
                cityList.push(obj)
                that.setData({
                    cityList
                })
                console.log(that.data.cityList)
            },
            fail:function(err){
                console.log(err)
            }
          }) 
          }
      },
      comeback: function () {
        console.log("front")
        wx.request({
          url:`http://api.heclouds.com/cmds?device_id=${devicesId}`,
          header:{
              'content-type':'application/json',
              "api-key":`${api_key}`
          },
          method:'POST',
          data:6,//6为寻回
          success(res){
            console.log("寻回")
            console.log(res)
            console.log(res.data)
          },
          fail(res){
              console.log(res)
          }
        })
      },
      onHide:function(){
        clearInterval(this.data.timer)
    },
      onUnload:function(){
          clearInterval(this.data.timer)
      }
})