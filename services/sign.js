import { Request } from '../utils/request'
import { getUserId } from '../utils/function'
const sign = ()=>{
  const options = {
    url:``,
    data: {
      userId: getUserId()
    },
    method: `POST`,
    api: `debut.user-center.user.sign`
  }
  return Request(options)
}
const isSign = () =>{
  const options = {
    url: ``,
    data: {
      userId: getUserId()
    },
    method: `POST`,
    api: `debut.user-center.user.isSign`
  }
  return Request(options)
}
module.exports = {
  sign: sign,
  isSign: isSign
}
