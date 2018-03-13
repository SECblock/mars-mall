function getUserInfo() {
    return new Promise((resolve, reject) => {
        let obj = {}
        obj.success = function(res) {
            console.log("success---", res)
            return resolve(res.userInfo)
        }
        obj.fail = function(res) {
            return reject(res)
        }
        wx.getUserInfo(obj)
    })
}

function wxGetWechatAddress() {
    return new Promise((resolve, reject) => {
        let obj = {}
        obj.success = function(res) {
            console.log("success---", res)
            return resolve(res)
        }
        obj.fail = function(res) {
            return reject(res)
        }
        wx.chooseAddress(obj)
    })
}

function wxRequestPayment(obj) {
    return new Promise((resolve, reject) => {
        obj.success = function(res) {
            if (res.errMsg === 'requestPayment:cancel') {
                return reject(new Error('requestPayment:cancel'))
            }
            console.log("success---", res)
            return resolve(res)
        }
        obj.fail = function(res) {
            return reject(new Error(res.errMsg))
        }
        wx.requestPayment(obj)
    })
}

module.exports = {
    getUserInfo: getUserInfo,
    wxGetWechatAddress: wxGetWechatAddress,
    wxRequestPayment: wxRequestPayment,
}