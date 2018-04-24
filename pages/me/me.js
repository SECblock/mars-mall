import { sign, isSign } from '../../services/sign'
import { getUser } from '../../services/user'
import { toast } from '../../utils/function'
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    userId: '',
    isSign: false,
    isCurrent: false,
    isActive: true,
    headPic: '../../images/default-head.jpg'
  },
  invite: function() {
    wx.navigateTo({
      url: '../invite/invite'
    })
  },
  assets: function() {
    wx.navigateTo({
      url: '../record/record'
    })
  },
  sign: function() {
    let self = this
    sign().then(res=>{
      self.setData({
        isSign: true
      })
    },e=>{
      toast(e.error)
    })
  },
  jumpDiamond: function(event){
    let self = this
    if(self.data.isCurrent) {
      return
    }
    self.setData({
      isActive: false,
      isCurrent: true
    })
    wx.redirectTo({
      url: '../index/index'
    })
    
  },
  jumpMe: function(event){
    let self = this
    if(self.data.isActive) {
      return
    }
    self.setData({
      isCurrent: false,
      isActive: true,
    })
    wx.redirectTo({
      url: '../me/me'
    })
  },
  getUserInfo: function() {
    let self = this
    getUser().then(res => {
      self.setData({
        userInfo:res,
      })
    }, e => {
      if (e.code === 1003) {
        wx.showToast({
          title: '登录超时，重新登录中...',
          icon: 'loading',
          duration: 2000
        })
        app.wxLogin().then(() => {
          this.init();
        })
      } else {
        toast(e.error)
      }
    })
  },
  sign: function() {
    let self = this
    isSign().then(res=>{
      self.setData({
        isSign: res
      })
    },e=>{
      toast(e.error)
    })
  },
  onLoad: function () {  
    let self = this
    self.getUserInfo()
    self.sign()
  },
  init: function() {
    let self = this
    self.getUserInfo()
    //self.sign()
  },
  onReady: function () {
    wx.hideNavigationBarLoading()    
  },
  onShow: function() {
    console.info("wode",this.data.headPic)
  }
})
