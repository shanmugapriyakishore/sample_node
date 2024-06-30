const userService = require("../services/userServices")
 const registerModel  = require("../models/registerModels")
const wishlistService = require("../services/wishlistServices")
const orderService = require("../services/orderServices")
const crypto = require('crypto');
const jwt = require("jsonwebtoken")
const token = require("../models/tokenModel")
// createUserfunction
const createUserDetails =  async(req,res)=>{
    const userData = await userService.createUserDetails(req.body);
    console.log(req.body)
    res.send(userData)
}

//getUserAll function
const getUserAll = async(req,res,next)=>{
    const User = await userService.getUsers();
    res.json({
        count:User.length,
        User

    })
   
}
//getuserDetails by token
const getUserDetails = async (req, res) => {
    const token = req.headers['token'];
  
    try {
      const user = await userService.getUserByToken(token);
      res.status(200).send(user);
    } catch (error) {
      if (error.message === 'Token is required') {
        return res.status(400).send(error.message);
      } else if (error.message === 'User not found') {
        return res.status(404).send(error.message);
      } else {
        return res.status(500).send('Internal Server Error');
      }
    }
  };

//getspecificUserfunction
const getSpecificUser = async (req, res) => {
    const getUserDetails = await userService.getSpecificUser(req.params.id);
    res.send(getUserDetails);
  };
//login authentication
  const loginuser = async (req, res) => {
    const { name,password } = req.body;
   console.log(name,password);
    try {
        const user = await registerModel.findOne({ name,password });
        console.log(user)
        if (!user) {
            res.status(401).send({ message: 'Authorization failed' });
            //craete jwt token
        } else {
            const payload = {
                userDetails : user
            }
            const sign_key = crypto.randomBytes(32).toString("hex");
            console.log(sign_key,"sign_key")
            const token = jwt.sign(payload,sign_key,{expiresIn:"24h"})
            const savedTokenDetails = await userService.storeUserToken(user._id, token);
            res.status(200).send({
                token:savedTokenDetails,
                message:"user login succesfully"
            })
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
}
//login authentication
const loginUserController = async (req, res, next) => {
    const { name, password } = req.body;
    const user = await userService.loginUserService(name, password);
    if (user) {
        const wishlistData = await wishlistService.getWishlistByUserId(user._id);
        const orderList = await orderService.getOrdersByUserId(user._id);

        res.status(200).send
        ({ message: 'Authorization successful', 
            wishlist: wishlistData,
             orders: orderList,
             user });
    } else {
        res.status(401).send({ message: 'Authorization failed' });
    }
};
//login authentication
// const loginUserController = async (req, res, next) => {
//     const { name, password } = req.body;
//     const user = await userService.loginUserService(name, password);
//     console.log(user)
//     if (user){
//         res.status(200).send({ message: 'Authorization successful', user });
//     } else {
//         res.status(401).send({ message: 'Authorization failed' });
//     }
    
// }


//delete user
const deleteUser = async (req,res)=>{
    const deleteDetails  =  await userService.deleteUser(req.params.id)
    res.send(deleteDetails)
}

// //get Active user
// const getActiveusers = async(req,res)=>{
//       const users = await userService.getUsers()
//       const activeUser = users.filter(users => users.active)
//       res.send(activeUser)
// }
//get Active user - aggregation method
const getActiveusers = async(req,res)=>{
    const User = await userService.getActiveUsers();
    res.send(User)
}
/////fetch data
const getUser = async (req, res) => {
    console.log(req.params.id);
    try {
        const user = await userService.getUserById(req.params.id);
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).send({ message: 'Error fetching user details' });
    }
};

//db aggregation method

const getwishlistproducts = async(req,res)=>{
    const wishlistproduct = await userService.getwishlistProducts();
    res.send(wishlistproduct)
}

//wishlist aggregation
const wishlistData = async(req,res)=>{
    const wishlistProduct = await userService.getuserProduct(req.params.id);
    res.send(wishlistProduct)
}

//order aggregation
const orderData = async(req,res)=>{
    const orderProduct = await userService.getOrderproduct(req.params.id);
    res.send(orderProduct)
}


//update method

const userUpdatedata = async (req,res)=>{
    const Updatedata = await userService.userUpdateData(req.params.id,req.body);
    res.send(Updatedata)
}
// email verification
const registerUser = async (req, res) => {
     
      // Create a new user
      const user = await userService.createUser(req.body);
  
      // Send verification email
      await userService.sendVerificationEmail(user, req.body.subject, req);

        // Respond with success message
        res.status(200).json({ message: 'User registered. Please check your email to verify your account.' });
    }





  
module.exports ={
    createUserDetails,
    getUserAll,
    getSpecificUser,
    loginuser,
    deleteUser,
    getActiveusers,
    loginUserController,
    getUser,
    getwishlistproducts,
    userUpdatedata,
    wishlistData,
    orderData,
    registerUser,
    getUserDetails
    
    
   
}