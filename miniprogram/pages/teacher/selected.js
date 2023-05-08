// pages/teacher/selected.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_class:{}
  },

  toPaperDesign(event){
    console.log(event)
    let that = this 
    if(event.target.dataset.state == 1){
      
      wx.navigateTo({
        url: '/pages/teacher/analysis',
        success: function(res){
          res.eventChannel.emit('sendData',{data:true})
          
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/teacher/updatePaper',
        success: function(res){
          res.eventChannel.emit('sendTest',{"test":event.target.dataset.item,"class":that.data.my_class})
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    let that = this ;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendClass',function(data){
      console.log(data)
      that.setData({
        my_class:data.class
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