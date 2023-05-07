// pages/student/paperAnalysis.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testId: '',
    testName: '',
    list: [],
    error_list: [],
    right_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendInfo',async function(data){
      console.log(data)
      that.setData({
        testId:data.id,
        testName: data.testName
      })
      await that.getInfo(data.id)
    })
  },
  async getInfo(id){
    let list =  await app.call({
      path:"/answers/myPaper",
      data: {
        testId: id,
        studentId: app.globalData.userInfo.id
      }
    })
    console.log(list)
    let result = list.map((item,index)=>{
      item.num = index + 1;
      return item;
    })

    let right_list = result.filter(item=>{
      return item.status == 1
    })

    let error_list = result.filter(item=>{
      return item.status != 1
    })

    this.setData({
      error_list,
      right_list
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