// pages/student/searchTest.js
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: "",
    list: [],

  },
  async getTest(){
    if(this.data.search == ""){
      Toast.fail("请输入搜索的信息！")
      return;
    }
    let list =  await app.call({
      path:"/questions/list",
      data: {
        search: this.data.search
      },
      method:"GET"
    })

    console.log(list)
    this.setData({
      list: list.records
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  toDetail(event){
    console.log(event)
    wx.navigateTo({
      url: '/pages/student/selfTest',
      success: function(res){
        res.eventChannel.emit("sendTest",event.currentTarget.dataset.set)
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