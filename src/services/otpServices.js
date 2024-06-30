const otpmodel = require("../models/otpModel")
const registerModel = require("../models/registerModels")


const verifyOtp = async (email, otp) => {
    try {
      // Find OTP in the database
      const validOtp = await otpmodel.findOne({ email, otp });
  
      if (validOtp) {
        // If OTP is valid, find and return the user
        const user = await registerModel.findOne({ email });
        if (user) {
            user.isVerified = true;
            await user.save();
          // Optionally, delete the OTP after successful verification
          await otpmodel.deleteOne({ email, otp });
          return user;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw new Error('Failed to verify OTP.');
    }
  };
  
  module.exports = { verifyOtp };