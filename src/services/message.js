import { Api } from '../utils/request.js'
import CONSTANT from '../constant'
import { getThirdId, timeDiff } from '../utils/functions'


function getAccessToken() {
    return new Promise((resolve, reject) => {
        Api({
            url: CONSTANT['INTERFACE'],
            header: {
                'api': 'debut.user-center.user.accessToken',
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

function sendMessage(token, msg, type) {
    let template = {}
    if (type == 'success') {
        template = {
            "keyword1": {
                "value": `${(msg.payAmount / 100).toFixed(2)}元`,
            },
            "keyword2": {
                "value": msg.name,
            },
            "keyword3": {
                "value": timeDiff(msg.timeStamp),
            },
            "keyword4": {
                "value": msg.orderId,
            },
            "keyword5": {
                "value": msg.address,
            },
            "keyword6": {
                "value": "您的订单支付成功，商家将在指定时间内完成发货",
            }
        }
    } else {
        template = {
            "keyword1": {
                "value": msg.orderId,
            },
            "keyword2": {
                "value": msg.name,
            },
            "keyword3": {
                "value": `${(msg.payAmount / 100).toFixed(2)}元`,
            },
            "keyword4": {
                "value": "未支付即将自动取消",
                "color": "#FF0000"
            },
            "keyword5": {
                "value": "您的订单未支付，请点击订单详情页完成支付",
            }
        }
    }
    return new Promise((resolve, reject) => {
        const data = {
            touser: getThirdId(),
            template_id: msg.typeId,
            page: `pages/order/detail?orderId=${msg.orderId}`,
            form_id: msg.prepayId,
            data: template
        }
        console.log("message---", data)
        Api({
            url: `${CONSTANT['MESSAGE_INTERFACE']}?access_token=${token}`,
            method: "POST",
            data: data,
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
    getAccessToken: getAccessToken,
    sendMessage: sendMessage,
}