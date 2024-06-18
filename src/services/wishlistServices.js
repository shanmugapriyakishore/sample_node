const wishlistModel = require("../models/wishlistModel")
const productModel = require("../models/productModel")

//createwhishlistdata
const createwishlistDetails = async(body)=>{
    const createwishlistData = await wishlistModel.create(body)
    return createwishlistData ;
}
//userwishlistdata
const getWishlistByUserId = async (userId) => {
    const userwishlist = await wishlistModel.find( {userID: userId  });

    const productIds = userwishlist.map(item => item.productId);
    console.log(productIds)
    const products = await productModel.find({ _id: { $in: productIds } }, 'productName');
    console.log( products)
    return products.map(product => product.productName);
};



module.exports = {
    createwishlistDetails,
    getWishlistByUserId
}