// pages/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:[],
  },

  //跳转到添加页
  gotoAdd:function(){
    wx.navigateTo({
      url: '../addRecord/add',
    })
  },

  //获取所有记录
  getAllRecord:function(){
    const db = wx.cloud.database()
    var that = this
    db.collection("LoveRecord").get({
      success:function(res){
        console.log(res.data)
        that.setData({
          records:res.data
        })
      }
    })
  },

  //跳转到记录详情页
  gotoDetail:function(event){
    // wx.navigateTo("../detail/detail?index={{index}}")
    var index = parseInt(event.currentTarget.dataset.id);
    // console.log( index);
    // console.log(this.data.records[index]);
    var recordId = this.data.records[index]._id;
    // console.log(recordId);
    var url= "../detail/detail?id="+recordId;
    // console.log(url)
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getAllRecord()
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
      this.getAllRecord()
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
      this.getAllRecord()
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