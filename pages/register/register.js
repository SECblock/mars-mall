import CONSTANT from '../../constant/index'
import { register, sendMsg } from '../../services/user'
import { setAccount, calcClientInfo, isMobile, toast } from '../../utils/function'
import { getUserInfo } from '../../utils/promise'

const app = getApp()
Page({
  data: {
    loading: false,
    dataObj: null,
    userData: null,
    sendDesc: '获取验证码',
    count: 60,
    curCount: 0,
    phone: '',
    sms: '',
    isSend: false,
    binding: false,
    codeErr: false,
    codeMsg: '请输入正确的验证码',
    InterValObj: '',
    isCheck: true,
    isInputPhone: false,
    isInputCode: false,
  },
  onLoad: function (options) {
    new app.ToastPannel();
    if (options.data) {
      this.setData({
        dataObj: JSON.parse(options.data)
      })
    }
    // var pages = getCurrentPages();//获取当前页面信息栈
    // var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    // console.log(pages, prevPage)
    getUserInfo(options).then(userData => {
      this.setData({
        userData: userData
      })
    }, e => {
      console.log('getUser', e)
    })
  },
  getCode() {
    let that = this;
    if (this.data.isSend) {
      return
    }
    this.setData({
      curCount: this.data.count
    })

    if (!isMobile(this.data.phone)) {
      this.show('请输入正确的手机号')
      return
    }
    this.setData({
      isSend: true,
      sendDesc: '发送中',
    })
    let options = {
      "type": 1,//0需要验证图片验证码，1不验证图片验证码
      "mobile": this.data.phone,
      "key": "", //图片验证码key
      "value": "",//图片验证码答案
    }
    sendMsg(options).then(() => {
      this.show('短信已发送')
      that.InterValObj = setInterval(that.setRemainTime, 1000);
    }, e => {
      console.log(e)
      this.show(e.msg || '出错啦')
      this.setData({
        isSend: false,
        sending: false
      })
    })
  },
  setRemainTime: function () {
    if (this.data.curCount == 0) {
      clearInterval(this.InterValObj);
      /*this.isSms = false;
       this.isSend = false; //启动按钮*/
      this.setData({
        isSend: false,
        sendDesc: '获取验证码'
      })
    } else {
      let countTime = this.data.curCount
      countTime--
      this.setData({
        curCount: countTime,
        sendDesc: countTime + '秒后重发'
      })
    }
  },
  phoneInput(e) {
    if (e.detail.value) {
      this.setData({
        isInputPhone: true
      })
    } else {
      this.setData({
        isInputPhone: false
      })
    }
    this.setData({
      phone: e.detail.value
    })
  },
  codeInput(e) {
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
      sms: e.detail.value
    })
  },
  checkboxChange(e) {
    let selected = e.detail.value.length > 0 ? true : false;
    this.setData({
      isCheck: selected
    })
  },
  bindMobile() {
    let that = this

    if (this.data.binding) {
      return
    }

    if (!isMobile(this.data.phone)) {
      this.show('请输入正确的手机号')
      return
    }

    if (!this.data.sms) {
      this.show('请输入正确的验证码')
      return
    }

    if (!this.data.isCheck) {
      this.show('请务必阅读并同意用户协议')
      return
    }

    let options = {
      mobile: this.data.phone,
      smsCode: this.data.sms,//短信验证码
    }

    this.setData({
      binding: true
    })
    this.registerAccount(options, this.data.dataObj)
    // serivce.register(op).then(() => {
    //   window.location.href = decodeURIComponent(this.url)
    // }, e => {
    //   console.info(e)
    //   vm.binding = false
    //   vm.codeErr = true
    //   vm.codeMsg = e.message
    // })

  },
  registerAccount(op, res) {
    const client = {
      user: {
        userId: ''
      },
      sessionKey: res.sessionKey,
    }
    const clientInfo = calcClientInfo(client)

    const { rawData, signature, encryptedData, iv } = this.data.userData
    const { mobile, smsCode } = op
    register({ rawData, signature, encryptedData, iv, mobile, smsCode }, clientInfo).then(account => {
      setAccount(account)
      this.setData({
        binding: false
      })
      wx.redirectTo({
        url: '/pages/validate/validate?code=' + res.inviteCode
      })
    }, e => {
      console.log('register', e)
      this.setData({
        binding: false,
        sms: '',
      })
      this.show(e.error)
    })
  },
  toRule() {
    wx.navigateTo({
      url: "/pages/agreement/agreement"
    })
  },
})