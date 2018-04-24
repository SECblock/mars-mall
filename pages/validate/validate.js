// pages/validate/validate.js
import CONSTANT from '../../constant/index'
import { fill } from '../../services/user'
import { toast, IdentityCodeValid, isName } from '../../utils/function'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    name: '',
    idCard: '',
    inviteCode: '',
    isInputName: false,
    isInputIdCard: false,
    isInputCode: false,
  },
  nameInput(e) {
    if (e.detail.value) {
      this.setData({
        isInputName: true
      })
    } else {
      this.setData({
        isInputName: false
      })
    }
    this.setData({
      name: e.detail.value
    })
  },
  idCardInput(e) {
    if (e.detail.value) {
      this.setData({
        isInputIdCard: true
      })
    } else {
      this.setData({
        isInputIdCard: false
      })
    }
    this.setData({
      idCard: e.detail.value
    })
  },
  inviteInput(e) {
    if (e.detail.value) {
      this.setData({
        isInputCode: true
      })
    } else {
      this.setData({
        isInputCode: false
      })
    }
    this.setData({
      inviteCode: e.detail.value
    })
  },
  fillMsg() {
    let that = this
    if(this.data.loading) {return}
    if(!this.data.name || !IdentityCodeValid(this.data.idCard) || !isName(this.data.name)) {
      return this.show('请输入正确的身份信息')
    }
    this.setData({
      loading: true
    })
    const userId = wx.getStorageSync(CONSTANT['COOKIE_USER_ID'])
    const nickname = wx.getStorageSync(CONSTANT['COOKIE_USER_NAME'])
    const headIcon = wx.getStorageSync(CONSTANT['COOKIE_USER_HEAD'])

    const options = {
      userId: userId,
      nickname: nickname,
      headIcon: headIcon,
      name: this.data.name,
      IDcard: this.data.idCard,
      inviteCode: this.data.inviteCode || ''
    }

    fill(options).then(data => {
      this.setData({
        loading: false
      })
      wx.setStorage({
        key: CONSTANT['COOKIE_USER_INFO_FILL'],
        data: false
      })
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }, e => {
      console.log(e)
      this.show(e.error)
      this.setData({
        loading: false
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    new app.ToastPannel();
    const inviteCode = wx.getStorageSync(CONSTANT['COOKIE_USER_INVITE_CODE'])
    this.setData({
      code: inviteCode,
      inviteCode: inviteCode,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})