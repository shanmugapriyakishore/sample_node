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

        {
           $match: {
             $and: [{ _id: { $eq: id } }, { active: { $eq: true } }],
           },
         },
      ]);
//     {
//         $match: {
//           $or: [{ _id: { $eq: id } }, { productName: { $eq: "Webcam" } }],
//               },
//       },
//    ]);

     return ProductDetails;

}

//delete product
const deleteProduct = async (id) => {
    const deleteProductDetails = await productModel.findById({ _id: id });
    if (!deleteProductDetails) {
      console.log("product not found");
    } else {
      const deletedata = await productModel.findByIdAndDelete({ _id: id });
      console.log(deletedata);
    }
    return deleteProductDetails;
  };
    
  //get active users
const getActiveProducts = async()=>{
    const productDetails = await productModel.find({});
        return productDetails;
}





module.exports = {
    createProductDetails,
    getProducts,
    deleteProduct,
    getspecificProduct,
    getActiveProducts
}