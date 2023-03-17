/*** callback fns for CRUD operations ***/

/* require bcrypt */
const bcrypt = require("bcrypt");

/* require all needed modules */
const employeeSchema = require("./../Models/employeeModel");
const clinicSchema = require("../Models/clinicModel");
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

//get all Employees
exports.getAllEmployees = async (request, response, next) => {
  try {
    let query = reqNamesToSchemaNames(request.query);
    let Employees = await filterData(employeeSchema, query, [
      {
        path: "_clinic",
        options: { strictPopulate: false },
        select: {  _specilization: 1, _address: 1 },
      },
    ]);
    Employees = sortData(Employees, query);
    Employees = paginateData(Employees, request.query);
    Employees = sliceData(Employees, request.query);

    const count = await employeeSchema.countDocuments(query);

    response.status(200).json(responseFormat(true, Employees, "Employees retrieved successfully", parseInt(request.query.page), parseInt(request.query.limit), count, Math.ceil(count / parseInt(request.query.limit))));

  } catch (error) {
    next(error);
  }
};

// Get a employee by ID
exports.getEmployeeById = async (request, response, next) => {
  try {
    const employee = await employeeSchema.findById(request.params.id).populate({
      path: "_clinic",
      options: { strictPopulate: false },
      select: { _specilization: 1, _address: 1 },
    });
    if (!employee) {
      return response.status(404).json(responseFormat(false, {}, "Employee not found", 0, 0, 0, 0));

    }
    response.status(200).json(responseFormat(true, employee, "Employee retrieved successfully", 0, 0, 0,0));

  } catch (error) {
    next(error);
  }
};


/*  Post  */

