import CONSTANT from '../constant'
import { Base64 } from 'js-base64'


function getClientInfo() {
    const client = wx.getStorageSync(CONSTANT['COOKIE_X_CLIENT_INFO'])
    if (!client) {
        return Base64.encode(JSON.stringify({
            userId: "",
            sessionKey: "",
            clientIp: "",
            clientType: CONSTANT['DEFAULT_CLIENT_TYPE'],
            version: CONSTANT['DEFAULT_VERSION']
        }))
    }
    return client
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

function getUserId() {
    return wx.getStorageSync(CONSTANT['COOKIE_USER_ID'])
}

function getThirdId() {
    return wx.getStorageSync(CONSTANT['COOKIE_USER_THIRD_ID'])
}


function timeDiff(time) {
    const date = new Date(parseInt(time) * 1000)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 + ''
    let day = date.getDate() + ''
    let hour = date.getHours() + ''
    let minute = date.getMinutes() + ''
    let second = date.getSeconds() + ''
    if (month.length == 1) {
        month = '0' + month
    }
    if (day.length == 1) {
        day = '0' + day
    }
    if (hour.length == 1) {
        hour = '0' + hour
    }
    if (minute.length == 1) {
        minute = '0' + minute
    }
    if (second.length == 1) {
        second = '0' + second
    }
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

module.exports = {
    getClientInfo: getClientInfo,
    calcClientInfo: calcClientInfo,
    setAccount: setAccount,
    getUserId: getUserId,
    getThirdId: getThirdId,
    timeDiff: timeDiff,
}