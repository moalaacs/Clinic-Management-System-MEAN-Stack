const express = require("express");
const controller = require("../Controller/publicInformation");
const clinicController=require("../Controller/clinicController")
const router = express.Router();

// to show available appointemnt
router.route("/clinic").get(clinicController.getAllClinics);
router.route("/schedules").get(controller.getAllWeeklySchedule);
router.route("/clinicsspecilization/:speciality").get(controller.getClinicsBySpecilization);
router.route("/clinicsinfo/:id").get(controller.getClinicInformationById);
router.route("/clinicservice/:speciality").get(controller.getServicesBySpecilization);
router.route("/availablespecilizations").get(controller.getAvailableServices);
module.exports = router;