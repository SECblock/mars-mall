import _ from 'underscore'
import AddressService from '../../services/address'
let state = {
    defaultAddress: {},
    addressList: [],
    selectedAddress: {},
    isWechat: false,
    editAddress: {}
}

const getters = {
    defaultAddress: (state) => state.defaultAddress,
    addressList: (state) => state.addressList,
    selectedAddress: (state) => state.selectedAddress,
    isWechat: (state) => state.isWechat,
    editAddress: (state) => state.editAddress,
    selectId: (state) => state.selectedAddress.id || null
}

const actions = {
    getAddressList({ commit, state }) {
        return new Promise((resolve, reject) => {
            AddressService.getAddressList().then(data => {
                const list = _.sortBy(data || [], v => {
                    return !v.isDefault
                })
                console.log("666", list)
                commit("GetAddressList", list)
                return resolve()
            }, e => {
                return reject(e)
            })
        })
    },
    getAddressById({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            AddressService.getAddressById(id).then(data => {
                commit("GetAddressById", data)
                return resolve(data)
            }, e => {
                return reject(e)
            })
        })
    },
    getAddressDefault({ commit, state }) {
        AddressService.getAddressDefault().then(data => {
            if (_.isEmpty(data)) {
                return false
            }
            commit("GetAddressDefault", data)
        })
    },
    editAddressDefault({ commit, state }, id) {
        AddressService.editAddressDefault(id).then(data => {
            commit("EditAddressDefault", id)
        })
    },
    saveAddress({ commit, state }, options) {
        return new Promise((resolve, reject) => {
            AddressService.saveAddress(options).then(data => {
                commit("SaveAddress", _.extend(options, { id: data.addressId }))
                return resolve(data)
            }, e => {
                return reject(e)
            })
        })

    },
    editAddress({ commit, state }, options) {
        return new Promise((resolve, reject) => {
            const newOptions = _.omit(options, 'provinceName', 'cityName', 'districtName')
            AddressService.editAddress(newOptions).then(data => {
                commit("EditAddress", options)
                return resolve()
            }, e => {
                return reject(e)
            })
        })
    },
    deleteAddress({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            AddressService.deleteAddress(id).then(data => {
                commit("DeleteAddress", id)
                return resolve()
            }, e => {
                return reject(e)
            })
        })
    },
    setWechatAddress({ commit, state }, address) {
        commit("SetWechatAddress", address)
    },
    setSelectedAddress({ commit, state }, id) {
        console.log("id~~~", id)
        commit("SetSelectedAddress", id)
    },
}

const mutations = {
    ["GetAddressList"](state, value) {
        state.addressList = value
        return state
    },
    ["GetAddressById"](state, value) {
        state.editAddress = value
        return state
    },
    ["GetAddressDefault"](state, value) {
        state.defaultAddress = value
        state.selectedAddress = value
        state.isWechat = false
        return state
    },
    ["EditAddressDefault"](state, id) {
        const { addressList } = state
        _.each(addressList, v => {
            if (v.id === id) {
                v.isDefault = 1
            } else {
                v.isDefault = 0
            }
        })
        const list = _.sortBy(addressList || [], v => {
            return !v.isDefault
        })
        return {
            ...state,
            addressList: list
        }
    },
    ["SaveAddress"](state, value) {
        const { addressList } = state
        if (_.isEmpty(addressList)) {
            state.selectedAddress = value
        }
        addressList.push(value)
        return state
    },
    ["DeleteAddress"](state, value) {
        let { addressList, selectedAddress } = state
        const list = _.reject(addressList, v => {
            return v.id === value
        })
        if (value == selectedAddress.id) {
            return {
                ...state,
                addressList: list,
                selectedAddress: {}
            }
        }
        return {
            ...state,
            addressList: list
        }
    },
    ["EditAddress"](state, value) {
        let address = _.find(state.addressList, v => {
            return v.id === value.id
        })
        address = _.extend(address, value)
        return state
    },
    ["SetWechatAddress"](state, res) {
        const address = {
            name: res.userName,
            phone: res.telNumber,
            address: res.detailInfo,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
        }
        return {
            ...state,
            isWechat: true,
            selectedAddress: address
        }
    },
    ["SetSelectedAddress"](state, id) {
        let { selectedAddress, addressList } = state
        if (!id) {
            selectedAddress = {}
            return state
        }
        const address = _.find(addressList, v => {
            return v.id === id
        })
        console.log("select address !!!!", address)
        return {
            ...state,
            selectedAddress: address,
        }
        // return state
    },

}

export default {
    state,
    getters,
    actions,
    mutations,
}