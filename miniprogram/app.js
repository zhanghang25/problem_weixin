App({
   async onLaunch() {
    await wx.cloud.init({
      env: "prod-8gkxjt0l4262b9a8"
    })
    
    this.init()
    
  },
  async init(){
    const student_res = await  this.call({
      path: '/students/myInfo',
      method: "GET",
    })

    const teacher_res = await this.call({
      path: '/teachers/myInfo',
      method: "GET",
    })

    if(student_res ){
      this.globalData.userInfo = student_res;
      wx.redirectTo({
        url: '/pages/student/joinClass',
      })
    } else if (teacher_res){
      this.globalData.userInfo = teacher_res;
      wx.redirectTo({
        url: '/pages/teacher/index',
      })
    }
  },

  globalData: {
    weixinServer: 'problem-end',
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