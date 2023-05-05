// pages/student/enterClass.js

import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    name: '',
    classList:[]
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

  select(){
    this.getClass()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getClass()
  },

  async setClass(detail){
    console.log(detail)
    await app.call({
      path:"/studentclass/create",
      data:{
        studentId: app.globalData.userInfo.id,
        classId: detail.currentTarget.dataset.classid
      }
    })
    Toast.success("选择成功")
  },

  convertToTree(flatData){
    let map = new Map();
    let pid;
    for(let i = 0; i < flatData.length;i++){
      pid = flatData[i].id;
      if(map.has(pid)){
        let tmp = {
          classId: flatData[i].classId,
          className: flatData[i].className,
          id: flatData[i].id,
          testId: flatData[i].testId,
          testName: flatData[i].testName,
          paperCount: flatData[i].paperCount,
          statusId: flatData[i].statusId,time:flatData[i].time
        };
        if(tmp.testId != null){
          map.get(pid).papersCount +=1
        } 
        map.get(pid).childrens.push(tmp);
      }else {
        let tmp = {
          classId: flatData[i].classId,
          className: flatData[i].className,
          id: flatData[i].id,
          testId: flatData[i].testId,
          testName: flatData[i].testName,
          
        };
        let in_tmp = {
          classId: flatData[i].classId,
          className: flatData[i].className,
          id: flatData[i].id,
          testId: flatData[i].testId,
          testName: flatData[i].testName,
          paperCount: flatData[i].paperCount,
          statusId: flatData[i].statusId,time:flatData[i].time
        };
        map.set(pid,tmp)
        if(!map.get(pid).childrens){

          map.get(pid).childrens = [];
        }
        if(!map.get(pid).papersCount){

          map.get(pid).papersCount = 0
        }
        if(tmp.testId != null){
          map.get(pid).papersCount +=1
          map.get(pid).childrens.push(in_tmp);
        }  
      }
    }console.log(map)
    let result = this.map2Ary(map)
    return result;


  },
  map2Ary(map2){
    let list3 = []
    console.log(map2)
    map2.forEach((val,key)=>{
      console.log("111:",val)
      console.log("222:",key)
      list3.push(map2.get(key))
    })
    console.log(list3)
    // for(let [key,val] of map){
    //   list.push(val)
    // }
    return list3;
  },
  async getClass(){
    let res =  await app.call({
      path:"/classes/teacherClass",
      data:{
        classId: this.data.code,
        className: this.data.name
      }
    })

    if(res){
      let arr = this.convertToTree(res)
      this.setData({
        classList: arr
      })

    }
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