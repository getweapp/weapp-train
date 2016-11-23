//index.js
var api = require('../../requests/api.js');
var requests = require('../../requests/request.js');

var today = new Date();

//获取应用实例
var app = getApp();

Page({
  data: {
    motto: '旅客您好，很高兴为您服务：',
    from: '',
    to:'',
    date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
    userInfo: {},
  },
  onLoad: function() {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
    });
  },
	//事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  },
  setFrom: function(e) {
    this.setData({
      from:e.detail.value
    })
  },
  setTo: function(e) {
    this.setData({
      to:e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log(e.detail.value)
     this.setData({
      date: e.detail.value
    })
  },
  successCbTrain: function(res) {
    var json = res.data;
    console.log(json)
    //将JSON类型转为String类型用以url参数传递，否则传递后会变成[object Object]
    var jsonString = JSON.stringify(json);
    wx.navigateTo({
      url: '../train/train?trainInfos='+jsonString,
    });
  },
	//获取火车票函数
  getTrainInfo: function() {
    if(!this.data.from){
      wx.showModal({
  title: '温馨提示',
  content: '请输入出发城市',
  showCancel:false,
  success: function(res) {
  }
})
return false;
    }
    var url = api.API_TRAIN_SEARCH_ZZ;
    var method = "GET";
    var header = {apikey: api.API_TRAIN_KEY};
    var data= {
        version: '1.0',
        from: this.data.from,
        to: this.data.to,
        date: '2016-11-25',
      };
    requests.request(url, method, header, data, this.successCbTrain, null, null);
  },
});
