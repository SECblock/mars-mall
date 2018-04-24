import { getUser } from '../../services/user'
import { getRecordList } from '../../services/record'
import { format, toast } from '../../utils/function'
import CONSTANT from '../../constant/index'
const app = getApp()
Page({
  data: {
    score: 0,
    list:{},
    time: '',
    signType: CONSTANT.ADD_SCORE,
    inviteType: CONSTANT.INVITE_SCORE
  },
  getUserInfo: function() {
    let self = this
    getUser().then(res => {
      self.setData({
        score:res.score,
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
    wx.showNavigationBarLoading()
    self.getUserInfo()
    // getUser().then(res=>{
    //   self.setData({
    //     score: res.score
    //   })
    // },e=>{
    //   toast(e.error)
    // })
    getRecordList().then(res=>{
      for(let i=0; i< res.list.length; i++) {
        res.list[i]["createTime"] = format(res.list[i]["createTime"])
      }
      self.setData({
        list: res.list
      })
      wx.hideNavigationBarLoading() 
    },e=>{
      toast(e.error)
    })
    
  }
})
