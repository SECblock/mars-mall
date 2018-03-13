import { Api } from '../utils/request.js'
import CONSTANT from '../constant'

function getProvince() {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            header: {
                'api': 'debut.public-center.common.province',
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

function getCity(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            data: {
                provinceId: id
            },
            header: {
                'api': 'debut.public-center.common.city',
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

function getdistrict(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            data: {
                cityId: id
            },
            header: {
                'api': 'debut.public-center.common.district',
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
    getProvince,
    getCity,
    getdistrict
}