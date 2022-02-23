const userDataWithFewFields = {
    "name": "User",
    "age": 43,
    "username": "",
    "password": "",
    "address": "",
    "phoneNumber": "",
    "careTakerName": "",
    "careTakerNumber": "",
    "gender": "",
    "weight": 78,
    "identityProof": null,
};

const userDataWithFewFieldsResult = {
    "name": "User",
    "age": 43,
    "weight": 78,
};

const userDataWithNoField = {
    "name": "",
    "age": null,
    "username": "",
    "password": "",
    "address": "",
    "phoneNumber": "",
    "careTakerName": "",
    "careTakerNumber": "",
    "gender": "",
    "weight": null,
    "identityProof": null,
};


const userDataWithNoFieldResult = {};


const userDataWithUnknownField = {
    "name": "User",
    "age": 43,
    "username": "",
    "password": "",
    "address": "",
    "phoneNumber": "",
    "careTakerName": "",
    "careTakerNumber": "",
    "gender": "",
    "weight": 54,
    "identityProof": null,
    "amount": 672,
};

const userDataWithUnknownFieldResult = {
    "name": "User",
    "age": 43,
    "weight": 54,
};


const doctorDataWithFewFields = {
    "name": "Doctor",
    "username": "doctor",
    "password": "",
    "age": 54,
    "address": "",
    "phoneNumber": null,
    "gender": "",
    "speciality": "",
    "domain": "",
};

const doctorDataWithFewFieldsResult = {
    "name": "Doctor",
    "username": "doctor",
    "age": 54,
};

module.exports = {
    userDataWithFewFields,
    userDataWithFewFieldsResult,
    userDataWithNoField,
    userDataWithNoFieldResult,
    userDataWithUnknownField,
    userDataWithUnknownFieldResult,
    doctorDataWithFewFields,
    doctorDataWithFewFieldsResult,
};

