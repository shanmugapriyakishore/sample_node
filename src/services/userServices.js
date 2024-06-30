// const registerModel = require("../models/registerModels");
const registerModel = require("../models/registerModels");
const userModel = require("../models/registerModels");
const wishlistModel = require("../models/wishlistModel");
const otpModel = require("../models/otpModel");
const tokenModel = require("../models/tokenModel")

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { generateOTP } = require("../utilis/utilis");


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
//save token in token collection
const storeUserToken = async (userId, token) => {
  try {
    const savedToken = await tokenModel.create({
      userId: userId,
      token: token
    });
    return savedToken;
  } catch (error) {
    console.error('Error storing user token:', error);
    throw new Error('Error storing user token');
  }
};


//getuserfunction
const getUsers = async()=>{
    const userDetails = await userModel.find({});
    return userDetails
}

//getuserby token
const getUserByToken = async (token) => {
  if (!token) {
    throw new Error('Token is required');
  }

  const user = await tokenModel.findOne({ token: token });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};


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
    console.log(user)
    const userID = user._id
    console.log(userID)
    
      const getuserDetails = await registerModel.aggregate([
      
        { $match: { _id: userID } },
      //   {
      //     $lookup: {
      //         from: 'orders',
      //         localField: '_id',
      //         foreignField: 'userID',
      //         as: 'ordersdata'
      //     }
      // },
      // { $unwind:  '$ordersdata'},
      // {
      //     $lookup: {
      //         from: 'products',
      //         localField: 'ordersdata.productId',
      //         foreignField: '_id',
      //         as: 'orderProductdata'
      //     }
      // },
      // { $unwind:  '$orderProductdata'},
      // {
      //     $group: {
      //         _id: '$_id',
      //         name: { $first: '$name' },
      //         email: { $first: '$email' },
      //         orders: {
      //             $push: {
      //                 productID: '$orderProductdata._id',
      //                 productName: '$orderProductdata.productName',
      //                 productImage: '$orderProductdata.img',
      //                 productPrice: '$orderProductdata.price'
      //             }
      //         }
      //     }
      // },
      // {
      //     $lookup: {
      //         from: 'wishlists',
      //         localField: '_id',
      //         foreignField: 'userID',
      //         as: 'wishlistdata'
      //     }
      // },
      // { $unwind: '$wishlistdata',  },
      // {
      //     $lookup: {
      //         from: 'products',
      //         localField: 'wishlistdata.productId',
      //         foreignField: '_id',
      //         as: 'wishlistProductdata'
      //     }
      // },
      // { $unwind:  '$wishlistProductdata' },
      // {
      //     $group: {
      //         _id: '$_id',
      //         name: { $first: '$name' },
      //         email: { $first: '$email' },
      //         orders: { $first: '$orders' },
      //         wishlists: {
      //             $push: {
      //                 productID: '$wishlistProductdata._id',
      //                 productName: '$wishlistProductdata.productName',
      //                 productImage: '$wishlistProductdata.img',
      //                 productPrice: '$wishlistProductdata.price'
      //             }
      //         }
      //     }
      // },
      // {
      //     $project: {
      //         _id: 0,
      //         user: {
      //             name: '$name',
      //             email: '$email'
      //         },
      //         orders: 1,
      //         wishlists: 1
      //     }
      // }
          {
             $lookup: {
                from: 'wishlists',
                localField: '_id',
                foreignField: 'userID',
                as: 'wishlistdata'
             }
         },
         {
          $lookup: {
             from: 'products',
             localField: 'wishlistdata.productId',
             foreignField: '_id',
             as: 'wishlistProductdata'
          }
      },
      {
        $lookup: {
           from: 'orders',
           localField: '_id',
           foreignField: 'userID',
           as: "ordersdata"
        }
    },
    {
      $lookup: {
         from: 'products',
         localField: 'ordersdata.productId',
         foreignField: '_id',
         as: "ordersproductdata"
      }
  },
  // $addFields:{


  // }
  {
      $addFields :{
        wishlistTotalCount:{$size :"$wishlistProductdata"},
        wishlistTotalCost:{$sum :"$wishlistProductdata.price"},
        orderTotalCount:{$size :"$ordersproductdata"},
        orderTotalCost:{$sum :"$ordersproductdata.price"},
      },
    },
    {
      $project :{

        name:1,
        email :1,
        wishlistdata:1,
        wishlistProductdata:1,
        wishlistTotalCount:1,
        wishlistTotalCost:1,
        ordersdata:1,
        ordersproductdata:1,
        orderTotalCount:1,
        orderTotalCost:1,
      },


      }

        ])
      return getuserDetails
    }
       
