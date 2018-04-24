// pages/index/index.js
import { getRankList, getUser } from '../../services/user'
import { getRecordList } from '../../services/record'
import { sign, isSign } from '../../services/sign'
import { checkInfo, checkLogin } from '../../utils/function'
import CONSTANT from '../../constant/index'

const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    userList: {},
    score: 0,
    isSign: false,
    signLoading: false,
    signScore: 0,
    inviteScore: 0,
    loginTime: 0,
  },
  scroll(event) {
    if (event.detail.scrollTop) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#4781c4'
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#012149'
      })
    }
  },
  navigator(event) {
    let target = event.currentTarget.id
    if (target === 'diamond') {
      wx.navigateTo({
        url: "/pages/record/record"
      })
    } else {
      wx.redirectTo({
        url: "../me/me"
      })
    }
  },
  invite() {
    wx.navigateTo({
      url: '../invite/invite'
    })
  },
  init() {
    let time = this.data.loginTime
    time++
    this.setData({
      loginTime: time
    })
    checkInfo()
    this.getUserInfo()
    this.getRankList();
    // this.getRecord();
    this.checkSign();
    this.initScore();
  },
  initScore() {
    this.setData({
      signScore: CONSTANT['ADD_SCORE'],
      inviteScore: CONSTANT['INVITE_SCORE'],
    })
  },
  getRankList() {
    const userId = wx.getStorageSync(CONSTANT['COOKIE_USER_ID'])
    getRankList(userId).then(data => {
      this.setData({
        userList: data.list
      })
    }, e => {
      console.log(e)
    })
  },
  getRecord() {
    let that = this
    let record = 0
    // getRecordList().then(res => {
    //   if(!res.list) {return}
    //   for(let item of res.list) {
    //     record += item.score
    //   }
    //   this.setData({
    //     score: record
    //   })
    // }, e => {
    //   console.log(e)
    // })
  },
  checkSign() {
    let that = this
    isSign().then(res => {
      that.setData({
        isSign: res
      })
    }, e => {
      console.info("shouye", e)
    })
  },
  sign: function () {
    let that = this
    
    if (this.data.isSign) { return }
    if (this.data.signLoading) { return }
    this.setData({
      signLoading: true
    })
    sign().then(res => {
      that.setData({
        isSign: true
      })
      this.setData({
        signLoading: false
      })
      let newScore = this.data.score + CONSTANT['ADD_SCORE']
      newScore =  Math.round(newScore*10000)/10000
      this.setData({
        score: newScore
      })
    }, e => {
      console.info("签到失败", e)
      this.setData({
        signLoading: false
      })
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.init();
    new app.ToastPannel();
    this.login(options.inviteCode)
  },
  opentest() {
    // this.show('dasdasdasd')
  },
  onReady: function () {
    // 页面渲染完成
    wx.hideNavigationBarLoading()   
  },
  onShow: function () {
    // 页面显示
    // checkLogin()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  login(code) {
    const inviteCode = code || ''
    let time = 0
    wx.setStorage({
      key: CONSTANT['COOKIE_USER_INVITE_CODE'],
      data: inviteCode
    })
    try {
      const userId = wx.getStorageSync(CONSTANT['COOKIE_USER_ID'])
      const sessionKey = wx.getStorageSync(CONSTANT['COOKIE_USER_SESSIONKEY'])
      const openId = wx.getStorageSync(CONSTANT['COOKIE_USER_THIRD_ID'])
      console.log("userId---", userId)
      console.log("sessionKey---", sessionKey)
      if (userId === "" || sessionKey === "") {
        return app.wxLogin().then(() => {
          // this.getUserInfo()
          this.init()
        },e => {
          this.show(e.msg || '出错啦')
        })
      }
      app.checkFill(userId)
      this.init()
      // wx.redirectTo({
      //   url: '/pages/index/index'
      // })
    } catch (e) {
      console.log("eeeee", e)
      app.wxLogin().then(() => {
        this.setData({
          loginTime: time
        })
        this.init()
      })
    }
  },
  getUserInfo() {
    getUser().then(data => {
      if(data.score !== 0) {
        this.setData({
          score: parseFloat((data.score/10000).toFixed(4))
        })
      }
    }, e => {
      if (e.code === 1003 || e.code === 1013 || e.code === 10002) {
        app.wxLogin().then(() => {
          if(this.data.loginTime > 8) {
            return this.show('登录失败')
          }
          this.init();
        })
      }
    })
  }
})