const productServices = require("../services/productServices")

//productfunction call
const productDetails = async (req,res)=>{
    const productdata = await productServices .createProductDetails(req.body);
    res.send(productdata)
}

//getAllProducts function
const getProductAll = async(req,res)=>{
    const product = await productServices.getProducts();
    res.send(product)
}
//get specific product
const getSpecificProduct = async (req, res) => {
    const getproductDetails = await productServices.getspecificProduct(req.params.id);
    res.send( getproductDetails);
  };


module.exports = {
    productDetails,
    getProductAll,
    getSpecificProduct
}