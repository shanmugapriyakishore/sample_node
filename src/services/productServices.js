const productModel = require("../models/productModel")
const APIFeatures = require("../utilis/apiFeatures")

//createproductdata
const createProductDetails = async(body)=>{
  const createdDate = new Date();
  const productData = {
    createdDate: createdDate,
  };
    const createproductData = await productModel.create({...productData,...body});
    return createproductData;
}
//getproductfunction
const getProducts = async(req)=>{
  const resPerPage = 2
  const apiFeatures = new APIFeatures(productModel.find({}),req.query).search().filter().paginate(resPerPage)
    const productDetails = await apiFeatures.query ;
    return productDetails
}
////getproductfunction
const getSortedProducts = async()=>{
  const getproductsPrice = await productModel.aggregate([
    {
      $sort:  {price: 1 }
    }

  ]);
  return getproductsPrice

};
//get products with date
const getProductsByDate = async()=>{
  const getsortedDate = await productModel.aggregate([
    {
      $match: {
        createdDate: { $exists: true }
      }
    },
    {$sort :{createdDate : 1}},
    //{$sort :{createdDate : -1}},

  ])
  return getsortedDate;


}
//get products by range
const filterItemsByPrice = async (minPrice, maxPrice) => {
  const query = {
      price: { $gte: minPrice, $lte: maxPrice }
  };
  const getProduct = await productModel.find(query);
  return getProduct
};

//addfield to product
const updateManyProducts = async(filter, update) => {
    const result = await productModel.updateMany
    (filter, { $set: update });
    return result;
  } ;



//get product by pagination
const getAllProducts = async (page) => {
  const allProducts = await productModel.aggregate([
    { $skip: page * 10},
    { $limit: 10 },
  ]);
  return allProducts;
};
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
//product Updatedata
const productData = async (id,body)=>{
    const product = await productModel.findById({_id:id});
    if (!product) {
        console.log("product not found");
    }

    const updatedData = await productModel.findByIdAndUpdate(
        id,
        body,
        { new: true }
    );

    return updatedData;

};





module.exports = {
    createProductDetails,
    getProducts,
    deleteProduct,
    getspecificProduct,
    getActiveProducts,
    productData,
    getAllProducts,
    getSortedProducts,
    getProductsByDate,
    filterItemsByPrice,
    updateManyProducts
}