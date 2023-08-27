const db = require("../models");
const Clinic = db.clinic;  

exports.getAll = async (req, res) => {

  const clinics = await Clinic.findAll().then(clinics => {
   
   if(clinics === undefined || clinics.length == 0){
    console.log("All Clinics:", JSON.stringify(clinics, null, 2));
     res.status(400).send({success:1,"msg":"No such record found"});
   }else{
    console.log("All Clinics:", JSON.stringify(clinics, null, 2));
     res.status(200).send({success:1,result:clinics});
   }
   }); 
 
 };