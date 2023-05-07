// pages/student/publishPaper.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myId: '',
    paperList: [],
    className: '',
  },
  toClassReport(){
    let that = this
    wx.navigateTo({
      url: '/pages/student/classReport',
      success: function(res){
        res.eventChannel.emit("sendName",{
          id:that.data.myId,
          name: that.data.className
        })
      }
    })
  },

  toInfo(event){
    wx.navigateTo({
      url: '/pages/student/paperInfo',
      success: function(res){
        res.eventChannel.emit("sendTest",{id:event.currentTarget.dataset.id,
            name:event.currentTarget.dataset.name}
          )
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('sendTest',function(data){
        console.log(data)
        that.setData({
          myId:data.id,
          className: data.className
        })
        that.getInfo(data.id)
      })
  },
  async getInfo(id){
    let res = await  app.call({
        path: "/classes/classPapers",
        method: "GET",
        data: {
          classId: id
        }
      })
      this.setData({
        paperList: res
      })
      console.log(res)
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