//fetch data
const getUserById = async (id) => {
    const user = await userModel.findById({_id:id});
    return user;
};

//aggregation db
const getwishlistProducts = async()=>{
    const result = await wishlistModel.aggregate([
     
        {
          $lookup: {
            from: 'wishlists', // collection name in MongoDB
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
// wishlist aggregation
const getuserProduct = async(id)=>{
  const userProduct = await registerModel.aggregate([
    {
      $match: {
        _id: id
      }
    },
    {
      $lookup: {
        from: 'wishlists',
        localField: '_id',
        foreignField: 'userID',
        as: 'wishlistdata'
      }
    },
    {
      $unwind: "$wishlistdata"
    },
    {
      $lookup: {
        from: 'products',
        localField: 'wishlistdata.productId',
        foreignField: '_id',
        as: 'productdata'
      }
    },
    {
      $unwind: "$productdata"
    },
    {
      $group: {
        _id: {
          name: "$name",
          email: "$email"
        },

        productData: {
          $push: {
            productName: "$productdata.productName",
            price: "$productdata.price",
            qty: "$productdata.qty"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        email: "$_id.email",
        productData: 1,
       
      }
    }
    
  ]);

  return userProduct;
};
//orderaggregation
const getOrderproduct = async(id)=>{
  const orderProduct = await registerModel.aggregate([
    {
      $match: {
        _id: id
      }
    },
    {
      $lookup: {
        from: 'orders',
        localField: '_id',
        foreignField: 'userID',
        as: 'ordersdata'
      }
    },
    {
      $unwind: "$ordersdata"
    },
    {
      $lookup: {
        from: 'products',
        localField: 'ordersdata.productId',
        foreignField: '_id',
        as: 'productdata'
      }
    },
    {
      $unwind: "$productdata"
    },
    {
      $group: {
        _id: {
          name: "$name",
          email: "$email",
          mobile: "$mobile"
        },

        orders: {
          $push: {
            // orderId: "$ordersdata._id",
            productId: "$ordersdata.productId",
            productName: "$productdata.productName",
            productImage:"$productdata.img",
            deliveryStatus: "$ordersdata.DeliveryStatus"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        email: "$_id.email",
        mobile: "$_id.mobile",
        orders: 1
       
      }
    }
    
  ]);

  return orderProduct;
};

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
//email verification
const createUser = async (userData) => {
  const { name, email, password, mobile } = userData;

  try {
    // Check if user with email already exists
    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
      throw new Error('User already registered.');
    }

    // Generate verification token and create new user
    const verificationToken = generateOTP();
    
    const newUser = new registerModel({
      name,
      email,
      password,
      mobile,
      verificationToken
    });

    // Save the new user to database
    await newUser.save();

    console.log('User saved successfully:', newUser);
    return newUser; // Return the saved user object
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Failed to save user.');
  }
};
const sendVerificationEmail = async (user, subject, req) => {
  try {
    // Generate OTP for email verification
    const otp = generateOTP();

    const otpEntry = new otpModel({
      userId: user._id,
      email: user.email,
      otp
    });
    await otpEntry.save();


    // Construct verification URL
    //const verificationUrl = `http://${req.headers.host}/user/verify/${user.verificationToken}`;

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'suriyadog20@gmail.com',//your gmail address
        pass: 'xekz akbm rbhw inso' // Replace with your app password
      }
    });

    // Email options
    const mailOptions = {
      to: user.email,
      from: 'suriyadog20@gmail.com',
      subject: subject || 'Account Verification',
      text: `Your OTP is: ${otp}`
    //\n\nPlease verify your account by clicking the following link: \n\n ${verificationUrl}`
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error; // Propagate error for handling at a higher level
  }
};
//

module.exports = {
    createUserDetails,
    getUsers,
    getSpecificUser,
    deleteUser,
    getActiveUsers,
    loginUserService,
    getUserById,
    getwishlistProducts,
    userUpdateData,
    getuserProduct,
    getOrderproduct,
    createUser,
    sendVerificationEmail,
    getUserByToken,
    storeUserToken
    

    

    

}
