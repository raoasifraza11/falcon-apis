const db = require("../models");
const User = db.user;

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
      res.status(400).send({success:0,result:"No such record found"});
    }else{
      res.status(200).send({success:1,result:user});
    }
    }); 
  };


  exports.updateUserProfileImage = async (req, res) => {

    if (!req.files)
    res.status(400).send({success:0,result:"No file were upload."});
  
    const user = await User.findByPk(req.params.id,{
      attributes: {
         exclude: ['password','createdAt','updatedAt']
      }
    })
    .catch(err => {
      res.status(500).send({success:0,result:err.message});
    });



    const file = req.files.image;
    let filename = "file" + Date.now() + ".jpg";
    let uploadPath = __dirname + "/../upload/" + filename;

    file.mv(uploadPath, (err) => {
      if (err) {
        res.status(400).send({success:0,result:err.message});
      }else{
         user.image = filename;
         user.update().catch(err => {
          res.status(500).send({success:0,result:err.message});
        });
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
    });


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
    });
     res.status(200).send(user);
   };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };