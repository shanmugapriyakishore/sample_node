const express = require("express")
const router = express.Router()
const wishlistController = require("../controller/wishlistController")


router.route("/wishlistproduct").post(wishlistController.wishlistDetails)


module.exports = router;