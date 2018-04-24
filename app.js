import CONSTANT from '/constant/index'
import { getUser, login, register, isFill } from '/services/user'
import { setAccount, calcClientInfo } from '/utils/function'
import { getUserInfo } from '/utils/promise'
import { ToastPannel } from '/components/toast/toast'

App({
  ToastPannel,
  onLaunch: function (option) {
    // 调用 API 从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    console.log('app', option)
    this.globalData.code = option.inviteCode || ''
  },
  onShow() {
    // const userId = wx.getStorageSync(CONSTANT['COOKIE_USER_ID'])
    // this.checkFill(userId);
    // this.wxLogin();
    // this.onLaunch();
  },
  getUserInfoApp: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      // 调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  wxLogin() {
    let that = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success: res => {
          const options = {
            withCredentials: true
          }

          getUserInfo(options).then(userData => {
            const { rawData, signature, encryptedData, iv } = userData
            login(res.code).then(data => {
              console.log('dasdas', data)
              setAccount(data)
              that.checkFill(data.user.userId)
              resolve('')
            }, e => {
              console.log('login', e)
              if (e.code === 10010 || e.code === 10002) {
                // e.data.inviteCode = code
                return wx.redirectTo({
                  url: '/pages/register/register?data=' + JSON.stringify(e.data)
                })
                // this.registerAccount(e.data)
              }
              reject(e)
            })
          }, e => {
            console.log('getUser', e)
            resolve(e)
          })
        }
      })
    })

  },
  checkFill(userId) {
    isFill(userId).then(res => {
      wx.setStorage({
        key: CONSTANT['COOKIE_USER_INFO_FILL'],
        data: res ? true : false
      })
      if (res) {
        wx.redirectTo({
          url: '/pages/validate/validate'
        })
      }
    }, e => {
      console.log('isfill', e)
    })
  },
  globalData: {
    userId: null,
    code: '',
  }
})
