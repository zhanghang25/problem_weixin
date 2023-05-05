// pages/student/selfTest.js
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentInfo: {
      type: 1,
      questionDescribe: "第一台计算机是1946年美国研制的,该机英文缩写名为(  ).	"
    },
    option: [],
    myId: '',
    showAnswer:false,
    MyAnswer: ''
  },
  goBack(){
    wx.navigateBack()
  },

  selectClass(event){
    this.setData({
      MyAnswer: event.currentTarget.dataset.option
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
          myId:data
        })
        that.getInfo(data)
      })
  },
  async confirm(){
    console.log(this.data.MyAnswer)
    if(!this.data.MyAnswer){
      Toast.fail("请选择答案！")
      return
    }
    await app.call({
      path: "/answers/create",
      data:{
        questionId: this.data.currentInfo.id,
        studentId: app.globalData.userInfo.id,
        stuAnswerContent: this.data.MyAnswer,
        answerContent: this.data.currentInfo.answerContent,
        score: this.data.currentInfo.score,

      }
    })
    Toast.success("答题成功！")

    this.setData({
      showAnswer: true
    })
  },
  async getInfo(id){
    const info =  await app.call({
      path: '/questions/'+id,
      method: 'GET'
    })

    this.setData({
      currentInfo: info
    })
    if(info.type == 1){
      let option = info.otherAnswer.split(",")
      this.setData({
        option
      })
    }


    console.log(info)
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