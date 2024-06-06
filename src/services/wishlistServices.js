const wishlistModel = require("../models/wishlistModel")

//createwhishlistdata
const createwishlistDetails = async(body)=>{
    const createwishlistData = await wishlistModel.create(body)
    return createwishlistData ;
}

module.exports = {
    createwishlistDetails
}