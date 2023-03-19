const express = require("express");
const controller = require("../Controller/clinicController");

const router = express.Router();


// to show available appointemnt


router
    .route("/home")
    .get(controller.getAllClinics);

module.exports = router;






