/* require bcrypt */
const bcrypt = require("bcrypt");

/* require all needed modules */
const patientSchema = require("../Models/patientModel");
const users = require("../Models/usersModel");

/* require helper functions (filter,sort,slice,paginate) */
const {
  filterData,
  sortData,
  sliceData,
  paginateData,
  responseFormat
} = require("../helper/helperfns");


/* Get */

//get all patients
exports.getAllPatients = async (request, response, next) => {
  try {
    let query = reqNamesToSchemaNames(request.query);
    let patients = await filterData(patientSchema, query);
    patients = sortData(patients, query);
    patients = paginateData(patients, request.query);
    patients = sliceData(patients, request.query);

    const count = await patientSchema.countDocuments(query);

    response.status(200).json(responseFormat(true, patients, "Patients retrieved successfully", parseInt(request.query.page), parseInt(request.query.limit), count, Math.ceil(count / parseInt(request.query.limit))));
  } catch (error) {
    next(error);
  }


};

// Get a patient by ID
exports.getPatientById = async (request, response, next) => {
  try {
    const patient = await patientSchema.findOne({
      _id: request.params.id,
    });
    if (!patient) {
      return response.status(400).json(responseFormat(false, {}, "Patient not found", 0, 0, 0, 0));
    }
    response.status(200).json(responseFormat(true, patient, "Patient retrieved successfully", 0, 0, 0,0));
  } catch (error) {
    next(error);
  }
};
/*  Post  */
// Add a new patient
exports.addPatient = async (request, response, next) => {
  try {
    console.log(request.body)
    // check for duplicate mails and phone numbers
    let testEmailandPhone = await users.findOne({
      $or: [
        { _email: request.body.email },
        { _contactNumber: request.body.phoneNumber },
      ],
    });
    if (testEmailandPhone) {
      if (testEmailandPhone._email == request.body.email) {
        return response.status(400).json(responseFormat(false, {}, "Email Already in use", 0, 0, 0, 0));
      } else if (testEmailandPhone._contactNumber == request.body.phoneNumber) {
        return response.status(400).json(responseFormat(false, {}, "Phone number Already in use", 0, 0, 0, 0));
      }
    }


    const hash = await bcrypt.hash(request.body.password, 10);
    let now = new Date();
    let age = now.getFullYear() - request.body.dateOfBirth.split("/")[2];
    if (now.getMonth() < request.body.dateOfBirth.split("/")[1]) {
      age--;
    }
    let sentObject = {
      _fname: request.body.firstname,
      _lname: request.body.lastname,
      _dateOfBirth: request.body.dateOfBirth,
      _age: age,
      _gender: request.body.gender,
      _contactNumber: request.body.phoneNumber,
      _email: request.body.email,
      _address: request.body.address,
      _password: hash,
      _medicalHistory: request.body.medicalHistory,
    };
    if (request.file) {
      sentObject._image = request.file.path;
    }
    const savedPatient = new patientSchema(sentObject);
    await savedPatient.save();
    const newUser = new users({
      _idInSchema: savedPatient._id,
      _role: "patient",
      _email: request.body.email,
      _contactNumber: request.body.phoneNumber,
      _password: hash,
    });
    await newUser.save();

      response
      .status(201)
      .json(responseFormat(true, savedPatient, "Patient added successfully", 0, 0, 0, 0));
  } catch (error) { next(error); }
};

/*  Put  */

// Put a patient
exports.putPatientById = async (request, response, next) => {
  try {
    let patientExists = await patientSchema.find({ _id: request.params.id });
    if (!patientExists)
    return response.status(400).json(responseFormat(false, {}, `Patient not found`, 0, 0, 0, 0));
    let testEmailandPhone = await users.findOne({
      $or: [
        { _email: request.body.email },
        { _contactNumber: request.body.phoneNumber },
      ],
    });
    if (testEmailandPhone && testEmailandPhone._idInSchema != request.params.id) {
      if (testEmailandPhone._email == request.body.email) {
        return   response.status(400).json(responseFormat(false, {}, `Email Already in use`, 0, 0, 0, 0));
      } else if (testEmailandPhone._contactNumber == request.body.phoneNumber) {
        return  response.status(400).json(responseFormat(false, {}, `Phone number Already in use`, 0, 0, 0, 0));
      }
    }
    const hash = await bcrypt.hash(request.body.password, 10);
    let now = new Date();
    let age = now.getFullYear() - request.body.dateOfBirth.split("/")[2];
    if (now.getMonth() < request.body.dateOfBirth.split("/")[1]) {
      age--;
    }
    let sentObject = {
      _fname: request.body.firstname,
      _lname: request.body.lastname,
      _dateOfBirth: request.body.dateOfBirth,
      _age: age,
      _gender: request.body.gender,
      _contactNumber: request.body.phoneNumber,
      _email: request.body.email,
      _address: request.body.address,
      _password: hash,
      _medicalHistory: request.body.medicalHistory,
    };
    if (request.file) {
      sentObject._image = request.file.path;
    }
    await users.updateOne(
      { _idInSchema: request.params.id },
      {
        $set: {
          _email: request.body.email,
          _contactNumber: request.body.phoneNumber,
        },
      }
    );
    const updatedPatient = await patientSchema.updateOne(
      { _id: request.params.id },
      {
        $set: sentObject,
      }
    );
      response
      .status(200)
      .json(responseFormat(true, updatedPatient, "Patient updated successfully", 0, 0, 0, 0));
  } catch (error) {
    next(error);
  }
};

/*  Patch  */

