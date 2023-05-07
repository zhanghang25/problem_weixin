// pages/index/index.js
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    role: 2,
    code: ""
  },

  onChange(event) {
    this.setData({
      role: event.detail,
    });
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      role: name,
    });
  },

  async toMain(){
    console.log(11)
    // wx.redirectTo({
    //   url: '/pages/student/joinClass',
    // })
    let res = {} 
    if(this.data.role == 1){
      
      res = await app.call({
        path: '/students/create',
        method: 'POST',
        data:{
          studentName: this.data.name,
          studentTel: "15933332222",
          studentId: this.data.code
        }
      })
      console.log(res)
      Toast.success(res)
      if(app.successCheck(res) || res == "已经注册过了"){
        app.init()
      // wx.redirectTo({
      //   url: '/pages/student/joinClass',
      // })
    }
    }else{

      
       res = await app.call({
        path: '/teachers/create',
        method: 'POST',
        data:{
          teacherName: this.data.name,
          teacherTel: "15933332222",
          teacherId: this.data.code
        }
      })
      Toast.success(res)
      if( app.successCheck(res) || res == "已经注册过了"){
        app.init()
      // wx.redirectTo({
      //   url: '/pages/teacher/index',
      // })
    }
    }
    console.log(res)


    


  },
   async reset(){
    this.setData({
      role: '',
      name: '',
      code: ''
      
    })
    
    Toast.success("重置成功！")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */ 
  async onReady() {
    await app.init()
  },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow() {
    app.init()
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