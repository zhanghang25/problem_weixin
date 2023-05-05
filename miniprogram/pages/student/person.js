// pages/student/person.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatarUrl : '/images/file/user.png',
    userInfo: {},
    show: false,
    studentName: '',
    studentId:'' ,
  },
  setProfile(){
    this.setData({
      show: true
    })
  },
  myPaper(){
    wx.navigateTo({
      url: '/pages/student/mypaper',
    })
  },
  myError(){
    wx.navigateTo({
      url: '/pages/student/myerrors',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setInfo()
  },
  setInfo(){
    this.setData({
      userInfo: app.globalData.userInfo,
      studentId: app.globalData.userInfo.studentId,
      studentName: app.globalData.userInfo.studentName
    })
  },

 async getUserInfo(event){
    this.data.userInfo.studentName  = this.data.studentName
    this.data.userInfo.studentId  = this.data.studentId
      await app.call({
      path: '/students/update',
      data: this.data.userInfo
    })
    await app.initInfo()
    this.setInfo()
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})