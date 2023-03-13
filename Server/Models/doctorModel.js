const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const personSchema = require("./personModel");

/*** crete schema for doctors collection ***/

const scheduleSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
    },
    start: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
        },
        message: "Invalid start date format, should be DD/MM/YYYY",
      },
    },
    end: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
        },
        message: "Invalid end date format, should be DD/MM/YYYY",
      },
    },
  },
  { _id: false }
);

const invoicesSchema = new mongoose.Schema(
  {
    invoice_id: { type: String },
    total: { type: Number },
    totalDue: { type: Number },
    status: { type: String },
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  Object.assign({}, personSchema.obj, {
    _id: { type: Number },
    _specilization: {
      type: String,
      required: true,
      enum: [
        "Pediatrician",
        "Gynecologist",
        "Cardiologist",
        "Dermatologist",
        "Psychiatrist",
        "Neurologist",
        "Radiologist",
        "Dentist",
        "Surgeon",
      ],
    },
    _schedule: [scheduleSchema],
    _clinic: {
      type: Number,
      required: true,
      ref: "clinic",
    },
    _appointments: [
      {
        type: Number,
        required: true,
        ref: "appointment",
      },
    ],
    _excuses: [
      [
        {
          type: String,
          validate: {
            validator: function (value) {
              return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
                value
              );
            },
            message: "Invalid date format, should be DD/MM/YYYY",
          },
        },
      ],
    ],
    _medicalHistory: { type: String },
    invoices: [invoicesSchema],
  })
);
/*** auto increment for _id field ***/
doctorSchema.plugin(AutoIncrement, {
  id: "doctor_seq",
  inc_field: "_id",
  start_seq: 100,
});

/*** mapping schema bind collection  ***/
module.exports = mongoose.model("doctor", doctorSchema);
