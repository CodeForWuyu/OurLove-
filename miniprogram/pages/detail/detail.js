// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    date:"2020-01-01",
    place:"上海市",
    desc:"秀恩爱"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    const db = wx.cloud.database()
    var that = this
    db.collection("LoveRecord").doc(id).get({
      success:function(res){
        // console.log(res.data)
        that.setData({
          id:res.data._id,
          date:res.data.date,
          place:res.data.palace,
          desc:res.data.desc
        })
      }
    })

  },

  //返回上一页面
  back:function(e){
    wx.navigateBack({
      delta: 2,
    })
  },

  //删除该记录
  deleteRecord:function(e){
    // console.log("删除记录")
    const db = wx.cloud.database()
    var that = this
    // console.log(that.data.id)
    db.collection('LoveRecord').doc(that.data.id).remove({
      success: function(res) {
        console.log("删除成功！")
      }
    })
    that.back()
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