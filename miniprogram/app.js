App({
   async onLaunch() {
    await wx.cloud.init({
      env: "prod-8gkxjt0l4262b9a8"
    })
    
    this.init()
    
  },
   async initInfo(){
    const student_res = await  this.call({
      path: '/students/myInfo',
      method: "GET",
    })

    const teacher_res = await this.call({
      path: '/teachers/myInfo',
      method: "GET",
    })

     if (teacher_res){
      this.globalData.userInfo = teacher_res;
     
    } else if(student_res ){
      this.globalData.userInfo = student_res;
      
    }
   },

 async init(){
   await this.initInfo()

    if (Object.keys(this.globalData.userInfo).includes("teacherName")){
      wx.redirectTo({
        url: '/pages/teacher/index',
      })
    } else if(Object.keys(this.globalData.userInfo).includes("studentName") ){
      wx.redirectTo({
        url: '/pages/student/joinClass',
      })
    }
  },

  globalData: {
    weixinServer: 'problem-diy',
    userInfo: {}
  },
  successCheck(res){
   return res == 'created successfully'
  },
  logger:require('./log'),
  data:{
    // service_my:'problem-end'
    service_my: 'problem-diy'
  },

  async call(obj) {
    const res = await wx.cloud.callContainer({
      config: {
        env: "prod-8gkxjt0l4262b9a8"
      },
      path: obj.path,
      header: {
        "X-WX-SERVICE": this.globalData.weixinServer,
        "content-type": obj.type || "application/json"
      },
      method: obj.method || "POST",
      data: obj.data
    })
    this.logger.info(`云托管服务请求【${res.callID}】`,res.errMsg)
    return res.data;
  }
})