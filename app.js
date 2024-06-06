// const http = require("http");m
// const os = require("os")
// var fs = require('fs');
// //os module

// console.log(os.hostname())
// console.log(os.type())
// console.log("Platform: " + os.platform());
// console.log("Architecture: " + os.arch());
// console.log("returns array"+ os.cpus());
// console.log("Free memory: " + os.freemem());

// // folder1 creation
// fs.mkdir("demo",(err)=>{
//     if(err){
//         console.log("error",err)
//     }
//     else{
//         console.log("created sucessfully")
//     }
// });
// // // folder 2
// // fs.mkdir("newdemo1",(err)=>{
// //   if(err){
// //       console.log("error",err)
// //   }
// //   else{
// //       console.log("created sucessfully")
// //   }
// // });
// //remove
// fs.rmdir("newdemo1",(err)=>{
//   if(err){
//       console.log("error",err)
//   }
//   else{
//       console.log("created sucessfully")
//   }
// });
// // file creation
// fs.mkdir("folder1",(err)=>{
//   if(err){
//       console.log("error",err)
//   }
//   else{
//       console.log("created sucessfully")
//   }
// });


// //method 1
// // fs.appendFile("folder2Content.txt","hello world",(err)=>{
// // if(err){
// //   console.log("error",err)
// // }
// // })


// // method 2
// fs.open("file2Content.txt","w",(err)=>{
// if(err){
//   console.log("error while creating",err)
// }else{
//   console.log("file created successfully")
// }
// })
// //method 3 
// fs.writeFile("file3Content.txt",'Hello world!',(err,data)=>{
//   if(err){
//     console.log("error occured",err)
//   }else{
//     console.log(data.toString(),"file read")
//   }
// })
// //rename file
// fs.rename('file2Content.txt', 'mynewfile.txt', function (err) {
//   if (err) throw err;
//   console.log('File Renamed!');
// });

// //delete file
// fs.unlink("file2.txt",(err)=>{
//  if (err){
//   console.log("file2 cannot be deleted",err)
//  }
// })
// fs.unlink("folder1Content.txt",(err)=>{
//   if (err){
//    console.log("folder1Content cannot be deleted",err)
//   }
//  })
 
 
// //write file method
// fs.writeFile('file4.txt','my new world',(err)=>{
//   if(err){
//     console.log("error writing to file",err)
//   }
// })





  

//  http.createServer((req,res)=> {
//     res.write("server is working correctly") 
//     res.end()
//  }).listen(3001 )

const express = require("express")
const app = express()
const userRouter = require("./src/router/userRouter")
const productRoute = require("./src/router/productRouter")
const wishlistRoute = require("./src/router/wishlistRouter")
const bodyParser = require("body-parser")
const cors = require('cors');

app.use(cors())

app.use(bodyParser.json())
app.use("/user",userRouter)
app.use("/product",productRoute)
app.use("/wishlist",wishlistRoute)

const db = require('./src/database/db')
db.on("open",()=>{
app.listen(3000,()=>{
  console.log("server is running on port 3000")
})
db.on("error",()=>{
 console.log("error while connecting to database")
})
})