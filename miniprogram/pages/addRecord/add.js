// pages/addRecord/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-6-18',
    region:['上海市'],
    desc:'腻腻歪歪'
  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentDate()
  },

  getCurrentDate:function(e){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    this.setData({
      date:Y+'-'+M+'-'+D
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  inputEdit:function(e){
    var inputModel = e.currentTarget.dataset.name;
    var value = e.detail.value;
    console.log(inputModel);
    console.log(value);
    this.data[inputModel] = value;   
    this.setData({
      desc:this.data[inputModel]
    });
  },

  //返回上一页
  back:function(e){
    wx.navigateBack({
      delta: 2,
    })
  },

  //添加数据到数据库
  addDataToDatabase:function(e){
    console.log("添加数据到数据库")
    //获取数据库
    const db = wx.cloud.database()
    //获取集合
    const loverecord = db.collection('LoveRecord')
    //存储数据
    loverecord.add({
      data:{
        date:this.data.date,
        palace:this.data.region.join(" "),
        desc:this.data.desc
      },
      success:function(res){
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
    this.back()
  },

 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: (res) => {},
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})