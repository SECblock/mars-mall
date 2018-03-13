import _ from 'underscore'
import { getClientInfo } from './functions'

function Api(obj) {
    return new Promise((resolve, reject) => {
        obj.header = _.assign({
            "Content-Type": "application/json",
            "clientInfo": getClientInfo()
        }, obj.header)
        obj.success = function(res) {
            return resolve(res.data || {})
        }

        obj.fail = function(res) {
            return reject(new Error(res.msg))
        }

        wx.request(obj)
    })
}

module.exports = {
    Api: Api
}