// Patch a patient
exports.patchPatientById = async (request, response, next) => {
  try {
    let foundPatient = await patientSchema.findOne({ _id: request.params.id });
    if (!foundPatient)
      return response.status(400).json(responseFormat(false, {}, "patient not found", 0, 0, 0, 0));
    let tempPatient = {};
    if (request.body.firstname) {
      tempPatient._fname = request.body.firstname;
    }
    if (request.body.lastname) {
      tempPatient._lname = request.body.lastname;
    }
    if (request.body.medicalHistory) {
      tempPatient._medicalHistory = request.body.medicalHistory;
    }
    if (request.body.password) {
      const hash = await bcrypt.hash(request.body.password, 10);
      tempPatient._password = hash;
    }
    if (request.file) {
      tempPatient._image = request.file.path;
    }
    if (request.body.address) {
      if (
        request.body.address.street ||
        request.body.address.city ||
        request.body.address.country ||
        request.body.address.zipCode
      ) {
        if (request.body.address.street)
          tempPatient["_address.street"] = request.body.address.street;
        if (request.body.address.city)
          tempPatient["_address.city"] = request.body.address.city;
        if (request.body.address.country)
          tempPatient["_address.country"] = request.body.address.country;
        if (request.body.address.zipCode)
          tempPatient["_address.zipCode"] = request.body.address.zipCode;
      } else {
        return response.status(400).json(responseFormat(false, {}, "Address can't be empty", 0, 0, 0, 0));
      }
    }
    if (request.body.gender) {
      tempPatient._gender = request.body.gender;
    }
    if (request.body.dateOfBirth) {
      tempPatient._dateOfBirth = request.body.dateOfBirth;
      let now = new Date();
      let age = now.getFullYear() - request.body.dateOfBirth.split("/")[2];
      if (now.getMonth() < request.body.dateOfBirth.split("/")[1]) {
        age--;
      }
      tempPatient._age = age;
    }
    if (request.body.phoneNumber) {
      tempPatient._contactNumber = request.body.phoneNumber;
    }
    if (request.body.email) {
      tempPatient._email = request.body.email;
    }

    //_____UPDATES_____//
    //check duplicate email/phone & update usermodel => last
    if (request.body.phoneNumber && request.body.email) {
      let testEmailandPhone = await users.findOne({
        $or: [
          { _email: request.body.email },
          { _contactNumber: request.body.phoneNumber },
        ],
        $ne: { _idInSchema: request.params.id },
      });
      if (testEmailandPhone && testEmailandPhone._idInSchema != request.params.id) {
        if (testEmailandPhone._email == request.body.email) {
          return  response.status(400).json(responseFormat(false, {}, "Email Already in use", 0, 0, 0, 0));
        } else if (testEmailandPhone._contactNumber == request.body.phoneNumber) {
          return response.status(400).json(responseFormat(false, {}, "Phone number Already in use", 0, 0, 0, 0));
        }
      } else {
        await users.updateOne(
          { _idInSchema: request.params.id },
          {
            $set: {
              _email: request.body.email,
              _contactNumber: request.body.phoneNumber,
            },
          }
        );
      }
    } else if (request.body.phoneNumber) {
      let testPhone = await users.findOne({
        _contactNumber: request.body.phoneNumber,
      });
      if (testPhone && testPhone._idInSchema != request.params.id) {
        return  response.status(400).json(responseFormat(false, {}, "Phone number Already in use", 0, 0, 0, 0));
      } else {
        await users.updateOne(
          { _idInSchema: request.params.id },
          { $set: { _contactNumber: request.body.phoneNumber } }
        );
      }
    } else if (request.body.email) {
      let testEmail = await users.findOne({
        _email: request.body.email,
        _id: { $ne: request.params.id }
      });
      if (testEmail && testEmail._idInSchema != request.params.id) {
        return response.status(400).json(responseFormat(false, {}, "Email Already in use", 0, 0, 0, 0));
        
      } else {
        await users.updateOne(
          { _idInSchema: request.params.id },
          { $set: { _email: request.body.email } }
        );
      }
    }

    await patientSchema.updateOne(
      { _id: request.params.id },
      { $set: tempPatient }
    );
      response
      .status(200)
      .json(responseFormat(true, tempPatient, "Patient updated successfully", 0, 0, 0, 0));
  } catch (error) {
    next(error);
  }
};

/* Delete */

// Remove a patient
exports.removePatientById = async (request, response, next) => {
  try {
    const patient = await patientSchema.findByIdAndDelete(
      request.params.id || request.body.id
    );
    if (!patient) {
      return response.status(400).json(responseFormat(false, {}, "Patient not found", 0, 0, 0, 0));
    }
    response.status(200).json(responseFormat(true, patient, "Patient deleted successfully", 0, 0, 0, 0));


  } catch (error) {
    next(error);
  }
};


const reqNamesToSchemaNames = (query) => {
  const fieldsToReplace = {
    id: "_id",
    firstname: "_fname",
    lastname: "_lname",
    dateOfBirth: "_dateOfBirth",
    age: "_age",
    gender: "_gender",
    phoneNumber: "_contactNumber",
    email: "_email",
    address: "_address",
    profileImage: "_image",
    medicalHistory: "_medicalHistory",
  };

  const replacedQuery = {};
  for (const key in query) {
    let newKey = key;
    for (const replaceKey in fieldsToReplace) {
      if (key.includes(replaceKey)) {
        newKey = key.replace(replaceKey, fieldsToReplace[replaceKey]);
        break;
      }
    }
    replacedQuery[newKey] = query[key];
  }
  return replacedQuery;
};
