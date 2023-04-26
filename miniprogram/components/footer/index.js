/* 应用下方新增按钮栏组件 */

Component({
  // footer 
  
  data:{
    active: 'home',
  },
  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      if(event.detail == 'classPaper'){
        wx.navigateTo({
          url: '/pages/student/joinClass',
        })
      }else if(event.detail == 'test'){
        wx.navigateTo({
          url: '/pages/student/test',
        })
      }
      console.log(event)
    },

    
  }
})