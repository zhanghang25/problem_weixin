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
    id: "",
    keywords: '计算机历史',
    questionDescribe: '第一台计算机是1946年美国研制的,该机英文缩写名为(  ).	',
    optionA: 'MARK-II',
    optionB: 'EDSAC',
    optionC: 'EDVAC',
    optionD: 'ENIAC',
    score:'10',
    answerContent: 'D',
    order: '',
    testId: '',
    fakeList: [
      { type: "1",
      source: "2",
      keywords: '计算机历史',
      questionDescribe: '下列设备属于资源子网的是_____',
      optionA: '计算机软件',
      optionB: '网桥',
      optionC: '交换机',
      optionD: '路由器',
      score:'10',
      answerContent: 'A'},
      { type: "1",
      source: "2",
      keywords: '计算机历史',
      questionDescribe: '下面哪种拓扑技术可以使用集线器作为连接器？',
      optionA: '双环状',
      optionB: '单环状',
      optionC: '总线状',
      optionD: '星状',
      score:'10',
      answerContent: 'D'},
      { type: "1",
      source: "2",
      keywords: '计算机历史',
      questionDescribe: '计算机网络拓扑是通过网中结点与通信线路之间的几何关系表示网络结构，反映出网络中各实体间的____	',
      optionA: '结构关系',
      optionB: '主从关系',
      optionC: '接口关系',
      optionD: '层次关系',
      score:'10',
      answerContent: 'A',}
    ]

  },
  setAnswer(event){
    console.log(event)
    this.setData({
      answerContent: event.currentTarget.dataset.option1
    })
  },
  fakeSearch(){
    this.setData(this.data.fakeList[(this.data.currentGarbage -1)%3])
    this.setData({
      currentGarbage:this.data.currentGarbage+1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.empty()
      let that = this ;
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on("sendTest",async function(data){
        console.log(data)
        that.setData({
          isUpdate:data.data,
          testId: data.testId
        })

        await that.getTestList(data.testId)
      })
  },
  async getTestList(id){
    let list = await app.call({
      path:"/papers/queryQuestions",
      data:{

        testId: id
      },
      method:"GET"
    })
    console.log(list)
    list = list.map(this.convert)
    this.setData({
      list
    })


    this.setData(this.data.list[0])

  },
  convert(item){
    let c_item = {}
    c_item.type = item.type
    c_item.id = item.id
    c_item.source = item.source
    c_item.score = item.score
    c_item.order = item.order
    c_item.answerContent = item.answerContent
    c_item.questionDescribe = item.questionDescribe
    c_item.keywords = "计算机历史"
    if(item.type == 1){

      let options = item.otherAnswer.split(",")
      c_item.optionA = options[0]
      c_item.optionB = options[1]
      c_item.optionC = options[2]
      c_item.optionD = options[3]
      
    }

    return c_item;
    

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
        id: this.data.id
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
      id: this.data.list[this.data.currentSelf-2].id,
    })
    

    console.log(this.data.list)
    this.setData({
      list: this.data.list,
      currentSelf: this.data.currentSelf - 1
    })
  },
  goBack(){
    wx.navigateBack();
  },
  next(){
    if(!this.check() || this.data.currentSelf>=this.data.list.length){
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
      id: this.data.id,
      answerContent: this.data.answerContent,
      
    })
    this.empty()
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
      id: this.data.id,
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
      id: this.data.list[this.data.currentSelf].id,
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
  async toConfirm(){
    // if(!this.next()){
    //   return;
    // }
    let that = this;

    await app.call({
      path:"/questions/sendUpdateQuestions",
      data:{
        allList: JSON.stringify(this.data.list) ,
        
      }
    })
    wx.navigateBack()
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