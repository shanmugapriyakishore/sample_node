const express = require("express")
const productController = require("../controller/productController")
const router = express.Router()

//create product data
router.route("/newproduct").post(productController.productDetails)
//get product data
router.route("/getproductdata").get(productController.getProductAll)
// get by product id
router.route('/getproductid/:id').get(productController.getSpecificProduct)
//delete product
router.route("/delete/:id").delete(productController.deleteProduct);
//get active product
router.route("/getActiveProduct").get(productController.getActiveProducts)
// updateproduct
router.route("/get/product/update/:id").put(productController.productUpdatedata)
//get all products with pagination
router.route("/getAllProducts/:page").get(productController.getPagination)
//get all products with sorting method by price
router.route("/getproducts").get(productController.getProducts)
//get products with dateSorting
router.route("/getproducts/Date").get(productController.getproductswithDate)
//get price with range
router.route("/getProductwithRange").post(productController.filterItems)
//addFieldtoproduct
router.route('/addFieldToAllProducts').patch(productController.addFieldProducts);
// using pipeline method


module.exports = router;