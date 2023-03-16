const clinicSchema = require("../Models/clinicModel");

const {
    filterData,
    sortData,
    sliceData,
    paginateData,
} = require("../helper/helperfns");

exports.getAllWeeklySchedule = async (request, response, next) => {
    try {
        let query = reqNamesToSchemaNames(request.query);
        let clinic = await filterData(clinicSchema.find({}, { _id: 0, _weeklySchedule: 1 }), query);
        clinic = sortData(clinic, query);
        clinic = paginateData(clinic, request.query);
        clinic = sliceData(clinic, request.query);
        response.status(200).json(clinic);
    } catch (error) {
        next(error);
    }
};
exports.getClinicsBySpecilization = async (request, response, next) => {
    try {
        let speciality=request.params.speciality;
        speciality=speciality.replace(speciality[0],speciality[0].toUpperCase());
      const clinics= await clinicSchema.find({_specilization:speciality}, { _id: 0,_address:1,_contactNumber:1,_weeklySchedule:1 });
        response.status(200).json(clinics);
    } catch (error) {
        next(error);
    }
};
exports.getClinicInformationById = async (request, response, next) => {
    try {
      const clinic= await clinicSchema.findOne({_id:request.params.id}, { _id: 0,_services:0,_email:0 });
        response.status(200).json(clinic);
    } catch (error) {
        next(error);
    }
};
exports.getServicesBySpecilization = async (request, response, next) => {
    try {
        let speciality=request.params.speciality;
        speciality=speciality.replace(speciality[0],speciality[0].toUpperCase());
        const clinicServices= await clinicSchema.findOne({_specilization:speciality}, { _id: 0,_services:1 });
        if(!clinicServices)response.status(201).json("No Such Specilization");
        response.status(200).json(clinicServices._services);
    } catch (error) {
        next(error);
    }
};

exports.getAvailableServices = async (request, response, next) => {
    try {
      let availableServices= await clinicSchema.find({}, { _id: 0,_specilization:1 });
      if(!availableServices)return response.status(201).json("No available services yet.")
      availableServices=availableServices.map(element=>element._specilization);
      availableServices.filter((item, index) => availableServices.indexOf(item) === index)
        response.status(200).json(availableServices);
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
