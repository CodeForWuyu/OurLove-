//index.js
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: '你好呀！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };

    this.getASentence();
    this.setBGM();
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  
  //获取一个情话
  getASentence:function(){
    var sentence =  "爱你在心口难开";
    var that = this;
    wx.request({
      url: 'https://v1.alapi.cn/api/qinghua',
      method:'GET',
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log(res.statusCode);
        if( res.statusCode == 200 ){
          sentence = res.data.data.content;
        }
        that.setData({
          motto:res.data.data.content
        })   
      },
      fail:function(err){
        console.log("获取失败");
        that.setData({
          motto:"拜托拜托，打开网络好吗"
        })
      },
      complete:function(res){
        
      }
    })
  },
  onPullDownRefresh(){
    this.getASentence();
    wx.stopPullDownRefresh({
      complete: (res) => {},
    })
  },

  setBGM(){
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.title="因为爱情"
    backgroundAudioManager.play();
    backgroundAudioManager.src="http://m7.music.126.net/20200508171216/e4a53bb79787736cde8a71da637c264a/ymusic/61f8/acca/ae45/098caa71f39e824afb2e899e39d5c4eb.mp3";
    backgroundAudioManager.onPlay(()=>{
      console.log("音乐播放开始");
      })
    backgroundAudioManager.onEnded(()=>{
      console.log("音乐播放结束");
      })
  }
})