// Add a new Employee
exports.addEmployee = async (request, response, next) => {
  try {
    let testEmailandPhone = await users.findOne({
      $or: [
        { _email: request.body.email },
        { _contactNumber: request.body.phoneNumber },
      ],
    });
    if (testEmailandPhone) {
      if (testEmailandPhone._email == request.body.email) {
        return response.status(400).json(responseFormat(false, {}, "Email Already in use", 0, 0, 0, 0));
      } else {
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
      _clinic: request.body.clinicId,
      _monthlyRate: request.body.salary,
      _workingHours: request.body.workingHours,
      _medicalHistory: request.body.medicalHistory,
      _role: request.body.role,
    };
    if (request.file) {
      sentObject._image = request.file.path;
    }
    const employee = new employeeSchema(sentObject);
    let savedEmployee = await employee.save();
    const newUser = new users({
      _idInSchema: savedEmployee._id,
      _role: "employee",
      _email: request.body.email,
      _contactNumber: request.body.phoneNumber,
      _password: hash,
    });
    await newUser.save();
    response
    .status(201)
    .json(responseFormat(true, employee, "Employee added successfully", 0, 0, 0, 0));
  } catch (error) {
    next(error);
  }
};

/*  Put  */

// Edit a Employee
exports.putEmployee = async (request, response, next) => {
  try {
    console.log(request.body);
    let employeeExists = await employeeSchema.findOne({
      _id: request.params.id,
    });
    if (!employeeExists){
      return response.status(400).json(responseFormat(false, {}, `Employee not found`, 0, 0, 0, 0));
    }
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
      _clinic: request.body.clinicId,
      _monthlyRate: request.body.salary,
      _workingHours: request.body.workingHours,
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
    const updatedEmployee = await employeeSchema.updateOne(
      { _id: request.params.id },
      {
        $set: sentObject,
      }
    );

    response
    .status(200)
    .json(responseFormat(true, updatedEmployee, "Employee updated successfully", 0, 0, 0, 0));
  } catch (error) {
    next(error);
  }
};


/*  Patch  */

exports.patchEmployee = async (request, response, next) => {
  try {
    let employeeExists = await employeeSchema.findOne({
      _id: request.params.id,
    });
    if (!employeeExists){
      return response.status(400).json(responseFormat(false, {}, `Employee not found`, 0, 0, 0, 0));
    }
    let tempEmployee = {};
    if (request.body.firstname) {
      tempEmployee._fname = request.body.firstname;
    }
    if (request.body.lastname) {
      tempEmployee._lname = request.body.lastname;
    }
    if (request.body.phoneNumber) {
      tempEmployee._contactNumber = request.body.phoneNumber;
    }
    if (request.body.medicalHistory) {
      tempEmployee._medicalHistory = request.body.medicalHistory;
    }
    if (request.body.clinicId) {
      let employeeExists = await clinicSchema.find({
        _id: request.body.clinicId,
      });
      if (!employeeExists){
        return response.status(400).json(responseFormat(false, {}, `Clinic ${request.body.clinic} not found`, 0, 0, 0, 0));
        }
      tempEmployee._clinics = request.body.clinicId;
    }
    if (request.body.email) {
      let testEmail = await users.findOne({
        _email: request.body.email,
      });
      if (testEmail && testEmail._idInSchema != request.params.id) {
        return response.status(400).json(responseFormat(false, {}, `Email Already in use`, 0, 0, 0, 0));
      }
      await users.updateOne(
        { _idInSchema: request.params.id },
        { $set: { _email: request.body.email } }
      );
      tempEmployee._email = request.body.email;
    }
    if (request.body.password) {
      const hash = await bcrypt.hash(request.body.password, 10);
      tempEmployee._password = hash;
    }
    if (request.body.address) {
      if (
        request.body.address.street ||
        request.body.address.city ||
        request.body.address.country ||
        request.body.address.zipCode
      ) {
        if (request.body.address.street)
          tempEmployee["_address.street"] = request.body.address.street;
        if (request.body.address.city)
          tempEmployee["_address.city"] = request.body.address.city;
        if (request.body.address.country)
          tempEmployee["_address.country"] = request.body.address.country;
        if (request.body.address.zipCode)
          tempEmployee["_address.zipCode"] = request.body.address.zipCode;
      } else {
        return response.status(400).json(responseFormat(false, {}, "Address can't be empty", 0, 0, 0, 0));
      }
    }
    if (request.body.gender) {
      tempEmployee._gender = request.body.gender;
    }
    if (request.body.dateOfBirth) {
      tempEmployee._dateOfBirth = request.body.dateOfBirth;
      let now = new Date();
      let age = now.getFullYear() - request.body.dateOfBirth.split("/")[2];
      if (now.getMonth() < request.body.dateOfBirth.split("/")[1]) {
        age--;
      }
      tempEmployee._age = age;
    }
    if (request.body.salary) {
      tempEmployee._monthlyRate = request.body.salary;
    }
    if (request.file) {
      tempEmployee._image = request.file.path;
    }
    if (request.body.workingHours) {
      tempEmployee._workingHours = request.body.workingHours;
    }
    await employeeSchema.updateOne(
      { _id: request.params.id },
      { $set: tempEmployee }
    );
    if (request.body.email && request.body.phoneNumber) {
      await users.updateOne(
        { _idInSchema: request.params.id },
        {
          $set: {
            _email: request.body.email,
            _contactNumber: request.body.phoneNumber,
          },
        }
      );
    } else if (request.body.email) {
      await users.updateOne(
        { _idInSchema: request.params.id },
        { $set: { _email: request.body.email } }
      );
    } else if (request.body.phoneNumber) {
      await users.updateOne(
        { _idInSchema: request.params.id },
        { $set: { _contactNumber: request.body.phoneNumber } }
      );
    }
    
    response
    .status(200)
    .json(responseFormat(true, tempEmployee, "Employee updated successfully", 0, 0, 0, 0));
  } catch (error) {
    next(error);
  }
};

/* Delete */

// Remove a Employee
exports.removeEmployeeById = async (request, response, next) => {
  try {
    const employee = await employeeSchema.findByIdAndDelete(
      request.params.id || request.body.id
    );
    if (!employee) {
      return response.status(404).json(responseFormat(false, {}, "Employee not found", 0, 0, 0, 0));
    }
    response.status(200).json(responseFormat(true, employee, "Employee deleted successfully", 0, 0, 0, 0));
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
    salary: "_monthlyRate",
    workingHours: "_workingHours",
    medicalHistory: "_medicalHistory",
    clinicId: "_clinic",
    role: "_role"
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
