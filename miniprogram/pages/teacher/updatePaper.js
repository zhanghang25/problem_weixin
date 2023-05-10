// pages/teacher/updatePaper.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"计算机网络",
    code:"123165",
    count: 10,
    total: 100,
    paperName: "计算机网络",
    time: 60,
    testId: ''

  },
  toUpdate(){
    let that = this 
    wx.navigateTo({
      url: '/pages/teacher/update',
      success: function(res){
        res.eventChannel.emit("sendTest",{
          data:true,
          testId: that.data.testId
        })
      }
    })
  },

  async getConfirm(){
    console.log(111)
    await app.call({
      path:"/papers/updateBatch",
      data: {
        time: this.data.time,
        testId: this.data.testId,
        testName: this.data.paperName
      }
    })

    wx.redirectTo({
      url: '/pages/teacher/index',
    })
  },

  async getPublish(){
    await app.call({
      path:"/papers/updateBatch",
      data: {
        testId: this.data.testId,
        statusId: 1
      }
    })

    wx.redirectTo({
      url: '/pages/teacher/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this ;
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('sendTest',async function(data){
        console.log(data)
        const res = await app.call({
          path: "/answers/avgScore",
          data:{
            testId:data.test.testId
          },
          method: "GET"
        })
        that.setData({
          name: data.test.className,
          code: data.test.classId,
          count: data.test.paperCount,
          time: data.test.time,
          paperName: data.test.testName,
          testId: data.test.testId,
          total: res.allScore
        })
      })
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