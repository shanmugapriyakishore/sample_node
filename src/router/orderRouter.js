const express = require("express")
const router = express.Router()
const orderController = require("../controller/orderController")


router.route("/orderList").post(orderController.createDetails)


module.exports = router;