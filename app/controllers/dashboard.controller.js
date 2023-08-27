const db = require("../models");
const User = db.user;
const Pet = db.pet;
const Examination = db.examination;
const Laboratory_test = db.laboratory_test;



exports.getStats = async (req, res) => {
  var stats = new Object;
  stats.users = await User.count();
  console.log(stats);
  stats.examinations = await Examination.count();
  console.log(stats);
  stats.pets = await Pet.count();
  stats.laboratory_tests = await Laboratory_test.count();
  console.log(stats);
  res.status(200).send({success:1,result:stats})
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.getUser = async (req, res) => {
   const user = await User.findByPk(req.params.id,{
    attributes: {
       exclude: ['password','createdAt','updatedAt']
    }
  }).then(user => {
    if(!user){
      res.status(400).send({"msg":"No such record found"});
    }else{
      res.status(200).send({success:1,result:user});
    }
    }); 
  };

  exports.updateUser = async (req, res) => {

    const user = await User.findByPk(req.params.id,{
      attributes: {
         exclude: ['password','createdAt','updatedAt']
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
    if(req.body.hasOwnProperty('username')){
      user.username = req.body.username;
    }

    if(req.body.hasOwnProperty('firstname')){
      user.firstname = req.body.firstname;
    }

    if(req.body.hasOwnProperty('firstname')){
      user.lastname = req.body.lastname;
    }
    if(req.body.hasOwnProperty('email')){
      user.email = req.body.email;
    }
     await user.update().catch(err => {
      res.status(500).send({ message: err.message });
    });;
     res.status(200).send(user);
   };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };