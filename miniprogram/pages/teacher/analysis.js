// pages/teacher/analysis.js
const app  = getApp()
Page({

  /**
   * 页面的初始数据
   */
  toMain(){
    wx.redirectTo({
      url: '/pages/teacher/index',
    })
  },
  toDetail(){
    wx.navigateTo({
      url: '/pages/teacher/detail',
    })
  },
  data: {
    name:"计算机网络",
    code:"123165",
    count: 10,
    total: 120,
    paperName: "计算机网络",
    time: 60,
    testId: '',
    avg: 90.82,
    errors: "计算机网络，子网，IP"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this ;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendTest',async function(data1){
      console.log(data1)
      let cons = await app.call({
        path:"/answers/avgScore",
        data:{
          testId: data1.test.testId
        },
        method:"GET"
      })
      console.log(cons)
      that.setData({
        name: data1.test.className,
        code: data1.test.classId,
        count: data1.test.paperCount,
        time: data1.test.time,
        paperName: data1.test.testName,
        testId: data1.test.testId,
        avg: cons.avg,
        errors: cons.keyword
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