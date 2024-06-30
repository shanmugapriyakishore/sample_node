const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')


//create data
router.route("/register").post(userController.createUserDetails)
router.route("/newregister").post(userController.registerUser)


//get data
router.route("/getuserdata").get(userController.getUserAll)
router.route("/getUserDetails").post(userController. getUserDetails)
// get by id
router.route('/getbyid/:id').get(userController.getSpecificUser)
//login user
router.route('/login').post(userController. loginUserController );
router.route('/newlogin').post(userController.loginuser)
//delete user
router.route("/delete/:id").delete(userController.deleteUser);
//get active user
router.route("/getActiveuser").get(userController.getActiveusers);
//fetch 
router.route("/fetchdata/:id").get(userController.getUser);

//aggregation
router.route("/user/wishlist/Product").get(userController.getwishlistproducts);
//getwishlistbyid
router.route("/get/wishlist/product/:id").get(userController.wishlistData)
//getordersbyid
router.route("/get/orders/byid/:id").get(userController.orderData)


//updtae user
router.route("/update/get/user/:id").put(userController. userUpdatedata)

module.exports = router;

