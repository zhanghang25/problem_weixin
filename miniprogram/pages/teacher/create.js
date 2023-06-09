// pages/teacher/create.js
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    name: '',
    show_loading: false,
  },

  async confirm(){
    this.setData({
      show_loading: true
    })
    let res =  await app.call({
      path: "/classes/create",
      data: {
        classId: this.data.code,
        className: this.data.name,
        teacherId: app.globalData.userInfo.id
      }
    })
    this.setData({
      show_loading: false
    })
    console.log(res)
    if(app.successCheck(res)){
      wx.navigateBack()
    }

    console.log(this.data.code,this.data.name)
  },
  reset(){
    this.setData({
      code: '',
      name: ''
    });
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