const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

//clear data
router.route("/register").post(userController.createUserDetails)
//get data
router.route("/getuserdata").get(userController.getUserAll)
// get by id
router.route('/getbyid/:id').get(userController.getSpecificUser)
//login user
router.route('/login').post(userController.loginuser);


module.exports = router;