function getUserInfo() {
  return new Promise((resolve, reject) => {
      let obj = {}
      obj.success = function(res) {
          console.log("success---", res)
          return resolve(res)
      }
      obj.fail = function(res) {
          return reject(res)
      }
      wx.getUserInfo(obj)
  })
}

module.exports = {
  getUserInfo: getUserInfo,
}