import { Api } from '../utils/request.js'
import CONSTANT from '../constant'

function getProductList(obj) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: obj,
            header: {
                'api': 'debut.goods-center.goods.list'
            }
        }).then(res => {
            console.log("request---", res)
            return resolve(res.data)
        }, e => {
            return reject(e)
        })
    })
}

function getProductDetail(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            data: {
                goodsId: id
            },
            header: {
                'api': 'debut.goods-center.goods.info',
            }
        }).then(res => {
            console.log("request---", res)
            if (res.status != 0) {
                let err = new Error(res.msg)
                err.code = res.status
                return reject(err)
            }
            return resolve(res.data)
        }, e => {
            return reject(e)
        })
    })
}

function getProductDesc(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            data: {
                goodsId: id
            },
            header: {
                'api': 'debut.goods-center.goods.desc',
            }
        }).then(res => {
            console.log("request---", res)
            if (res.status != 0) {
                let err = new Error(res.msg)
                err.code = res.status
                return reject(err)
            }
            return resolve(res.data)
        }, e => {
            return reject(e)
        })
    })
}

function getProductNote(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            data: {
                goodsId: id
            },
            header: {
                'api': 'debut.goods-center.goods.buyNote',
            }
        }).then(res => {
            console.log("request---", res)
            if (res.status != 0) {
                let err = new Error(res.msg)
                err.code = res.status
                return reject(err)
            }
            return resolve(res.data)
        }, e => {
            return reject(e)
        })
    })
}

module.exports = {
    getProductList,
    getProductDetail,
    getProductDesc,
    getProductNote,
}