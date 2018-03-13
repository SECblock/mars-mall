var data = {
    "data": {
        "payOrderId": "20170101001",
        "orderId": "20170101001", // string
        "name": "xiaoming", // string
        "address": "shennan road", // string
        "postCode": "518000", // string
        "phone": "13512345678", // string
        "expressAmount": 0, //uint32
        "endPayTime": 1480659697, //uint32, 支付截止时间
        "payTime": 1480659597, //uint32, 支付时间
        "totalPrice": 10000, //uint32 金额总计单位分
        "totalScore": 0, //uint32 积分总计
        "totalDiscountAmount": 2000, //uint32 优惠金额单位分
        "score": 0, //uint32 抵扣积分额,默认单位,积分数         
        "epayAmount": 2000, //uint32 余额、现金券、卖座卡抵扣金额单位分
        "externalPayAmount": 0, //uint32 //现金支付金额，外部支付/第三方支付金额单位分
        "orderStatus": 2, //uint32  订单状态
        "payStatus": 2, //uint32 支付状态 0：未支付 1已支付
        "payType": 1, //uint32 支付类型，0:非现金，1：支付宝，2：微信
        "deliveryType": 0, //发货类型
        "deliveryTime": 15012454665, // uint32 发货时间
        "receiptTime": 15015151515, //uint32 收货时间
        "virtualProduct": 0, //是否虚拟商品0非虚拟商品 1：虚拟商品
        "createdAt": 1480649697, //uint32 订单创建时间
        "supplierId": 1001,
        "packageList": [{
            "packageId": 1, //uint32 包裹id
            "packageType": 1, //  0：单包裹无skuList信息
            "expressCompanyId": 1, //uint32  快递公司Id
            "expressCompanyName": 1, //uint32  快递公司Name
            "expressId": "88888888", //string 快递单号
            "skuList": [{
                "skuId": 1,
                "skuCount": 2
            }, {
                "skuId": 2,
                "skuCount": 4
            }]
        }, {
            "packageId": 2, //uint32 包裹id
            "packageType": 1, //  0：单包裹无skuList信息
            "expressCompanyId": 1, //uint32  快递公司Id
            "expressCompanyName": 1, //uint32  快递公司Name
            "expressId": "88888888", //string 快递单号
            "skuList": [{
                "skuId": 1,
                "skuCount": 2
            }, {
                "skuId": 2,
                "skuCount": 4
            }]
        }],
        "skuList": [{
            "id": 1, //uint64   sku Id  
            "productId": 1, //uint64   product Id  
            "productName": "苹果", //string  product name
            "name": "64G", //string  sku name
            "image": "http://www.maizuo.com/mall/image/sku1.png", //string
            "count": 1, //uint32   sku数量  
            "price": 1000, //uint32   sku价格  
            "finalPrice": 800, //uint32   sku交易价格,和price一样后续废弃
            "marketPrice": 1000, //uint32   sku市场价格
            "score": 1234, //积分
            "productSource": 0, //商品渠道信息 0：普通商品  1：会员商品
            "attrTypeList": [1, 2]
        }],
        "epayDetailList": [{
            "skuId": 1, //uint64   sku Id 
            "epayType": 0, //uint32 0:优惠,  1:积分, 2:余额, 3:现金券, 4:卖座卡
            "epayId": "888", //string 优惠Id, 商品的（非现金）券Id  
            "epayCount": 0, //uint32 积分数量,  点卡数量等
            "epayAmount": 10000 //uint32 商品使用的优惠券等的金额单位分           
        }]
    }
}

module.exports = {
    orderData: data.data
}