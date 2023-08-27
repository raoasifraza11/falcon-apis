const db = require("../models");
const Moment = require("moment");
const Examination = db.examination;
const Examination_procedure = db.examination_procedure;
const Examination_medicine = db.examination_medicine;
const Laboratory_test = db.laboratory_test;
const Laboratory_test_image = db.laboratory_test_image;
const Medicice = db.medicice;

exports.get = async (req, res) => {
  const examination = await Examination.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  }).then((examination) => {
    if (!examination) {
      res.status(400).send({ success: 1, msg: "No such record found" });
    } else {
      res.status(200).send({ success: 1, result: examination });
    }
  });
};

exports.getWhere = async (req, res) => {
  const examination = await Examination.findAll({
    include: [Examination_procedure],
    where: {
      petAdmissionId: req.params.petAdmissionId,
    },
    exclude: ["createdAt", "updatedAt"],
  }).then((examination) => {
    if (!examination) {
      res.status(400).send({ success: 1, msg: "No such record found" });
    } else {
      res.status(200).send({ success: 1, result: examination });
    }
  });
};

exports.getAll = async (req, res) => {
  const examinations = await Examination.findAll({
    include: Examination_procedure,
  }).then((examinations) => {
    if (examinations === undefined || examinations.length == 0) {
      console.log("All users:", JSON.stringify(examinations, null, 2));
      res.status(400).send({ success: 1, msg: "No such record found" });
    } else {
      console.log("All users:", JSON.stringify(examinations, null, 2));
      res.status(200).send({ success: 1, result: examinations });
    }
  });
};

exports.add = async (req, res) => {
  const new_examination = Examination.build();
  console.log(req.body.date);

  if (req.body.hasOwnProperty("petAdmissionId")) {
    new_examination.petAdmissionId = req.body.petAdmissionId;
  } else {
    res.status(400).send({ success: 0, message: "Admission Id is required" });
    return;
  }

  await Examination.update({ status: 0 }, {
    where: {
      petAdmissionId: req.body.petAdmissionId
    }
  });

  if (req.body.hasOwnProperty("petId")) {
    new_examination.petId = req.body.petId;
  }

  if (req.body.hasOwnProperty("diagnosis")) {
    new_examination.diagnosis = req.body.diagnosis;
  }

  if (req.body.hasOwnProperty("allergy_to_isoflorane_or_other_antesthetics")) {
    new_examination.allergy_to_isoflorane_or_other_antesthetics =
      req.body.allergy_to_isoflorane_or_other_antesthetics;
  }

  if (req.body.hasOwnProperty("others")) {
    new_examination.others = req.body.others;
  }

  if (req.body.hasOwnProperty("history_a")) {
    new_examination.history_a = req.body.history_a;
  }

  if (req.body.hasOwnProperty("history_b")) {
    new_examination.history_b = req.body.history_b;
  }

  if (req.body.hasOwnProperty("history_c")) {
    new_examination.history_c = req.body.history_c;
  }

  if (req.body.hasOwnProperty("history_d")) {
    new_examination.history_d = req.body.history_d;
  }


  new_examination.status = 1;

  console.log(new_examination);

  await new_examination.save().catch((err) => {
    res.status(500).send({ success: 0, message: err.message });
    return;
  });
  console.log("examination was saved to the database!");

  if (new_examination) {
    const [new_examination_procedure, created] =
      await Examination_procedure.findOrCreate({
        where: { examinationId: new_examination.id },
      });

    if (new_examination_procedure) {
      if (req.body.hasOwnProperty("full_checkup")) {
        new_examination_procedure.full_checkup = req.body.full_checkup;
      }

      if (req.body.hasOwnProperty("crop_checkup")) {
        new_examination_procedure.crop_checkup = req.body.crop_checkup;
      }

      if (req.body.hasOwnProperty("blood_and_crop")) {
        new_examination_procedure.blood_and_crop = req.body.blood_and_crop;
      }

      if (req.body.hasOwnProperty("feather_repairing")) {
        new_examination_procedure.feather_repairing =
          req.body.feather_repairing;
      }

      if (req.body.hasOwnProperty("coping")) {
        new_examination_procedure.coping = req.body.coping;
      }

      if (req.body.hasOwnProperty("marshal_clip")) {
        new_examination_procedure.marshal_clip = req.body.marshal_clip;
      }

      if (req.body.hasOwnProperty("others")) {
        new_examination_procedure.others = req.body.others;
      }
      await new_examination_procedure.save().catch((err) => {
        res.status(500).send({ success: 0, message: err.message });
        return;
      });
    }
  }

  const examination = await Examination.findByPk(
    new_examination.id,
    { include: Examination_procedure },
    {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    }
  );
  res.status(200).send({
    success: 1,
    result: examination,
  });
};

