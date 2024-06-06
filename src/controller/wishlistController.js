const wishlistServices = require("../services/wishlistServices")

//wishlistfunction call
const wishlistDetails = async (req,res)=>{
    const wishlistdata = await wishlistServices.createwishlistDetails(req.body);
    res.send(wishlistdata)
}

module.exports = {
    wishlistDetails
}