import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
   
  },
  //表单项内容回调
  handleInput(event){
   // let type = event.currentTarget.id //id传值 取值
   let type = event.currentTarget.dataset.type;  //data-key = value  传值
    // console.log(type,event.detail.value);
   // console.log(event);
    this.setData({
      [type]:event.detail.value
    })
  },

  //登录的回调
  async login(){
      //1| 收集表单项数据
      let {email,password}  = this.data;
      // 2. 前端验证
      /*
      * 邮箱验证：
      *   1. 内容为空
      *   2. 邮箱格式不正确
      *   3. 邮箱格式正确，验证通过
      * */
    if (!email) {
        wx.showToast({
          title:'邮箱不能为空',
          icon:'none'
        })
        return;
    }
    //定义正则表达式
    let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/;
    if(!emailReg.test(email)){
      wx.showToast({
        title:'邮箱格式错误',
        icon:'none'
      })
      return;
    }
    if(!password){
      wx.showToast({
        title:'密码不能为空',
        icon:'none'
      })
      return;
    }
    //后端验证
    let result = await request('/login', {email, password, isLogin: true})
    if(result.code === 200){ // 登录成功
      wx.showToast({
        title: '登录成功'
      })
      console.log('------',result);
      // 将用户的信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))

      
      
      // 跳转至个人中心personal页面
      wx.reLaunch({
        url: '/pages/personal/personal'
      })
    }else if(result.code === 400){
      wx.showToast({
        title: '邮箱错误',
        icon: 'none'
      })
    }else if(result.code === 502){
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }
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