import CONSTANT from '../constant/index'
// import { isFill } from '../services/user'
import { Base64 } from '../libraries/base64.min'

function getClientInfo() {
  const client = wx.getStorageSync(CONSTANT['COOKIE_X_CLIENT_INFO'])
  if (!client) {
    return Base64.encode(JSON.stringify({
      userId: '',
      sessionKey: "",
      clientIp: "",
      clientType: CONSTANT['DEFAULT_CLIENT_TYPE'],
      version: CONSTANT['DEFAULT_VERSION']
    }))
  }
  return client
}

function setAccount(res) {
  console.log("setAccount", res)
  wx.setStorage({
    key: CONSTANT['COOKIE_USER_ID'],
    data: res.user.userId
  })
  wx.setStorage({
    key: CONSTANT['COOKIE_USER_NAME'],
    data: res.user.nickname
  })
  wx.setStorage({
    key: CONSTANT['COOKIE_USER_HEAD'],
    data: res.user.headIcon
  })
  wx.setStorage({
    key: CONSTANT['COOKIE_USER_SESSIONKEY'],
    data: res.sessionKey
  })
  wx.setStorage({
    key: CONSTANT['COOKIE_USER_MOBILE'],
    data: res.user.mobile
  })
  wx.setStorage({
    key: CONSTANT['COOKIE_USER_THIRD_ID'],
    data: res.openId
  })
  wx.setStorage({
    key: CONSTANT['COOKIE_X_CLIENT_INFO'],
    data: calcClientInfo(res)
  })
}

function calcClientInfo(res) {
  return Base64.encode(JSON.stringify({
    userId: res.user.userId,
    sessionKey: res.sessionKey,
    clientIp: "",
    clientType: CONSTANT['DEFAULT_CLIENT_TYPE'],
    version: CONSTANT['DEFAULT_VERSION']
  }))
}

function getUserId() {
  return wx.getStorageSync(CONSTANT['COOKIE_USER_ID'])
}

function getThirdId() {
  return wx.getStorageSync(CONSTANT['COOKIE_USER_THIRD_ID'])
}

function isMobile(val) {
  let regex = /^0?1[1-9][0-9]{9}$/;
  return regex.test(val);
}

function toast(title) {
  wx.showToast({
    title: title,
    duration: 1500,
    image:'../../images/tips.png'
  })
}

function checkInfo() {
  const isFill = wx.getStorageSync(CONSTANT['COOKIE_USER_INFO_FILL'])
  if (isFill) {
    wx.navigateTo({
      url: '/pages/validate/validate'
    })
  }
}

function checkLogin() {
  const userId = wx.getStorageSync(CONSTANT['COOKIE_USER_ID'])
  if (!userId) {
    return wx.redirectTo({
      url: '/pages/register/register'
    })
  }
}
function IdentityCodeValid(code) {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  var tip = "";
  var pass = true;

  if (!code || !(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(code))) {
    tip = "身份证号格式错误";
    pass = false;
  }

  else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  }
  else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  return pass;
}
const isName = (str) => {
  if(str.length > 10) {
    return false
  }
  return str == str.replace(/[^\u4E00-\u9FA5]/g, '')
}
function format(time) {
    var date = new Date(time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '.';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
    let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    let h = date.getHours() + ':';
    let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
}
module.exports = {
  getClientInfo: getClientInfo,
  calcClientInfo: calcClientInfo,
  setAccount: setAccount,
  getUserId: getUserId,
  getThirdId: getThirdId,
  isMobile: isMobile,
  toast: toast,
  checkInfo: checkInfo,
  checkLogin: checkLogin,
  IdentityCodeValid: IdentityCodeValid,
  isName: isName,
  format: format
}
