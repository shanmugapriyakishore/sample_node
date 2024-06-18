const productServices = require("../services/productServices")

//productfunction call
const productDetails = async (req,res)=>{
    const productdata = await productServices .createProductDetails(req.body);
    res.send(productdata)
}

//getAllProducts function
const getProductAll = async(req,res)=>{
    const product = await productServices.getProducts(req);
    res.json({
    count:product.length,
    product
})
}
//get specific product
const getSpecificProduct = async (req, res) => {
    const getproductDetails = await productServices.getspecificProduct(req.params.id);
    res.send( getproductDetails);
  };
//delete product
const deleteProduct = async (req,res)=>{
    const deleteproduct  =  await productServices.deleteProduct(req.params.id)
    res.send(deleteproduct)
}  
//get Active user
const getActiveProducts = async(req,res)=>{
      const product = await productServices.getActiveProducts()
      const activeProduct = product.filter(product=> product.active)
      res.send(activeProduct)
}

//updateProduct
const productUpdatedata = async (req,res)=>{
    const updateproduct = await productServices.productData(req.params.id,req.body);
    res.send(updateproduct)
}


module.exports = {
    productDetails,
    getProductAll,
    getSpecificProduct,
    deleteProduct,
    getActiveProducts,
    productUpdatedata

}