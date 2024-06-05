const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

//create data
router.route("/register").post(userController.createUserDetails)
//get data
router.route("/getuserdata").get(userController.getUserAll)
// get by id
router.route('/getbyid/:id').get(userController.getSpecificUser)
//login user
router.route('/login').post(userController.loginuser);
//delete user
router.route("/delete/:id").delete(userController.deleteUser);
//get active user
router.route("/getActiveuser").get(userController.getActiveusers)


module.exports = router;