/**** Import modules *****/
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");


/**** Import Routes *****/
const registerRouter = require("./Routes/registerRouter");
const authenticate = require("./Routes/authRouter");
const authorizationMW = require("./Middlewares/authorizationMW");
const doctorRouter = require("./Routes/doctorRouter");
const patientRouter = require("./Routes/patientRouter");
const employeeRouter = require("./Routes/employeeRouter");
const medicineRouter = require("./Routes/medicineRouter");
const clinicRouter = require("./Routes/clinicRouter");
const appointmentRouter = require("./Routes/appointmentRouter");
const prescriptionRouter = require("./Routes/prescriptionRouter");
const invoiceRouter = require("./Routes/invoiceRouter");
const paymentRouter = require("./Routes/paymentRouter");
const showAppointmentRouter = require("./Routes/showAppointmentRouter");
const publicInformation = require("./Routes/publicInformation")
const {
  checkAppointmentsDaily,
} = require("./Middlewares/dailyAppointmentCheck");

require("dotenv").config();

/**** Open Server ****/
const app = express();

/**** choose port ****/
const port = process.env.PORT || 8080;

/**** Connect to DB ****/
mongoose.set("strictQuery", true);
async function connectToServer() {
  let connected;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connected = true;
  } catch (error) {
    console.log(`Error connecting to cloud database , ${error.message}`);
    console.log("Trying to connect to local database...");
    try {
      await mongoose.connect(process.env.MONGODB_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      connected = true;
    } catch (error2) {
      console.log(
        `Error connecting to cloud/local database , ${error2.message}`
      );
      connected = false;
    }
  }

  if (connected) {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("I am listening...", port);
      checkAppointmentsDaily();
    });
  }
}
connectToServer();
app.use(cors());
app.use("/images", express.static("images"));

/**** Middlewares ****/

// a- logger middleware
app.use(morgan("dev"));

// app.use((request,response,next)=>{
//   response.header("Access-Control-Allow-Origin","*");
//   response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
//   response.header("Access-Control-Allow-Headers","Content-Type,Authorization")
//   next();
// })

// b- body parser middleware
app.use(express.json());



// c- Routes (End points)  middleware
/* Show Available Schedule */
app.use(showAppointmentRouter);
/* Register patient */
app.use(registerRouter);
/* Public Information */
app.use(publicInformation);
/* Authenticate user */
app.use(authenticate);
/* Authorization user */
app.use(authorizationMW);

/*Routes*/
app.use(doctorRouter);
app.use(patientRouter);
app.use(employeeRouter);
app.use(clinicRouter);
app.use(medicineRouter);
app.use(appointmentRouter);
app.use(prescriptionRouter);
app.use(invoiceRouter);
app.use(paymentRouter);

// d- file not found middleware
app.use((request, response) => {
  response.status(404).json({ data: "Page Not Found 404" });
});

// e- Error handling middleware
app.use((error, request, response, next) => {
  let errorStatus = error.status || 500;
  response.status(errorStatus).json(error.message);
});
