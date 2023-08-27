const db = require("../models");
const Doctor = db.doctor;  



exports.getAll = async (req, res) => {

  const doctors = await Doctor.findAll().then(doctors => {
   
   if(doctors === undefined || doctors.length == 0){
    console.log("All Doctors:", JSON.stringify(doctors, null, 2));
     res.status(400).send({success:1,"msg":"No such record found"});
   }else{
    console.log("All users:", JSON.stringify(doctors, null, 2));
     res.status(200).send({success:1,result:doctors});
   }
   }); 
 
 };