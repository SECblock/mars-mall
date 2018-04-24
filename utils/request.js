import CONSTANT from '../constant/index'
import { getClientInfo } from './function'

const Request = function (obj) {
  return new Promise(function(resolve,reject){
    //网络请求
    wx.request({
      url: CONSTANT['DEFAULT_INTERFACE_URL'] + obj.url,
      data: obj.data || '',
      method: obj.method.toUpperCase() || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'api': obj.api,
        'clientInfo': obj.clientInfo || getClientInfo(),
      }, // 设置请求的 header
      success: function(res){
        // success网络请求成功
        if(res.statusCode!=200){
          reject({error:'服务器忙，请稍后重试',code:500});
          return;
        }
        if(res.data.status !== 0) {
          return reject({
            error: res.data.msg,
            code: res.data.status,
            data: res.data.data
          })
        }
        resolve(res.data.data || '');
      },
      fail: function(res) {
        // fail调用接口失败
        reject({error:'网络错误',code:0});
      },
      complete: function(res) {
        // complete
      }
    })
 })
}

module.exports = {
  Request: Request
}
