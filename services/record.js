import { Request } from '../utils/request'
import { getUserId } from '../utils/function'
const getRecordList = ()=>{
  const options = {
    url:``,
    data: {
      userId: getUserId()
    },
    method: `POST`,
    api: `debut.user-center.user.score.detail`
  }
  return Request(options)
}

module.exports = {
  getRecordList: getRecordList
}
