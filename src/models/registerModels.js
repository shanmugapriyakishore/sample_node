const mongoose = require("mongoose");
const{v4:uuidv4} = require("uuid")
const bcrypt = require("bcrypt")
const registerSchema = new mongoose.Schema({
    _id:{
      type:String,
      default:uuidv4
    },
    name:{
       type: String,
       required: true
    },
    mobile:{
        type:Number,
        required: true,
  
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
       type:String
    },
    active:{
        type:Boolean,
        default:true
    },
    isVerified: {
      type: Boolean,
      default: false
  },
    verificationToken: {
      type: String
  }

})
  registerSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,10)
  });
const registerModel = mongoose.model("register",registerSchema);
module.exports = registerModel;
