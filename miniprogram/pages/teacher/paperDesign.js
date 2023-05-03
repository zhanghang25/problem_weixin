// pages/teacher/paperDesign.js
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentSelf: 1,
    currentGarbage: 1,
    isUpdate: false,
    type: "1",
    source: "1",
    keywords: '计算机历史',
    questionDescribe: '第一台计算机是1946年美国研制的,该机英文缩写名为(  ).	',
    optionA: 'MARK-II',
    optionB: 'EDSAC',
    optionC: 'EDVAC',
    optionD: 'ENIAC',
    score:'10',
    order: '',
    answerContent: 'D'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
      let that = this ;
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('sendData',function(data){
        console.log(data)
        that.setData({
          isUpdate:data.data
        })
      })
  },
  prev(){
    if(this.data.currentSelf <= 1  ){
      Toast.fail("已经到第一页了")
      return ;
    }
    if( this.data.currentSelf < (this.data.list.length +1) &&  !this.check() ){
      Toast.fail("当前页，有字段未填完！");
      return;
    }

    if(this.data.currentSelf < (this.data.list.length +1)){
      this.data.list[this.data.currentSelf -1] = {
        type: this.data.type,
        source: this.data.source,
        keywords: this.data.keywords,
        questionDescribe: this.data.questionDescribe,
        optionA: this.data.optionA,
        optionB: this.data.optionB,
        optionC: this.data.optionC,
        optionD: this.data.optionD,
        score: this.data.score,
        order: this.data.order,
        answerContent: this.data.answerContent,
        
      };
    }
    this.setData({
      type: this.data.list[this.data.currentSelf-2].type,
      source: this.data.list[this.data.currentSelf-2].source,
      keywords: this.data.list[this.data.currentSelf-2].keywords,
      questionDescribe: this.data.list[this.data.currentSelf-2].questionDescribe,
      optionA: this.data.list[this.data.currentSelf-2].optionA,
      optionB: this.data.list[this.data.currentSelf-2].optionB,
      optionC: this.data.list[this.data.currentSelf-2].optionC,
      optionD: this.data.list[this.data.currentSelf-2].optionD,
      score: this.data.list[this.data.currentSelf-2].score,
      order: this.data.list[this.data.currentSelf-2].order,
      answerContent: this.data.list[this.data.currentSelf-2].answerContent,
    })
    

    console.log(this.data.list)
    this.setData({
      list: this.data.list,
      currentSelf: this.data.currentSelf - 1
    })
  },
  next(){
    if(!this.check()){
      return false;
    }
    if(this.data.currentSelf >= (this.data.list.length )){
    this.data.list.push({
      type: this.data.type,
      source: this.data.source,
      keywords: this.data.keywords,
      questionDescribe: this.data.questionDescribe,
      optionA: this.data.optionA,
      optionB: this.data.optionB,
      optionC: this.data.optionC,
      optionD: this.data.optionD,
      score: this.data.score,
      order: this.data.order,
      answerContent: this.data.answerContent,
      
    })
    // this.empty()
  }else{
    this.data.list[this.data.currentSelf -1] = {
      type: this.data.type,
      source: this.data.source,
      keywords: this.data.keywords,
      questionDescribe: this.data.questionDescribe,
      optionA: this.data.optionA,
      optionB: this.data.optionB,
      optionC: this.data.optionC,
      optionD: this.data.optionD,
      score: this.data.score,
      order: this.data.order,
      answerContent: this.data.answerContent,
      
    };
    this.setData({
      type: this.data.list[this.data.currentSelf].type,
      source: this.data.list[this.data.currentSelf].source,
      keywords: this.data.list[this.data.currentSelf].keywords,
      questionDescribe: this.data.list[this.data.currentSelf].questionDescribe,
      optionA: this.data.list[this.data.currentSelf].optionA,
      optionB: this.data.list[this.data.currentSelf].optionB,
      optionC: this.data.list[this.data.currentSelf].optionC,
      optionD: this.data.list[this.data.currentSelf].optionD,
      score: this.data.list[this.data.currentSelf].score,
      order: this.data.list[this.data.currentSelf].order,
      answerContent: this.data.list[this.data.currentSelf].answerContent,
    })
  }
  
    this.setData({
      list: this.data.list,
      currentSelf: this.data.currentSelf + 1
    })

    return true

    console.log(this.data.list)

  },
  toConfirm(){
    if(!this.next()){
      return;
    }
    let that = this;
    wx.navigateTo({
      url: '/pages/teacher/confirm',
      success: function(res){
        res.eventChannel.emit('sendList',{"list":that.data.list})
      }
    })
  },
  empty(){
    this.setData({
    type: '',
    source: '',
    keywords: '',
    questionDescribe: '',
    score:'',
    order: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    answerContent: ''
    })
  },
  check(){
    if(!this.data.type){
      Toast.fail("请选择题目类别")
      return false
    }

    if(this.data.type == 1){
      if(!this.data.optionA || !this.data.optionB || !this.data.optionC || !this.data.optionD){
        Toast.fail("选择题：题目选项未填充完全！")
      return false
      }
    }else{
      if(!this.data.order){
        Toast.fail("填空题：答案是否可以乱序未填充完全！")
        return false
      }
    }

    if(!this.data.source){
      Toast.fail("出题方式未选择！")
      return false
    }

    if(!this.data.keywords){
      Toast.fail("题目关键字未填充！")
      return false
    }

    if(!this.data.questionDescribe){
      Toast.fail("题目题干未填充！")
      return false
    }

    
    if(!this.data.score){
      Toast.fail("题目分数未填充！")
      return false
    }

    if(!this.data.answerContent){
      Toast.fail("题目答案未填充！")
      return false
    }

    return true;

    

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