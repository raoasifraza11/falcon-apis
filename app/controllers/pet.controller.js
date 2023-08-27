const db = require("../models");
const Pet = db.pet;
const Pet_admission = db.pet_admission;
const Doctor  = db.doctor


exports.addPet = (req, res) => {
    
  const new_pet = Pet.build();

   if(req.body.hasOwnProperty('breed')){
    new_pet.breed = req.body.breed;
   }

   if(req.body.hasOwnProperty('sex')){
    new_pet.sex = req.body.sex;
   }

   if(req.body.hasOwnProperty('age')){
    new_pet.age = req.body.age;
   } 

   if(req.body.hasOwnProperty('ring_no_left')){
    new_pet.ring_no_left = req.body.ring_no_left;
   }

   if(req.body.hasOwnProperty('ring_no_right')){
    new_pet.ring_no_right = req.body.ring_no_right;
   }

   if(req.body.hasOwnProperty('pit_no')){
    new_pet.pit_no = req.body.pit_no;
   }

   
   console.log(new_pet);
   
   new_pet.save().
   then(new_pet => {
    res.status(200).send({
      success:1,
      result: new_pet
    });

   }).
   catch(err => {
     res.status(500).send({
      success: 0,
      message: err.message
     });
   });
    console.log('pet was saved to the database!');
 
    


 };


  exports.getPet = async (req, res) => {
   const pet = await Pet.findByPk(req.params.id,{
    attributes: {
       exclude: ['createdAt','updatedAt']
    }
  }).then(pet => {
    if(!pet){
      res.status(400).send({success:1,"msg":"No such record found"});
    }else{
      res.status(200).send({success:1,result:pet});
    }
    }); 
  
  };
  exports.getAllPitnos = async (req, res) => {


    const pets = await Pet.findAll({
      attributes: ['pit_no']
    });
    
    res.status(200).send({success:1,result:pets});
  
   
   };


  exports.getAllPet = async (req, res) => {


    const pets = await Pet.findAll({
      include: [{
        model: Pet_admission,
        include: [{
          model: Doctor,
        }]
      }]
    });
    
    res.status(200).send({success:1,result:pets});
    // const pets = await Pet.findAll({include: [{Pet_admission,include:[{Doctor}]}]}).then(pets => {
     
    //  if(pets === undefined || pets.length == 0){
    //   console.log("All users:", JSON.stringify(pets, null, 2));
    //    res.status(400).send({success:1,"msg":"No such record found"});
    //  }else{
    //   console.log("All users:", JSON.stringify(pets, null, 2));
    //    res.status(200).send({success:1,result:pets});
    //  }
    //  }); 
   
   };

exports.updatePet = async (req, res) => {

    const pet = await Pet.findByPk(req.params.id,{
      attributes: {
         exclude: ['createdAt','updatedAt']
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

    if(req.body.hasOwnProperty('breed')){
      pet.breed = req.body.breed;
    }

    if(req.body.hasOwnProperty('sex')){
      pet.sex = req.body.sex;
    }

    if(req.body.hasOwnProperty('ring_no_right')){
      pet.ring_no_right = req.body.ring_no_right;
    }
    if(req.body.hasOwnProperty('ring_no_left')){
      pet.ring_no_left = req.body.ring_no_left;
    }
    if(req.body.hasOwnProperty('pit_no')){
      pet.pit_no = req.body.pit_no;
    }

    if(req.body.hasOwnProperty('age')){
      pet.age = req.body.age;
    }

    if(req.body.hasOwnProperty('feathers')){
      pet.feathers = req.body.feathers;
    }

    if(req.body.hasOwnProperty('primary_patient_evaluation')){
      pet.primary_patient_evaluation = req.body.primary_patient_evaluation;
     } 
     if(req.body.hasOwnProperty('weight')){
      pet.weight = req.body.weight;
     } 
  
     if(req.body.hasOwnProperty('physical_appearance')){
      pet.physical_appearance = req.body.physical_appearance;
     } 
  
     if(req.body.hasOwnProperty('dehydration_status')){
      pet.dehydration_status = req.body.dehydration_status;
     } 
  
     if(req.body.hasOwnProperty('any_wound_or_laceration_on_the_body')){
      pet.any_wound_or_laceration_on_the_body = req.body.any_wound_or_laceration_on_the_body;
     }
     
     if(req.body.hasOwnProperty('appetite_status_and_eating_behavior')){
      pet.appetite_status_and_eating_behavior = req.body.appetite_status_and_eating_behavior;
     }
  



     await pet.update().catch(err => {
      res.status(500).send({ success:1,message: err.message });
    });;
     res.status(200).send({success:1,result:pet});
   };
  