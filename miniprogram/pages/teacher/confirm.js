// pages/teacher/confirm.js
const app = getApp()
Page({
  getChange(){
    console.log("laile")
    this.setData({
      showPicker: true
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    name:'计算机1班',
    paperName: '计算机网络',
    time: 60,
    classList: [],
    columns: [],
    selectClass:1, 
    list: [],
    showPicker:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getClassList()
     let that = this ;
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('sendList',function(data){
        console.log(data)
        that.setData({
          list:data.list
        })
      })
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);

    this.setData({
      selectClass:this.data.classList[index].id,
      name: this.data.classList[index].className
    })
  },
  async getClassList(){
   const res = await app.call({
      path: '/classes/myClass'
    })

  let res2 = res.map(cc=>cc.className)
    this.setData({
      classList: res,
      columns:res2
    })
  console.log(res)



  },
  huoqu(){
    var Num = "";
    for (var i =  0; i< 6;i++){
      Num += Math.floor(Math.random()*10);

    }
    return Num;
  },
  submit(){
    app.call({
      path:"/questions/sendQuestions",
      data:{
        allList: JSON.stringify(this.data.list) ,
        testName: this.data.name,
        testId: this.huoqu(),
        time:this.data.time,
        teacherId: app.globalData.userInfo.id,
        classId: this.data.selectClass
      }
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