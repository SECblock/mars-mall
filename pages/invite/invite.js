import { getUser } from '../../services/user'
import { toast } from '../../utils/function'
const app = getApp()
Page({
  data: {
    inviteCode: '',
    nickname: '',
  },
  getUserInfo: function() {
    let self = this
    getUser().then(res => {
      self.setData({
        inviteCode:res.inviteCode,
        nickname: res.nickname
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
  init: function(){
    let self = this
    self.getUserInfo()
  },
  onLoad: function(){
    let self = this
    self.getUserInfo()
  },
  onShareAppMessage: function (res) {
    let self = this
    let inviteCode = self.data.inviteCode
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `${self.data.nickname}邀请你加入社交电商区块链平台，一起探索新世界。`,
      path: `/pages/index/index?inviteCode=${inviteCode}`,
      success: function(res) {
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
         });
      },
      fail: function(res) {
        // 转发失败
        toast("转发失败")
      }
    }
  },
  show(){
    let that=this
    wx.setClipboardData({
      data: that.data.inviteCode,
      success(){
        that.setData({
          inviteCode: that.data.inviteCode
        })
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    wx.getClipboardData({
      success(res){
        //console.log(res.data)
      }
    })
  }
})

