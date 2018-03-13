import { Api } from '../utils/request.js'
import { getUserId } from '../utils/functions'
import _ from 'underscore'
import CONSTANT from '../constant'

function getAddressList() {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: {
                userId: getUserId()
            },
            header: {
                'api': 'debut.user-center.user.address.list'
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

function getAddressById(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: {
                userId: getUserId(),
                addressId: id
            },
            header: {
                'api': 'debut.user-center.user.address.info',
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

function getAddressDefault(options) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: {
                userId: getUserId(),
            },
            header: {
                'api': 'debut.user-center.user.address.default',
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

function editAddressDefault(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: {
                userId: getUserId(),
                addressId: id
            },
            header: {
                'api': 'debut.user-center.user.address.default.edit',
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

function deleteAddress(id) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: {
                userId: getUserId(),
                addressId: id
            },
            header: {
                'api': 'debut.user-center.user.address.dele',
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

function editAddress(options) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: _.extend(options, { userId: getUserId() }),
            header: {
                'api': 'debut.user-center.user.address.edit',
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

function saveAddress(options) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: _.extend(options, { userId: getUserId() }),
            header: {
                'api': 'debut.user-center.user.address.save',
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
    saveAddress,
    editAddress,
    deleteAddress,
    editAddressDefault,
    getAddressDefault,
    getAddressById,
    getAddressList,
}