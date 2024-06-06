const userService = require("../services/userServices")
const registerModel  = require("../models/registerModels")
// createUserfunction
const createUserDetails =  async(req,res)=>{
    const userData = await userService.createUserDetails(req.body);
    console.log(req.body)
    res.send(userData)
}

//getUserAll function
const getUserAll = async(req,res)=>{
    const User = await userService.getUsers();
    res.send(User)
}

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
        if (user) {
            res.status(200).send({ message: 'Authorization successful', user });
        } else {
            res.status(401).send({ message: 'Authorization failed' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
}
//login authentication
const loginUserController = async (req, res, next) => {
    const { name, password } = req.body;
    const result = await userService.loginUserService(name, password);
    if (result) {
        res.status(200).send({ message: 'Authorization successful', result });
    } else {
        res.status(401).send({ message: 'Authorization failed' });
    }
};
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
  
module.exports ={
    createUserDetails,
    getUserAll,
    getSpecificUser,
    loginuser,
    deleteUser,
    getActiveusers,
    loginUserController
   
}