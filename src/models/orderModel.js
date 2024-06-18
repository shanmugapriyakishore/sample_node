const mongoose = require("mongoose")
const{v4:uuidv4} = require("uuid")
const orderSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: uuidv4,
    },
    productId:{
       type : String,
       
    },
    userID:{
        type : String,
        
    },
     DeliveryStatus:{
        type : String,
       "default" :"pending",
    }
})
const orderModel = mongoose.model("order",orderSchema);
module.exports = orderModel;