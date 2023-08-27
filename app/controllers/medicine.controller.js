const db = require("../models");
const Medicice = db.medicice;  



exports.getAll = async (req, res) => {

  const medicices = await Medicice.findAll().then(medicices => {
   
   if(medicices === undefined || medicices.length == 0){
    console.log("All medicices:", JSON.stringify(medicices, null, 2));
     res.status(400).send({success:1,"msg":"No such record found"});
   }else{
    console.log("All medicices:", JSON.stringify(medicices, null, 2));
     res.status(200).send({success:1,result:medicices});
   }
   }); 
 
 };