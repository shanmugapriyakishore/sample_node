const orderServices = require("../services/orderServices")


//create orderdata
const createDetails =  async(req,res)=>{
    const orderdataData = await orderServices.createOrderDetails(req.body);
    console.log(req.body)
    res.send(orderdataData)
}

module.exports =
 {
    createDetails
 }