import { Request } from '../utils/request'

const example = () => {
  const options = {
    url: `/example`,
    data: {},
    method: `GET`
  }
  return Request(options)
}

export default {
  example,
}