exports.update = async (req, res) => {
  const new_examination = await Examination.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  }).catch((err) => {
    res.status(500).send({ message: err.message });
    return;
  });

  // const new_examination = examination.build();
  console.log(req.body.date);

  if (req.body.hasOwnProperty("petAdmissionId")) {
    new_examination.petAdmissionId = req.body.petAdmissionId;
  }

  if (req.body.hasOwnProperty("diagnosis")) {
    new_examination.diagnosis = req.body.diagnosis;
  }

  if (req.body.hasOwnProperty("allergy_to_isoflorane_or_other_antesthetics")) {
    new_examination.allergy_to_isoflorane_or_other_antesthetics =
      req.body.allergy_to_isoflorane_or_other_antesthetics;
  }

  if (req.body.hasOwnProperty("others")) {
    new_examination.others = req.body.others;
  }

  if (req.body.hasOwnProperty("history_a")) {
    new_examination.history_a = req.body.history_a;
  }

  if (req.body.hasOwnProperty("history_c")) {
    new_examination.history_c = req.body.history_c;
  }

  if (req.body.hasOwnProperty("history_d")) {
    new_examination.history_d = req.body.history_d;
  }

  console.log(new_examination);

  await new_examination.update().catch((err) => {
    res.status(500).send({ success: 0, message: err.message });
  });
  console.log("examination was saved to the database!");

  if (new_examination) {
    const [new_examination_procedure, created] =
      await Examination_procedure.findOrCreate({
        where: { examinationId: new_examination.id },
      });

    if (new_examination_procedure) {
      if (req.body.hasOwnProperty("full_checkup")) {
        new_examination_procedure.full_checkup = req.body.full_checkup;
      }

      if (req.body.hasOwnProperty("crop_checkup")) {
        new_examination_procedure.crop_checkup = req.body.crop_checkup;
      }

      if (req.body.hasOwnProperty("blood_and_crop")) {
        new_examination_procedure.blood_and_crop = req.body.blood_and_crop;
      }

      if (req.body.hasOwnProperty("feather_repairing")) {
        new_examination_procedure.feather_repairing =
          req.body.feather_repairing;
      }

      if (req.body.hasOwnProperty("coping")) {
        new_examination_procedure.coping = req.body.coping;
      }

      if (req.body.hasOwnProperty("marshal_clip")) {
        new_examination_procedure.marshal_clip = req.body.marshal_clip;
      }

      if (req.body.hasOwnProperty("others")) {
        new_examination_procedure.others = req.body.others;
      }
      await new_examination_procedure.save().catch((err) => {
        res.status(500).send({ success: 0, message: err.message });
      });
    }
  }

  const examination = await Examination.findByPk(
    req.params.id,
    { include: Examination_procedure },
    {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    }
  );

  res.status(200).send({
    success: 1,
    result: examination,
  });
};

//  Examination medicine functions
exports.addExaminationMedicine = async (req, res) => {
  const examination_medicine = Examination_medicine.build();
  // console.log(req.body.date)

  if (req.body.hasOwnProperty("examinationId")) {
    examination_medicine.examinationId = req.body.examinationId;
  } else {
    res.status(400).send({ success: 0, message: "Examination Id is required" });
    return;
  }

  if (req.body.hasOwnProperty("medicineId")) {
    examination_medicine.medicineId = req.body.medicineId;
  } else {
    res.status(400).send({ success: 0, message: "Please select medicine" });
    return;
  }

  if (req.body.hasOwnProperty("medicine_type")) {
    examination_medicine.medicine_type = req.body.medicine_type;
  }

  if (req.body.hasOwnProperty("dose")) {
    examination_medicine.dose = req.body.dose;
  }

  if (req.body.hasOwnProperty("times_daily")) {
    examination_medicine.times_daily = req.body.times_daily;
  }

  if (req.body.hasOwnProperty("before_food")) {
    examination_medicine.before_food = req.body.before_food;
  }

  if (req.body.hasOwnProperty("after_food")) {
    examination_medicine.after_food = req.body.after_food;
  }

  if (req.body.hasOwnProperty("duration")) {
    examination_medicine.duration = req.body.duration;
  }

  console.log(examination_medicine);

  await examination_medicine.save().catch((err) => {
    res.status(500).send({ success: 0, message: err.message });
  });
  console.log("examination medicine was saved to the database!");

  res.status(200).send({
    success: 1,
    result: examination_medicine,
  });
};

exports.getExaminationMedicine = async (req, res) => {
  const examination_medicine = await Examination_medicine.findAll({
    include: [
      {
        model: Medicice,
      },
    ],
    where: {
      examinationId: req.params.examinationId,
    },
    exclude: ["createdAt", "updatedAt"],
  }).then((examination_medicine) => {
    if (!examination_medicine) {
      res.status(400).send({ success: 1, msg: "No such record found" });
    } else {
      res.status(200).send({ success: 1, result: examination_medicine });
    }
  });
};

