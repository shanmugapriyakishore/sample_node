const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://shanmugap1999:PGzyGBBUtiIYsx2W@cluster0.qr3we9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("mongo db is connected")
})
.catch((err)=>{
    console.log("mongo db is not connected,err")
})
module.exports = mongoose.connection;