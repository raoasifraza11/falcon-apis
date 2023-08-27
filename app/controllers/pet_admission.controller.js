const db = require("../models");
const Moment = require( 'moment' );
const pet_admission = db.pet_admission;
const pet = db.pet;
const examination = db.examination;
const laboratory_test = db.laboratory_test;
const examination_medicine = db.examination_medicine



exports.getWhere = async (req, res) => {

  if(!req.params.petId){
    res.status(400).send({success:0, message: "Pet Id is required" });
    return;
  }
 const pet_admission_data = await pet_admission.findAll({
    where: {
      petId: req.params.petId,
      is_deleted : 0,
    },
    include: [{
      model: pet,
    }],
    order: [
      ['id', 'DESC']
    ],
    exclude: ['createdAt','updatedAt']
  }).then(pet_admission_data => {
    if(!pet_admission_data){
      res.status(400).send({success:1,"msg":"No such record found"});
    }else{
      res.status(200).send({success:1,result:pet_admission_data});
    }
    });
 };
// get admissions of specific pet
   exports.add = async(req, res) => {
    // var new_pet;


    
    const new_pet_admission = pet_admission.build();

    if(req.body.hasOwnProperty('pit_no') && req.body.pit_no != ""){

     const pit_no =  req.body.pit_no;
     const [new_pet, created]= await pet.findOrCreate({
      where: { pit_no: pit_no },
    })



    if (new_pet) {
      new_pet_admission.petId = new_pet.id;
      console.log(new_pet); // This will certainly be 'Technical Lead JavaScript'
    }


    await pet_admission.update({ status: "CLOSED" }, {
      where: {
        petId: new_pet.id
      }
    });

    if(req.body.hasOwnProperty('breed')){
      new_pet.breed = req.body.breed;
    }
  
    if(req.body.hasOwnProperty('sex')){
      new_pet.sex = req.body.sex;
    }
  
    if(req.body.hasOwnProperty('ring_no_left')){
      new_pet.ring_no_left = req.body.ring_no_left;
    }
  
    if(req.body.hasOwnProperty('ring_no_right')){
      new_pet.ring_no_right = req.body.ring_no_right;
    }
   
    await new_pet.save().catch(err => {
      res.status(500).send({success:0, message: err.message });
    });
 
  }
  else{
    console.log("working fine hear");
    res.status(400).send({success:0, message: "Pit No is Required" });
    return;
  }
  // console.log(new_pet.id);
   
  
   
   console.log(req.body.date)

   if(req.body.hasOwnProperty('status')){
    new_pet_admission.status = req.body.status;
  }

   if(req.body.hasOwnProperty('date')){
    new_pet_admission.date =  Moment().format(req.body.date,'YYYY-MM-DD  HH:mm:ss.000' );
  }
    if(req.body.hasOwnProperty('trainer_name')){
      new_pet_admission.trainer_name = req.body.trainer_name;
    }

    if(req.body.hasOwnProperty('mobile')){
      new_pet_admission.mobile = req.body.mobile;
    }

    if(req.body.hasOwnProperty('previos_trainer_name')){
      new_pet_admission.previos_trainer_name = req.body.previos_trainer_name;
    }

    if(req.body.hasOwnProperty('presented_by_worker')){
      new_pet_admission.presented_by_worker = req.body.presented_by_worker;
    } 

    
    
    if(req.body.hasOwnProperty('clinicId')  && req.body.clinicId != ""){
      new_pet_admission.clinicId = req.body.clinicId;
    }else{
      res.status(400).send({success:0, message: "Please select clinic" });
      return;
    }

     
    if(req.body.hasOwnProperty('doctorId')  && req.body.doctorId != ""){
      new_pet_admission.doctorId = req.body.doctorId;
    }else{
      res.status(400).send({success:0, message: "Please select doctor" });
      return;
    }

    if(req.body.hasOwnProperty('age')){
      new_pet_admission.age = req.body.age;
     } 
    
   if(req.body.hasOwnProperty('primary_patient_evaluation')){
    new_pet_admission.primary_patient_evaluation = req.body.primary_patient_evaluation;
   } 
   if(req.body.hasOwnProperty('weight')){
    new_pet_admission.weight = req.body.weight;
   } 

   if(req.body.hasOwnProperty('physical_appearance')){
    new_pet_admission.physical_appearance = req.body.physical_appearance;
   } 

   if(req.body.hasOwnProperty('dehydration_status')){
    new_pet_admission.dehydration_status = req.body.dehydration_status;
   } 

   if(req.body.hasOwnProperty('any_wound_or_laceration_on_the_body')){
    new_pet_admission.any_wound_or_laceration_on_the_body = req.body.any_wound_or_laceration_on_the_body;
   }
   
   if(req.body.hasOwnProperty('appetite_status_and_eating_behavior')){
    new_pet_admission.appetite_status_and_eating_behavior = req.body.appetite_status_and_eating_behavior;
   }

    if(req.body.hasOwnProperty('feathers')){
      new_pet_admission.feathers = req.body.feathers;
    } 
    
    
    await new_pet_admission.save().catch(err => {
      res.status(500).send({success:0, message: err.message });
    });
    console.log(new_pet_admission);
     console.log('admission was saved to the database!');
  
     const pet_admission_c = await pet_admission.findByPk(new_pet_admission.id,{
      include:[pet],
      attributes: {
         exclude: ['createdAt','updatedAt']
      }
    });


     res.status(200).send({
      success : 1,
      result: pet_admission_c
    });

   
  };
  

  exports.update = async(req, res) => {
    // var new_pet;
    // const new_pet_admission = pet_admission.build();

    if(!req.params.petAdmissionId){
      res.status(400).send({success:0, message: "Admission Id is required" });
      return;
    }
    console.log(req.params.petAdmissionId);
    const new_pet_admission = await pet_admission.findByPk(req.params.petAdmissionId,{
      attributes: {
         exclude: ['createdAt','updatedAt']
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });


    // console.log(new_pet_admission);
    // if(req.body.hasOwnProperty('pit_no')){
     const pit_no =  req.body.pit_no;
     const new_pet= await pet.findByPk(new_pet_admission.petId);

     
    // if (new_pet) {
    //   new_pet_admission.petId = new_pet.id;
    //   console.log(new_pet); // This will certainly be 'Technical Lead JavaScript'
    // }
 
   
    if(req.body.hasOwnProperty('pit_no')){
      console.log("inside pit_no");
      console.log(req.body.pit_no);
      new_pet.pit_no = req.body.pit_no;
      console.log(new_pet.pit_no );
    }

    if(req.body.hasOwnProperty('breed')){
      new_pet.breed = req.body.breed;
    }
  
    if(req.body.hasOwnProperty('sex')){
      new_pet.sex = req.body.sex;
    }
  
    if(req.body.hasOwnProperty('ring_no_left')){
      new_pet.ring_no_left = req.body.ring_no_left;
    }
  
    if(req.body.hasOwnProperty('ring_no_right')){
      new_pet.ring_no_right = req.body.ring_no_right;
    }
    console.log("pet values");
    console.log(new_pet);
    await new_pet.save({fields: ['pit_no','ring_no_right','ring_no_left','sex','breed']}).catch(err => {
      res.status(500).send({success:0, message: err.message });
    });

    console.log('new_pet was updated to the database!');

  
  // console.log(new_pet.id);
    
   
  //  console.log(req.body.date)

   if(req.body.hasOwnProperty('status')){
    new_pet_admission.status = req.body.status;
  }
   if(req.body.hasOwnProperty('date')){
    new_pet_admission.date =  Moment().format(req.body.date,'YYYY-MM-DD  HH:mm:ss.000' );;
  }
    if(req.body.hasOwnProperty('trainer_name')){
      new_pet_admission.trainer_name = req.body.trainer_name;
    }

    if(req.body.hasOwnProperty('mobile')){
      new_pet_admission.mobile = req.body.mobile;
    }

    if(req.body.hasOwnProperty('previos_trainer_name')){
      new_pet_admission.previos_trainer_name = req.body.previos_trainer_name;
    }

    if(req.body.hasOwnProperty('presented_by_worker')){
      new_pet_admission.presented_by_worker = req.body.presented_by_worker;
    } 

   
    
    if(req.body.hasOwnProperty('clinicId')){
      new_pet_admission.clinicId = req.body.clinicId;
    } 

     
    if(req.body.hasOwnProperty('doctorId')){
      new_pet_admission.doctorId = req.body.doctorId;
    } 

    if(req.body.hasOwnProperty('age')){
      new_pet_admission.age = req.body.age;
     } 
    
   if(req.body.hasOwnProperty('primary_patient_evaluation')){
    new_pet_admission.primary_patient_evaluation = req.body.primary_patient_evaluation;
   } 
   if(req.body.hasOwnProperty('weight')){
    new_pet_admission.weight = req.body.weight;
   } 

   if(req.body.hasOwnProperty('physical_appearance')){
    new_pet_admission.physical_appearance = req.body.physical_appearance;
   } 

   if(req.body.hasOwnProperty('dehydration_status')){
    new_pet_admission.dehydration_status = req.body.dehydration_status;
   } 

   if(req.body.hasOwnProperty('any_wound_or_laceration_on_the_body')){
    new_pet_admission.any_wound_or_laceration_on_the_body = req.body.any_wound_or_laceration_on_the_body;
   }
   
   if(req.body.hasOwnProperty('appetite_status_and_eating_behavior')){
    new_pet_admission.appetite_status_and_eating_behavior = req.body.appetite_status_and_eating_behavior;
   }

    if(req.body.hasOwnProperty('feathers')){
      new_pet_admission.feathers = req.body.feathers;
    } 
    
    
    await new_pet_admission.save({fields: ['feathers','appetite_status_and_eating_behavior','any_wound_or_laceration_on_the_body','dehydration_status','weight','primary_patient_evaluation','age','doctorId','clinicId','presented_by_worker','previos_trainer_name','mobile','trainer_name','date','status']}).catch(err => {
      res.status(500).send({success:0, message: err.message });
    });
    // console.log(new_pet_admission);
    console.log('admission was updated to the database!');
  

     const pet_admission_c = await pet_admission.findByPk(new_pet_admission.id,{
      include:[pet],
      attributes: {
         exclude: ['createdAt','updatedAt']
      }
    });

     res.status(200).send({
      success : 1,
      result: pet_admission_c
    });

   
  };


  exports.delete = async(req, res) => {
    
    if(!req.params.petAdmissionId){
      res.status(400).send({success:0, message: "Admission Id is required" });
      return;
    }
    await pet_admission.update({ is_deleted: 1 }, {
      where: {
        id: req.params.petAdmissionId
      }
    });
    res.status(200).send({success:1, message: "Admission deleted successfully" });
    return;
  }
 
  
  exports.report = async(req, res) => {
    
    if(!req.params.petAdmissionId){
      res.status(400).send({success:0, message: "Admission Id is required" });
      return;
    }

    const pet_admission_report = await pet_admission.findByPk(req.params.petAdmissionId,{
        include: [{
          model: db.pet},{
          model: db.doctor},
          {
            model: db.clinic}
          ,{
          model: examination,
          where: { status: 1 },
          required: false ,
          include: [{
            model: laboratory_test,
            where: { status: 1 },
            required: false,
            include: [{
              model: db.laboratory_test_image,
              required: false,
            }],
          },
          {
            model: examination_medicine,
            required: false 
          }],
        }]
      ,
      attributes: {
         exclude: ['createdAt','updatedAt']
      },
    });
  
    res.status(200).send({success:1, result: pet_admission_report });
  }