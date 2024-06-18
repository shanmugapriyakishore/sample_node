const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
//createorderData
const createOrderDetails = async(body)=>{
    const createOrderData = await orderModel.create(body)
    return createOrderData;
}
//userorderdata
const getOrdersByUserId = async (userId) => {
    const userOrder = await orderModel.find({ userID: userId  });

    const productIds = userOrder.map(order => order.productId);
    const products = await productModel.find({ _id: { $in: productIds } }, 'productName');

    return products.map(product => product.productName);
};


module.exports = {
    createOrderDetails,
    getOrdersByUserId
}