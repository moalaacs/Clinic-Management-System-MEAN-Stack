const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const personSchema = require("./personModel");


  

/*** crete schema for patients collection ***/
const patientSchema = new mongoose.Schema(
  Object.assign({}, personSchema.obj, {
    _id: { type: Number },
  })
);
  



patientSchema.set('toJSON', {
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

    delete ret.__v;
  }
});

/*** auto increment for _id field ***/
patientSchema.plugin(AutoIncrement, {
  id: "patient_seq",
  inc_field: "_id",
  start_seq: 10000,
});

/*** mapping schema bind collection  ***/
module.exports = mongoose.model("patient", patientSchema);
