const otpService = require('../services/otpServices');

const verifyOtpAndLogin = async (req, res) => {
    try {
      const { email, otp } = req.body;
      const user = await otpService.verifyOtp(email, otp);
  
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ error: 'Failed to verify OTP.' });
    }
  };
   module.exports = {
    verifyOtpAndLogin
   }