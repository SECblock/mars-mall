import { Api } from '../utils/request.js'
import { getUserId } from '../utils/functions'
import _ from 'underscore'
import CONSTANT from '../constant'

function getOrderList(options) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: _.extend(options, { userId: getUserId() }),
            header: {
                'api': 'debut.order-center.order.list'
            }
        }).then(res => {
            console.log("request---", res)
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

function getOrderDetail(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: {
                userId: getUserId(),
                orderId: id
            },
            header: {
                'api': 'debut.order-center.order.query',
            }
        }).then(res => {
            console.log("request---", res)
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

function getExpress(options) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "GET",
            data: options,
            header: {
                'api': 'debut.order-center.order.courierInfo',
            }
        }).then(res => {
            console.log("request---", res)
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

function notify(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "GET",
            data: {
                payOrderId: id
            },
            header: {
                'api': 'debut.order-center.order.delivery.notify',
            }
        }).then(res => {
            console.log("request---", res)
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
    getOrderList,
    getOrderDetail,
    getExpress,
    notify,
}