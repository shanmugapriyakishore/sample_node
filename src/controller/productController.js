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
//get products with sorting by price
const getProducts = async(req,res)=>{
   
    const products = await productServices.getSortedProducts(req.body);
    res.status(200).json({
        success: true,
        data: products
    });
};
//get products sorting by Date
const getproductswithDate = async(req,res)=>{
    const getproductDate = await productServices.getProductsByDate(req.body);
   res.send(getproductDate)
}
//get products Sort by pricerange
const filterItems = async (req, res) => {
    const { minPrice, maxPrice } = req.body;

        const items = await productServices.filterItemsByPrice(minPrice, maxPrice);
        res.send(items)
    };

//add product with new field
const addFieldProducts = async (req, res) => {
    const { filter, update } = req.body;
  
      const result = await productServices.updateManyProducts(filter, update);
      res.send(result)
      
  };



//get product with pagination
const getPagination = async(req,res)=>{
    const getproductPage = await productServices.getAllProducts(req.params.page);
   res.send(getproductPage)
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
    productUpdatedata,
    getPagination,
    getProducts,
    getproductswithDate,
    filterItems,
    addFieldProducts

}