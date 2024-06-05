const registerModel = require("../models/registerModels");
const userModel = require("../models/registerModels")

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
    
// //get active users
// const getActiveUsers = async()=>{
//     const userDetails = await userModel.find({});
//         return userDetails;
// }
//get Active users
const getActiveUsers = async () => {
    const activeUsers = await userModel.aggregate([
        {
            $match: { active: true }
        }
    ]);
    return activeUsers;
}


module.exports = {
    createUserDetails,
    getUsers,
    getSpecificUser,
    deleteUser,
    getActiveUsers
}