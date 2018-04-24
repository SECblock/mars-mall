import { Request } from '../utils/request'
import { getUserId } from '../utils/function'

const getUser = () => {
  const options = {
    url: ``,
    data: {
      userId: getUserId()
    },
    method: `POST`,
    api: 'debut.user-center.user.query'
  }
  return Request(options)
}

const login = (code) => {
  const options = {
    url: ``,
    data: {
      'code': code
    },
    method: `POST`,
    api: 'debut.user-center.user.login'
  }
  return Request(options)
}

const register = (user, clientInfo) => {
  const options = {
    url: ``,
    data: user,
    method: `POST`,
    api: 'debut.user-center.user.mobileRegist',
    clientInfo: clientInfo
  }
  return Request(options)
}

const isFill = (userId) => {
  const options = {
    url: ``,
    data: {
      userId: userId
    },
    method: 'POST',
    api: 'debut.user-center.user.isFill'
  }
  return Request(options)
}

const fill = (req) => {
  const options = {
    url: ``,
    data: req,
    method: 'POST',
    api: 'debut.user-center.user.fill'
  }
  return Request(options)
}

const sendMsg = (req) => {
  const options = {
    url: ``,
    data: req,
    method: 'POST',
    api: 'debut.public-center.common.sms.send'
  }
  return Request(options)
}

const getRankList = (userId) => {
  const options = {
    url: ``,
    data: {
      userId: userId
    },
    method: 'POST',
    api: 'debut.user-center.user.score.ranking'
  }
  return Request(options)
}

module.exports = {
  getUser: getUser,
  login: login,
  register: register,
  isFill: isFill,
  fill: fill,
  sendMsg: sendMsg,
  getRankList: getRankList,
}
