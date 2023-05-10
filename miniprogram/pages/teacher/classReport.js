// pages/student/classReport.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avg_score: 0,
    list: [
      {testName:"408",testId: "11",avg_score: 95},
      {testName:"407",testId: "11",avg_score: 90},
      {testName:"406",testId: "11",avg_score: 85}
  
  ],
    keywords: "计算机历史，算法，数据结构",
    className: '王同学',
    id: '',
  },
  toPaperInfo(event){
    let that = this
    wx.navigateTo({
      url: '/pages/student/paperAnalysis',
      success: function(res){
        res.eventChannel.emit("sendInfo",{
          id: event.currentTarget.dataset.id,
          testName: event.currentTarget.dataset.testName
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('sendName' , async function(data){
        console.log(data)
        that.setData({
          id:data.id,
          className: data.name
        })
        await that.getList()
      })
  },
  async  getList(){
    let that = this;
   let res = await app.call({
      path: "/answers/hasPapers",
      data:{
        studentId: app.globalData.userInfo.id,
        classId: that.data.id
      },
      method:"GET"
    })

    let result = res.map(item=>{
      item.avg_score = Math.floor(parseInt(item.yourScore)/parseInt(item.officeScore)*100)

      return item
    })

    let all_score = result.reduce((a,b)=>{return a+b.avg_score},0)
    console.log(all_score)


    console.log(res)
    this.setData({
      avg_score: Math.floor(all_score/result.length),      
      list: result
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