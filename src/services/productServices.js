const productModel = require("../models/productModel")

//createproductdata
const createProductDetails = async(body)=>{
    const createproductData = await productModel.create(body)
    return createproductData;
}
//getproductfunction
const getProducts = async()=>{
    const productDetails = await productModel.find({});
    return productDetails
}
//getspecificproduct
const getspecificProduct = async(id)=>{
    //  const ProductDetails = await productModel.findById({_id:id})
    //  return ProductDetails
    const ProductDetails = await productModel.aggregate([
    //          {
    //              $match: {
    //                _id: id,
    //             },
    //         },
    //  ]);
    //     {
    //        $match: {
    //          $and: [{ _id: { $eq: id } }, { productName: { $eq: "Monitor" } }],
    //        },
    //      },
    //   ]);
    {
        $match: {
          $or: [{ _id: { $eq: id } }, { productName: { $eq: "Webcam" } }],
              },
      },
   ]);

     return ProductDetails;
}



module.exports = {
    createProductDetails,
    getProducts,
    getspecificProduct
}