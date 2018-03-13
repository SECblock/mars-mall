import { Api } from '../utils/request.js'
import { getUserId } from '../utils/functions'
import CONSTANT from '../constant'

function getUser() {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: {
                userId: getUserId()
            },
            header: {
                'api': 'debut.user-center.user.query'
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

function login(code) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: {
                code
            },
            header: {
                'api': 'debut.user-center.user.login',
            }
        }).then(res => {
            console.log("request---", res)
            if (res.status != 0) {
                let err = new Error(res.msg)
                err.code = res.status
                err.data = res.data
                return reject(err)
            }
            return resolve(res.data)
        }, e => {
            return reject(e)
        })
    })
}

function register(user, clientInfo) {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            method: "POST",
            data: {
                "nickname": user.nickName,
                "headIcon": user.avatarUrl,
                "gender": user.gender
            },
            header: {
                'clientInfo': clientInfo,
                'api': 'debut.user-center.user.regist',
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
    getUser: getUser,
    login: login,
    register: register,
}