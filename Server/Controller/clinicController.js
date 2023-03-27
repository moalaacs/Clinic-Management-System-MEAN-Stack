/* require all needed modules */
const clinicSchema = require("../Models/clinicModel");
const bcrypt = require("bcrypt");
const {
  filterData,
  sortData,
  sliceData,
  paginateData,
  fillClinicServices,
  responseFormat
} = require("../helper/helperfns");

// Calling other schemas //
const users = require("../Models/usersModel");
const employeeSchema = require("../Models/employeeModel");
const doctorSchema = require("../Models/doctorModel");

// Create a new clinic
exports.addClinic = async (request, response, next) => {
  try {
    let testEmailandPhone = await users.findOne({
      $or: [
        { _email: request.body.email },
        { _contactNumber: request.body.phone },
      ],
    });
    if (testEmailandPhone) {
      if (testEmailandPhone._email == request.body.email) {
        return response.status(400).json(responseFormat(false, {}, "Email Already in use", 0, 0, 0, 0));
      } else if (testEmailandPhone._contactNumber == request.body.phone) {
        return response
          .status(400)
          .json(responseFormat(false, {}, "Phone number Already in use", 0, 0, 0, 0));
      }
    }

    const clinic = new clinicSchema({
      _contactNumber: request.body.phone,
      _email: request.body.email,
      _address: request.body.address,
      _specilization: request.body.speciality,
      _services: fillClinicServices(request.body.speciality),
    });
    const hash = await bcrypt.hash("admin123456", 10);
    let savedClinic = await clinic.save();
    let clinicProfile = new users({
      _email: request.body.email,
      _password: hash,
      _role: "admin",
      _idInSchema: savedClinic._id,
      _contactNumber: request.body.phone,
      _forClinic: savedClinic._id,
    });
    await clinicProfile.save();
    response
      .status(201)
      .json(responseFormat(true, clinic, "Clinic added successfully",0,0,0,0));
  } catch (error) {
    next(error);
  }
};
// Edit a clinic
exports.patchClinicById = async (request, response, next) => {
  try {
    let tempClinic = {};
    let tempUser = {};
    if (request.body.phone) {
      let testPhone = await users.findOne({
        _contactNumber: request.body.phone,
      });
      if (testPhone) {
        return response.status(400).json(responseFormat(false, {}, "Phone Number Already in use", 0, 0, 0, 0));
      }
      tempClinic._contactNumber = request.body.phone;
      tempUser._contactNumber = request.body.phone;
    }
    if (request.body.email) {
      let testEmail = await users.findOne({ _email: request.body.email });
      if (testEmail) {
        return response.status(400).json(responseFormat(false, {}, "Email Already in use", 0, 0, 0, 0));
      }
      tempClinic._email = request.body.email;
      tempUser._email = request.body.email;
    }
    if (request.body.address) {
      if (
        request.body.address.street ||
        request.body.address.city ||
        request.body.address.country ||
        request.body.address.zipCode
      ) {
        if (request.body.address.street)
          tempClinic["_address.street"] = request.body.address.street;
        if (request.body.address.city)
          tempClinic["_address.city"] = request.body.address.city;
        if (request.body.address.country)
          tempClinic["_address.country"] = request.body.address.country;
        if (request.body.address.zipCode)
          tempClinic["_address.zipCode"] = request.body.address.zipCode;
      } else {
        return response.status(200).json(responseFormat(false, {}, "Address can't be empty", 0, 0, 0, 0));
      }
    }
    await clinicSchema.updateOne(
      { _id: request.params.id },
      {
        $set: tempClinic,
      }
    );
    await users.updateOne(
      { _idInSchema: request.params.id },
      {
        $set: tempUser,
      }
    );
    response
      .status(200)
      .json(responseFormat(true, tempClinic, "Clinic updated successfully",0,0,0,0));
  } catch (error) {
    next(error);
  }
};
// Remove a clinic
exports.removeClinicById = async (request, response, next) => {
  try {
    const clinic = await clinicSchema.findByIdAndDelete(request.params.id);
    if (!clinic) {
      return next(new Error("Clinic not found"));
    }
    let existingEmailsForEmployees = await employeeSchema.find(
      { _clinic: request.params.id },
      { _email: 1, _id: 0 }
    );
    let arrayOfExistingEmailsForEmployees = existingEmailsForEmployees.map(
      (element) => element._email
    );
    let existingEmailsForDoctors = await doctorSchema.find(
      { _clinic: request.params.id },
      { _email: 1, _id: 0 }
    );
    let arrayOfExistingEmailsForDoctors = existingEmailsForDoctors.map(
      (element) => element._email
    );
    await employeeSchema.deleteMany({ _clinic: request.params.id });
    await doctorSchema.updateMany(
      { _clinics: request.params.id },
      {
        $pull: {
          _clinics: request.params.id,
        },
      }
    );
    await users.deleteMany({
      _email: { $in: arrayOfExistingEmailsForEmployees },
    });
    await users.updateMany(
      { _email: { $in: arrayOfExistingEmailsForDoctors } },
      { $set: { _role: "formerDoctor" } }
    );
    response
      .status(201)
      .json(responseFormat(true, clinic, "Clinic removed successfully",0,0,0,0));
  } catch (error) {
    next(error);
  }
};
// Get all clinics
exports.getAllClinics = async (request, response, next) => {
  try {
    let query = reqNamesToSchemaNames(request.query);
    let clinics = await filterData(clinicSchema, query);
    clinics = sortData(clinics, query);
    clinics = paginateData(clinics, request.query);
    clinics = sliceData(clinics, request.query);
    const count = await clinicSchema.countDocuments(query);
    response.status(200).json(responseFormat(true, clinics, "Clinics retrieved successfully", parseInt(request.query.page) || 1, parseInt(request.query.limit) || 10, count, Math.ceil(count / parseInt(request.query.limit)) || Math.ceil(count / 10)));

  } catch (error) {
    next(error);
  }
};
// Get a clinic by ID
exports.getClinicById = async (request, response, next) => {
  try {
    const clinic = await clinicSchema.findById(request.params.id);
    if (!clinic) {
      return next(responseFormat(false, {}, "Clinic not found", 0, 0, 0, 0));
    }
    response.status(200).json(responseFormat(true, clinic, "Clinic retrieved successfully",0,0,0,0));
  } catch (error) {
    next(error);
  }
};
const reqNamesToSchemaNames = (query) => {
  const fieldsToReplace = {
    id: "_id",
    phone: "_contactNumber",
    email: "_email",
    address: "_address",
    speciality: "_specilization",
    
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
