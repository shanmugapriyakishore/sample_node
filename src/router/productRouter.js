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



module.exports = router;