//  Examination Lab test functions
exports.addExaminationLabTest = async (req, res) => {
  const laboratory_test = Laboratory_test.build();

  // console.log(req.body.date)

  if (req.body.hasOwnProperty("examinationId")) {
    laboratory_test.examinationId = req.body.examinationId;
  }



  
  await Laboratory_test.update({ status: 0 }, {
    where: {
      examinationId: req.body.examinationId
    }
  });
  if (req.body.hasOwnProperty("facalysis")) {
    laboratory_test.facalysis = req.body.facalysis;
  }

  if (req.body.hasOwnProperty("culture")) {
    laboratory_test.culture = req.body.culture;
  }

  if (req.body.hasOwnProperty("sensitivity_test")) {
    laboratory_test.sensitivity_test = req.body.sensitivity_test;
  }

  if (req.body.hasOwnProperty("differential")) {
    laboratory_test.differential = req.body.differential;
  }

  if (req.body.hasOwnProperty("biochemistry")) {
    laboratory_test.biochemistry = req.body.biochemistry;
  }

  if (req.body.hasOwnProperty("endoscopy")) {
    laboratory_test.endoscopy = req.body.endoscopy;
  }

  if (req.body.hasOwnProperty("crop_endoscopy")) {
    laboratory_test.crop_endoscopy = req.body.crop_endoscopy;
  }

  if (req.body.hasOwnProperty("radiology")) {
    laboratory_test.radiology = req.body.radiology;
  }

   laboratory_test.status = 1;

  console.log(laboratory_test);

  await laboratory_test.save().catch((err) => {
    res.status(500).send({ success: 0, message: err.message });
  });
  console.log("examination lab test was saved to the database!");

  res.status(200).send({
    success: 1,
    result: laboratory_test,
  });
};

exports.getExaminationLabTests = async (req, res) => {
  const examination_lab_tests = await Laboratory_test.findAll({
    where: {
      examinationId: req.params.examinationId,
    },
    exclude: ["createdAt", "updatedAt"],
  }).then((examination_lab_tests) => {
    if (!examination_lab_tests) {
      res.status(400).send({ success: 1, msg: "No such record found" });
    } else {
      res.status(200).send({ success: 1, result: examination_lab_tests });
    }
  });
};


exports.addExaminationLabTestImages = async(req, res) => {

  if (!req.files)
  res.status(400).send({success:0,result:"No file were upload."}); 

    var uploadedFiles = []

    // images is a field name
   uploadedData = req.files.images
   if(uploadedData.length > 1){
      for (let i = 0; i < uploadedData.length; i++) {
       let filename = "file" + Date.now() + ".jpg";
       let uploadPath = __dirname + "/../upload/" + filename;
       await uploadedData[i].mv(uploadPath, (err) => {
    if (err) {
      res.status(400).send({success:0,result:err.message});
    }else{
      // uploadedFiles.push(fileName)
      const new_laboratory_test_image =  Laboratory_test_image.build();
      new_laboratory_test_image.name = req.body.name;
      new_laboratory_test_image.filename = "http://localhost:8080/upload/"+filename;
      new_laboratory_test_image.laboratoryTestId = req.params.laboratoryTestId;
      //  user.image = filename;
        new_laboratory_test_image.save().catch(err => {
        res.status(500).send({success:0,result:err.message});
      });
      console.log(new_laboratory_test_image);

     
      // res.status(200).send({success:1,result:new_laboratory_test_image});

    }
  });

      }
    }else{
  // const file = req.files.image;
  let filename = "file" + Date.now() + ".jpg";
  let uploadPath = __dirname + "/../upload/" + filename;

  await uploadedData.mv(uploadPath, (err) => {
    if (err) {
      res.status(400).send({success:0,result:err.message});
    }else{
      const new_laboratory_test_image =  Laboratory_test_image.build();
      new_laboratory_test_image.name = req.body.name ;
      new_laboratory_test_image.filename = "http://localhost:8080/upload/"+filename;
      new_laboratory_test_image.laboratoryTestId = req.params.laboratoryTestId;
      //  user.image = filename;
       new_laboratory_test_image.save().catch(err => {
        res.status(500).send({success:0,result:err.message});
      });
      // console.log(new_laboratory_test_image);
        // res.status(200).send({success:1,result:new_laboratory_test_image});
    }
  });
    }

    // const new_laboratory_p = await Laboratory_test_image.findByPk(req.params.laboratoryTestId);
  
    const new_laboratory_p = await Laboratory_test_image.findAll({
      where: {
        laboratoryTestId: req.params.laboratoryTestId
      }
    });
    console.log(new_laboratory_p);
    console.log(req.params.laboratoryTestId);
    
    res.status(200).send({success:1,result:new_laboratory_p});
   return;
 
};
