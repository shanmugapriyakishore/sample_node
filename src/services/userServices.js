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
    //        {
    //             $match: {
    //                 $and: [{ _id: { $eq: id } }, { name: { $eq: "divya" } }],
    //            },
    //         },
    //  ]);
           {
              $match: {
                $or: [{ _id: { $eq: id } }, { name: { $eq: "Alice" } }],
                    },
            },
         ]);
    return userDetails
}



//getuserfunction
const getUsers = async()=>{
    const userDetails = await userModel.find({});
    return userDetails
}


module.exports = {
    createUserDetails,
    getUsers,
    getSpecificUser
}