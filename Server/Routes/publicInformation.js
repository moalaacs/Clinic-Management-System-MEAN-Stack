const express = require("express");
const controller = require("../Controller/publicInformation");

const router = express.Router();

// to show available appointemnt
router.route("/schedules").get(controller.getAllWeeklySchedule);
router.route("/clinicsinfo/:speciality").get(controller.getClinicsBySpecilization);
router.route("/clinicsinfo/:id").get(controller.getClinicInformationById);
router.route("/clinicservice/:speciality").get(controller.getServicesBySpecilization);
module.exports = router;