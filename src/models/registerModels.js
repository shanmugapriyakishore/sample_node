const mongoose = require("mongoose");
const{v4:uuidv4} = require("uuid")
const registerSchema = new mongoose.Schema({
    _id:{
      type:String,
      default:uuidv4
    },
    name:{
       type: String
    },
    mobile:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
       type:String
    },
    active:{
        type:Boolean,
        default:true
    }

});
const registerModel = mongoose.model("register",registerSchema);
module.exports = registerModel;
