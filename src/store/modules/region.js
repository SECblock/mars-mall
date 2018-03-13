import _ from 'underscore'
import RegionService from '../../services/region'
const state = {
    province: [],
    city: [],
    district: []
}

const getters = {
    province: (state) => state.province,
    city: (state) => state.city,
    district: (state) => state.city,
}

const actions = {
    getProvince({ commit, state }) {
        return new Promise((resolve, reject) => {
            RegionService.getProvince().then(data => {
                commit("GetProvince", data)
                return resolve(data)
            }, e => {
                return reject(e)
            })
        })
    },
    getCity({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            const city = _.find(state.city, v => {
                return v.id === id
            })
            if (!_.isEmpty(city)) {
                return resolve(city.data)
            }
            RegionService.getCity(id).then(data => {
                commit("GetCity", { id, data })
                return resolve(data)
            }, e => {
                return reject(e)
            })
        })
    },
    getdistrict({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            const district = _.find(state.district, v => {
                return v.id === id
            })
            if (!_.isEmpty(district)) {
                return resolve(district.data)
            }
            RegionService.getdistrict(id).then(data => {
                commit("Getdistrict", { id, data })
                return resolve(data)
            }, e => {
                return reject(e)
            })
        })
    },
}

const mutations = {
    ["GetProvince"](state, data) {
        state.province = data
        return state
    },
    ["GetCity"](state, { id, data }) {
        state.city.push({ id, data })
        return state
    },
    ["Getdistrict"](state, { id, data }) {
        state.district.push({ id, data })
        return state
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}