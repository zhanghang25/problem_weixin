// pages/student/paperInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTime:"60:00",
    pageInfo: {},
    currentInfo: {
      type: 1,
      questionDescribe: "第一台计算机是1946年美国研制的,该机英文缩写名为(  ).	"
    },
    currentIndex: 1,
    currentAnswer: '请输入填空内容，多个选项按英文逗号分割',
  },

  next(){
    this.setData({
      currentIndex:(this.data.currentIndex+1)
    })
  },

  prev(){
    if(this.data.currentIndex == 1){
      return ;
    }
    this.setData({
      currentIndex:(this.data.currentIndex-1)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
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