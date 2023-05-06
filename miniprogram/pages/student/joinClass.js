// pages/student/joinClass.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myJoinClass: []
  },
  toPublishPaper(event){
    wx.navigateTo({
      url: '/pages/student/publishPaper',
      success:function(res){
        res.eventChannel.emit("sendTest",{
          id: event.currentTarget.dataset.id,
          className: event.currentTarget.dataset.name
        })
      }
    })
  },
  toEnterClass(){
    wx.navigateTo({
      url: '/pages/student/enterClass',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  getMyClass(){

  },
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
   let res =  await app.call({
      path: "/studentclass/myClass",
      data:{
        studentId: app.globalData.userInfo.id
      }
    })
    this.setData({
      myJoinClass: res
    })
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