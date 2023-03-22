const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const personSchema = require("./personModel");


/*** crete schema for employees collection ***/
const employeeSchema = new mongoose.Schema(
  Object.assign({}, personSchema.obj, {
    _id: { type: Number },
    _clinic: { type: Number, ref: "clinic" },
    _monthlyRate: { type: Number },
    _workingHours: { type: Number, min: 0, max: 24 },
    _role: { type: String, required: true, enum: ['receptionist', 'nurse',"employee"] },
  })
);


employeeSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.firstname = ret._fname;
    ret.lastname = ret._lname;
    ret.dateOfBirth = ret._dateOfBirth;
    ret.age = ret._age;
    ret.gender = ret._gender;
    ret.phoneNumber = ret._contactNumber;
    ret.email = ret._email;
    ret.password = ret._password;
    ret.address = ret._address;
    ret.image  = ret._image;
    ret.id = ret._id;
    ret.medicalHistory = ret._medicalHistory;
    ret.clinicId = ret._clinic;
    ret.salary = ret._monthlyRate;
    ret.workingHours = ret._workingHours;
    ret.role = ret._role;

    delete ret._fname;
    delete ret._lname;
    delete ret._dateOfBirth;
    delete ret._age;
    delete ret._gender;
    delete ret._contactNumber;
    delete ret._email;
    delete ret._password;
    delete ret._image;
    delete ret._medicalHistory
    delete ret._address;
    delete ret._id;
    delete ret._clinic;
    delete ret._monthlyRate;
    delete ret._workingHours;
    delete ret._role;

    delete ret.__v;
  }
});



/*** auto increment for _id field ***/
employeeSchema.plugin(AutoIncrement, {
  id: "employee_seq",
  inc_field: "_id",
  start_seq: 1000,
});

/*** mapping schema bind collection  ***/
module.exports = mongoose.model("employee", employeeSchema);
