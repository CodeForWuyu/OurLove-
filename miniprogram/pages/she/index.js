// pages/she/index.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl:"https://s1.ax1x.com/2020/05/06/YAiOYj.jpg",
      swiperList:[{
        id: 0,
        type:'image',
        url:'https://s1.ax1x.com/2020/05/08/Yuit2D.jpg',
      },
      {
        id: 1,
        type:'image',
        url:'https://s1.ax1x.com/2020/05/08/YuiNxe.jpg',
      },
      {
        id: 2,
        type:'image',
        url:'https://s1.ax1x.com/2020/05/08/YuiY8O.jpg',
      },
      {
        id: 3,
        type:'image',
        url:'https://s1.ax1x.com/2020/05/08/Yui856.jpg',
      },
      {
        id: 4,
        type:'image',
        url:'https://s1.ax1x.com/2020/05/08/YuiJPK.jpg',
      },
      {
        id: 5,
        type:'image',
        url:'https://s1.ax1x.com/2020/05/08/YuiwqA.jpg',
      },
      {
        id: 6,
        type:'image',
        url:'https://s1.ax1x.com/2020/05/08/YuiaKH.jpg',
      },
      {
        id: 7,
        type:'image',
        url:'https://s1.ax1x.com/2020/05/08/Yuidrd.jpg',
      },
    ],
    //小吴钰阴历生日
    LunarBirthday:'2020-10-07',
    //小吴钰阳历生日
    SolarBirthday:'2020-10-15',
    //周年纪念日
    anniversary:'2020-12-29',
  },

  // https://s1.ax1x.com/2020/05/08/Yuit2D.jpg
  // https://s1.ax1x.com/2020/05/08/YuiNxe.jpg
  // https://s1.ax1x.com/2020/05/08/YuiY8O.jpg
  // https://s1.ax1x.com/2020/05/08/Yui856.jpg
  // https://s1.ax1x.com/2020/05/08/YuiJPK.jpg
  // https://s1.ax1x.com/2020/05/08/YuiwqA.jpg
  // https://s1.ax1x.com/2020/05/08/YuiaKH.jpg
  // https://s1.ax1x.com/2020/05/08/Yuidrd.jpg

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 初始化towerSwiper 传已有的数组名即可
    this.towerSwiper('swiperList');
   
    //获取时间(月-日)
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 

    var currentDay = [Y,M,D].map(util.formatNumber).join('-');
    console.log(currentDay);
    this.setData({
      time:M+"-"+D,
      dayToLunarBirthday:this.computeLeftDate(currentDay,this.data.LunarBirthday),
      dayToSolarBirthday:this.computeLeftDate(currentDay,this.data.SolarBirthday),
      dayToAnniversary:this.computeLeftDate(currentDay,this.data.anniversary)
    })
  },

  //计算日期差
  computeLeftDate:function(startTime,endTime){
    console.log(startTime);
    console.log(endTime);
    //日期格式化
    var start_date = new Date(startTime.replace(/-/g, "/"));
    var end_date = new Date(endTime.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var ms = end_date.getTime() - start_date.getTime();
    //转换成天数
    var day = parseInt(ms / (1000 * 60 * 60 * 24));
    //do something
    // console.log("day = ", day);
    return day;
  },

  //打电话
  tel:function(){
    wx.makePhoneCall({
      phoneNumber: '13880340424',
    })
  },

  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },

  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
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