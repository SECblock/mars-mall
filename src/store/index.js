import Tinax from '../libraries/tinax.min'
import home from './modules/home'
import address from './modules/address'
import region from './modules/region'
const tinax = new Tinax({
    modules: {
        home,
        address,
        region,
    },
})
module.exports = tinax

// if (isDebug) {
//   global.tinax = tinax
// }
global.tinax = tinax