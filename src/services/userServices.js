// const registerModel = require("../models/registerModels");
const registerModel = require("../models/registerModels");
const userModel = require("../models/registerModels")
const wishlist = require ("../models/wishlistModel")

const createUserDetails = async(body)=>{
    const createData = await userModel.create(body)
    return createData;
}

//getspecific user
const getSpecificUser = async(id)=>{
    // const userDetails = await userModel.findById({_id:id})
    // return userDetails
    const userDetails = await userModel.aggregate([
    //     {
    //         $match: {
    //           _id: id,
    //        },
    //     },
    // ]);
    
           {
                $match: {
                    $and: [{ _id: { $eq: id } }, { active: { $eq: true } }],
               },
            },
     ]);
        //    {
        //       $match: {
        //         $or: [{ _id: { $eq: id } }, { name: { $eq: "Alice" } }],
        //             },
        //     },
        //  ]);
    return userDetails
}



//getuserfunction
const getUsers = async()=>{
    const userDetails = await userModel.find({});
    return userDetails
}

//deleteUser
const deleteUser = async (id) => {
    const deleteUserDetails = await registerModel.findById({ _id: id });
    if (!deleteUserDetails) {
      console.log("user not found");
    } else {
      const deletedata = await registerModel.findByIdAndDelete({ _id: id });
      console.log(deletedata);
    }
    return deleteUserDetails;
  };
    
// //get active users- using filter Method
// const getActiveUsers = async()=>{
//     const userDetails = await userModel.find({});
//         return userDetails;
// }
//get Active users-aggregation method
const getActiveUsers = async () => {
    const activeUsers = await userModel.aggregate([
        {
            $match: { active: true }
        }
    ]);
    return activeUsers;
}
//login authentication
const  loginUserService = async (name, password) => {
    const user = await userModel.findOne({ name, password });
    return  user ;
};
//fetch data
const getUserById = async (id) => {
    const user = await userModel.findById({_id:id});
    return user;
};

//aggregation db
const getwishlistProducts = async()=>{
    const result = await wishlist.aggregate([
        {
          $lookup: {
            from: 'registers', // collection name in MongoDB
            localField: 'userID',
            foreignField: '_id',
            as: 'user_info'
          }
        },
        {
          $unwind: '$user_info'
        },
        {
          $lookup: {
            from: 'products', // collection name in MongoDB
            localField: 'productId',
            foreignField: '_id',
            as: 'product_info'
          }
        },
        {
          $unwind: '$product_info'
        },
        {
          $project: {
            _id: 0,
            userID: '$user_info._id',
            userName: '$user_info.name',
            productID: '$product_info._id',
            productName: '$product_info.productName'
          }
        }
      ]);
    return result
}
//updatedata
const userUpdateData = async (id, body) =>{
      const user = await registerModel.findById({_id:id});
      if (!user) {
          console.log("User not found");
      }

      const updatedData = await registerModel.findByIdAndUpdate(
          id,
          body,
          { new: true }
      );

      return updatedData;
  
};
module.exports = {
    createUserDetails,
    getUsers,
    getSpecificUser,
    deleteUser,
    getActiveUsers,
    loginUserService,
    getUserById,
    getwishlistProducts,
    userUpdateData
    

}