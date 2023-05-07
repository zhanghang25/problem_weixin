// pages/student/paperInfo.js
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    dataList:[],
    endTime:"60",
    endTimeStr:"00:00:00",
    timer: null,
    testName: '',
    testId: '',
    currentInfo: {
      type: 1,
      questionDescribe: ""
    },
    currentSelect: [],
    currentIndex: 1,
    currentAnswer: '',
  },
// 定义倒计时函数
countDown() {
  console.log(typeof this.data.endTime)
  console.log(this.data.endTime)
  // 计算剩余的小时数、分钟数和秒数
  let hours = Math.floor(this.data.endTime / 3600);
  let minutes = Math.floor((this.data.endTime % 3600) / 60);
  let seconds = this.data.endTime % 60;

  // 格式化显示的时间
  var timeString = hours.toString().padStart(2, "0") + ":" +
                   minutes.toString().padStart(2, "0") + ":" +
                   seconds.toString().padStart(2, "0");

  // 更新显示倒计时的元素
  // 减少倒计时的时间
  this.setData({
    endTime:--this.data.endTime,
    endTimeStr:timeString
  })


  // 如果倒计时结束，停止计时器
  if (this.data.endTime < 0) {
    clearInterval(this.data.timer);
    Toast.success("倒计时结束") ;
  }
},
check(){
  if(!this.data.currentAnswer){
    Toast.fail("请填写答案！")
    return false;
  }
 
  return true
},

next(){
  console.log(222)
  if(!this.check()){
    console.log(2223)
    return;
  }
  console.log(22234)
  if(this.data.currentIndex <= this.data.list.length){
    
    this.data.dataList.push(this.data.currentAnswer)
    this.setData({
      dataList:this.data.dataList,
      currentIndex:++this.data.currentIndex,
      currentAnswer: ''
    })


      this.setSelect()

      

  } 
  
  
},
setSelect(){
  this.setData({
    currentInfo:this.data.list[this.data.currentIndex - 1]
  })
  if(this.data.currentInfo.type == 1){
    this.setData({
      currentSelect:this.data.currentInfo.otherAnswer.split(",")
    })
  }
},
async dataCheck(){
  const res =  await app.call({
    path: "/answers/check",
    data:{
      studentId: app.globalData.userInfo.id,
      testId: this.data.testId
    }
  })
  if(res == 'error'){
    Toast.fail("您已经作答过该试卷了！")
    return false;
  }

  return  true;

},
async submit(){
  let ccc = await this.dataCheck();
  if(!ccc){
    return ;
  }
  Dialog.confirm({
    title: '提交试卷',
    message: '您确认要提交试卷吗？',
  })
    .then( async () => {
      await app.call({
        path: "/answers/sendResult",
        data: {
          listOfAnswers: JSON.stringify(this.data.dataList),
          testId: this.data.testId,
          studentId: app.globalData.userInfo.id
        }
      })   
      wx.redirectTo({
        url: '/pages/student/joinClass',
      })
      
    })
    .catch(() => {
      // on cancel
    });
},

selectClass(event){
  this.setData({
    currentAnswer: event.currentTarget.dataset.option
  })
},

prev(){
  
  if(this.data.currentIndex > 1){
    
    let answer =  this.data.dataList.pop()
    this.setData({
      dataList:this.data.dataList,
      currentIndex:--this.data.currentIndex,
      currentAnswer :answer
      
    })

    this.setData({
      currentInfo:this.data.list[this.data.currentIndex - 1]
    })
  } 
 

  
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
          testId:data.id,
          testName: data.name
        })
        that.getInfo(data.id)
      })
  },
  async getInfo(testId){
   let res = await app.call({
      path:"/papers/queryQuestions",
      data:{
        testId,
        
      },
      method:"GET"
    })
    console.log(res)
    this.setData({
      list:res,
      endTime: parseInt(res[0].time) *60,
      endTimeStr: "00:00:00"
    })
    this.data.timer = setInterval(this.countDown,1000) 
    this.setSelect()
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
    // clearInterval(this.data.timer);
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