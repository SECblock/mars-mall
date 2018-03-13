import { Api } from '../utils/request.js'
import CONSTANT from '../constant'
import { getUserId } from '../utils/functions'
import _ from 'underscore'

function checkout(options) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            header: {
                'api': 'debut.order-center.order',
            },
            data: _.extend(options, { userId: getUserId() }),
        }).then(res => {
            if (res.status != 0) {
                let err = new Error(res.msg)
                err.code = res.status
                return reject(err)
            }
            return resolve(res.data || {})
        }, e => {
            return reject(e)
        })
    })
}

function pay(options) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: options,
            header: {
                'api': 'debut.order-center.pay',
            }
        }).then(res => {
            if (res.status != 0) {
                let err = new Error(res.msg)
                err.code = res.status
                return reject(err)
            }
            return resolve(res.data || {})
        }, e => {
            return reject(e)
        })
    })
}


module.exports = {
    checkout,
    pay,
}