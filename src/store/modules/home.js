import _ from 'underscore'
import ProductService from '../../services/product'
const state = {
    list: [],
    total: 0,
    detail: [],
    note: [],
    desc: [],
}

const getters = {
    productList: (state) => state.list,
    productListTotal: (state) => state.total,
    productDetail: (state) => state.detail,
    productNote: (state) => state.note,
    productDesc: (state) => state.desc,
}

const actions = {
    getProductList({ commit, rootState }, options) {
        return new Promise((resolve, reject) => {
            ProductService.getProductList(options).then(data => {
                commit("GetProductList", data)
                return resolve()
            }, e => {
                return reject(e)
            })
        })
    },
    getProductDetail({ commit, rootState }, id) {
        return new Promise((resolve, reject) => {
            const item = _.find(state.detail, v => {
                return v.id === id
            })
            if (!_.isEmpty(item)) {
                return resolve(item.data)
            }
            wx.showLoading({
                title: '正在加载中'
            })
            ProductService.getProductDetail(id).then(data => {
                wx.hideLoading()
                commit("GetProductDetail", { data, id })
                return resolve(data)
            }, e => {
                wx.hideLoading()
                return reject(e)
            })
        })
    },
    getProductNote({ commit, rootState }, id) {
        return new Promise((resolve, reject) => {
            const item = _.find(state.note, v => {
                return v.id === id
            })
            if (!_.isEmpty(item)) {
                return resolve(item.data)
            }
            ProductService.getProductNote(id).then(data => {
                commit("GetProductNote", { data, id })
                return resolve(data)
            }, e => {
                return reject(e)
            })
        })
    },
    getProductDesc({ commit, rootState }, id) {
        return new Promise((resolve, reject) => {
            const item = _.find(state.desc, v => {
                return v.id === id
            })
            if (!_.isEmpty(item)) {
                return resolve(item.data)
            }
            ProductService.getProductDesc(id).then(data => {
                commit("GetProductDesc", { data, id })
                return resolve(data)
            }, e => {
                return reject(e)
            })
        })
    },
    refreshProductDetail({ commit, rootState }, id) {
        return new Promise((resolve, reject) => {
            wx.showLoading({
                title: '正在加载中'
            })
            ProductService.getProductDetail(id).then(data => {
                wx.hideLoading()
                return resolve(data)
            }, e => {
                wx.hideLoading()
                return reject(e)
            })
        })
    },
    refreshProductNote({ commit, rootState }, id) {
        return new Promise((resolve, reject) => {
            ProductService.getProductNote(id).then(data => {
                return resolve(data)
            }, e => {
                return reject(e)
            })
        })
    },
    refreshProductDesc({ commit, rootState }, id) {
        return new Promise((resolve, reject) => {
            ProductService.getProductDesc(id).then(data => {
                return resolve(data)
            }, e => {
                return reject(e)
            })
        })
    },
    refreshProductList({ commit, rootState }, options) {
        return new Promise((resolve, reject) => {
            ProductService.getProductList(options).then(data => {
                commit("RefreshProductList", data)
                return resolve()
            }, e => {
                return reject(e)
            })
        })
    },
}

const mutations = {
    ["GetProductList"](state, value) {
        _.each(value.list, (v, i) => {
            const sku = _.find(v.skuList, k => {
                return k.id === v.defaultSkuId
            })
            v.img = sku.image
            v.marketPrice = (sku.marketPrice / 100).toFixed(2)
            v.price = (sku.price / 100).toFixed(2)
        })

        // state.list = state.list.concat(value.list)
        // state.total = value.total
        // return state
        return {
            ...state,
            list: state.list.concat(value.list),
            total: value.total
        }
    },
    ["RefreshProductList"](state, value) {
        _.each(value.list, (v, i) => {
            const sku = _.find(v.skuList, k => {
                return k.id === v.defaultSkuId
            })
            v.img = sku.image
            v.marketPrice = (sku.marketPrice / 100).toFixed(2)
            v.price = (sku.price / 100).toFixed(2)
        })

        return {
            ...state,
            list: value.list,
            total: value.total
        }
    },
    ["GetProductDetail"](state, value) {
        state.detail.push(value)
        return state
    },
    ["GetProductNote"](state, value) {
        state.note.push(value)
        return state
    },
    ["GetProductDesc"](state, value) {
        state.desc.push(value)
        return state
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}