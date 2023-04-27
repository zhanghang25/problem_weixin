/* 应用下方新增按钮栏组件 */

Component({
  // footer 
    attached:function(){
      let pages = getCurrentPages()
      let currentPage = pages[pages.length - 1]
      let url = currentPage.route;
      console.log(url)
      if(url){
        switch(url){
          case 'pages/student/joinClass':
            console.log(1112)
            this.setData({active:'classPaper'})
            break;
          case 'pages/student/test':
            console.log(1113)
            this.setData({active:'test'})
            break;
        }
      }


    }
  ,
  data:{
    active: 'friends',
  },
  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      console.log(event.detail)
      if(event.detail == 'classPaper'){
        wx.redirectTo({
          url: '/pages/student/joinClass',
        })
      }else if(event.detail == 'test'){
        wx.redirectTo({
          url: '/pages/student/test',
        })
      }
      console.log(event)
    },

    
  }
})