// pages/student/myerrors.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error_list: [],
    right_list: []
  },
  async getInfo(id){
    let list =  await app.call({
      path:"/papers/myErrors",
      data: {
        studentId: app.globalData.userInfo.id
      },
      method: "GET"
    })
    console.log(list)
   

    this.setData({
      error_list:list
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getInfo()
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