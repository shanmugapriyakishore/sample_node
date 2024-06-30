const express = require('express')
const router = express.Router()
const otpController = require('../controller/otpController')

router.route('/verify-otp').post(otpController.verifyOtpAndLogin)


module.exports = router;
