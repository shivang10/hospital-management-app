const UserSchema = require("../mongoDbSchema/UserSchema.js");
const DoctorSchema = require("../mongoDbSchema/DoctorSchema");
const DepartmentSchema = require("../mongoDbSchema/DepartmentSchema");
const processInputData = require("../functions/processInputData");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const userSchemaFields = require("../constants/userSchemaFields");
const doctorSchemaFields = require("../constants/doctorSchemaFields");
const departmentSchemaFields = require("../constants/departmentSchemaFields");
const jwt = require("jsonwebtoken");
const AppointmentTimingsSchema = require("../mongoDbSchema/AppointmentTimingsSchema.js");
const ScheduledAppointmentsSchema = require("../mongoDbSchema/ScheduledAppointmentsSchema.js");
const {GraphQLJSON, GraphQLJSONObject} = require("graphql-type-json");

dotenv.config();

const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Query: {
        userLogin: (parent, args) => {
            const {username, password} = args;
            return new Promise((resolve, reject) => {
                UserSchema.findOne(
                    {username},
                    {},
                    {},
                    (err, user) => {
                        if (err) {
                            reject(new Error("Wrong username"));
                        } else {
                            if (user) {
                                bcrypt.compare(password, user.password)
                                    .then((compareResult) => {
                                        if (compareResult) {
                                            const token = jwt.sign({
                                                id: user._id,
                                                username: user.username,
                                                password: password,
                                                type: "user",
                                            }, process.env.JWT_SECRET);
                                            const res = {
                                                token,
                                                user,
                                            };
                                            resolve(res);
                                        } else {
                                            reject(new Error("Wrong username or password"));
                                        }
                                    })
                                    .catch((error) => {
                                        console.log("error", error);
                                    });
                            } else {
                                reject(new Error("Wrong username"));
                            }
                        }
                    });
            });
        },
        doctorLogin: (parent, args) => {
            const {username, password} = args;
            return new Promise((resolve, reject) => {
                DoctorSchema.findOne({username},
                    {},
                    {},
                    (err, doctor) => {
                        if (err) {
                            reject(new Error("Wrong username"));
                        } else {
                            if (doctor) {
                                bcrypt.compare(password, doctor.password)
                                    .then((compareResult) => {
                                        if (compareResult) {
                                            const token = jwt.sign({
                                                id: doctor._id,
                                                username: doctor.username,
                                                password: password,
                                                type: "doctor",
                                            }, process.env.JWT_SECRET);
                                            const res = {
                                                token,
                                                doctor,
                                            };
                                            resolve(res);
                                        } else {
                                            reject(new Error("Wrong username or password"));
                                        }
                                    })
                                    .catch((error) => {
                                        console.log("error", error);
                                    });
                            } else {
                                reject(new Error("Wrong username"));
                            }
                        }
                    });
            });
        },
        departments: () => {
            return new Promise((resolve, reject) => {
                DepartmentSchema.find((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        },
        departmentDoctorsTimings: (parent, args) => {
            const {ids} = args;
            return new Promise((resolve, reject) => {
                AppointmentTimingsSchema.find({doctorId: {$in: ids}},
                    {},
                    {},
                    (errors, doctors) => {
                        if (doctors) {
                            const res = doctors.map((doctor) => {
                                return {
                                    doctorId: doctor["doctorId"],
                                    doctorName: doctor["doctorName"],
                                    appointmentTimings: JSON.stringify(doctor["appointmentTimings"]),
                                };
                            });
                            resolve(res);
                        } else {
                            console.log(errors);
                            reject(errors);
                        }
                    });
            });
        },
        userAppointments: (parent, args) => {
            const {id, userType} = args;
            const filterData = {};
            if (userType === "doctor") {
                filterData["doctorId"] = id;
            } else {
                filterData["patientId"] = id;
            }
            return new Promise((resolve, reject) => {
                ScheduledAppointmentsSchema.find(filterData,
                    {},
                    {},
                    (errors, appointment) => {
                        if (appointment) {
                            resolve(appointment);
                        } else {
                            reject(errors);
                        }
                    });
            });
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            const newUser = args.input;
            const saltRounds = bcrypt.genSaltSync(10);
            const pwd = bcrypt.hashSync(newUser.password, saltRounds);

            const user = new UserSchema({
                name: newUser.name,
                username: newUser.username,
                age: newUser.age,
                password: pwd,
            });
            newUser.id = user._id;
            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        const token = jwt.sign({
                            id: user._id,
                            username: user.username,
                            type: "user",
                        }, process.env.JWT_SECRET);
                        const res = {
                            token,
                            user,
                        };
                        resolve(res);
                    }
                });
            });
        },
        updateUser: (parent, args) => {
            const user = args.input;
            const processedUserData = processInputData(user, userSchemaFields);
            const userId = user.id;
            return new Promise((resolve, reject) => {
                UserSchema.findOneAndUpdate(
                    {_id: userId},
                    {$set: processedUserData},
                    {upsert: true, new: true},
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    },
                );
            });
        },
        createDoctor: (parent, args) => {
            const newDoctor = args.input;
            const saltRounds = bcrypt.genSaltSync(10);
            const pwd = bcrypt.hashSync(newDoctor.password, saltRounds);

            const doctor = new DoctorSchema({
                name: newDoctor.name,
                username: newDoctor.username,
                password: pwd,
            });

            newDoctor.id = doctor._id;
            return new Promise((resolve, reject) => {
                doctor.save((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        const token = jwt.sign({
                            id: doctor._id,
                            username: doctor.username,
                            type: "doctor",
                        }, process.env.JWT_SECRET);
                        const res = {
                            token,
                            doctor,
                        };
                        resolve(res);
                    }
                });
            });
        },
        updateDoctor: (parent, args) => {
            const doctor = args.input;
            const processedUserData = processInputData(doctor, doctorSchemaFields);
            const userId = doctor.id;
            return new Promise((resolve, reject) => {
                DoctorSchema.findOneAndUpdate(
                    {_id: userId},
                    {$set: processedUserData},
                    {upsert: true, new: true},
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    },
                );
            });
        },
        createDepartment: (parent, args) => {
            const department = args.input;
            const processDepartmentData = processInputData(department, departmentSchemaFields);
            const newDepartment = new DepartmentSchema(processDepartmentData);
            department.id = newDepartment._id;
            return new Promise((resolve, reject) => {
                newDepartment.save((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(newDepartment);
                    }
                });
            });
        },
        updateDepartment: (parent, args) => {
            const department = args.input;
            const processDepartmentData = processInputData(department, departmentSchemaFields);
            const departmentId = department.id;
            return new Promise((resolve, reject) => {
                DoctorSchema.findOneAndUpdate(
                    {_id: departmentId},
                    {$set: processDepartmentData},
                    {new: true},
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    },
                );
            });
        },
        scheduleAppointment: (parent, args) => {
            const newAppointment = args.input;
            const appointment = new ScheduledAppointmentsSchema({
                doctorId: newAppointment.doctorId,
                doctorName: newAppointment.doctorName,
                patientId: newAppointment.patientId,
                patientName: newAppointment.patientName,
                day: newAppointment.day,
                time: newAppointment.time,
                problem: newAppointment.problem,
                date: newAppointment.date,
            });

            newAppointment.id = appointment._id;
            return new Promise((resolve, reject) => {
                appointment.save((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(appointment);
                    }
                });
            });
        },
        createAppointmentTimings: (parent, args) => {
            const {doctorId, doctorName, appointmentTimings} = args.input;
            const parsedAppointmentTimings = JSON.parse(appointmentTimings);
            const newAppointmentTimings = new AppointmentTimingsSchema({
                doctorId, doctorName,
                appointmentTimings: parsedAppointmentTimings,
            });
            return new Promise((resolve, reject) => {
                newAppointmentTimings.save((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        const res = {
                            doctorId: result["doctorId"],
                            doctorName: result["doctorName"],
                            appointmentTimings: JSON.stringify(result["appointmentTimings"]),
                        };
                        resolve(res);
                    }
                });
            });
        },
        updateAppointmentTimings: (parent, args) => {
            const {doctorId, appointmentTimings} = args.input;
            return new Promise((resolve, reject) => {
                AppointmentTimingsSchema.findOneAndUpdate(
                    {doctorId: doctorId},
                    {appointmentTimings: JSON.parse(appointmentTimings)},
                    {},
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            const res = {
                                doctorId: result["doctorId"],
                                doctorName: result["doctorName"],
                                appointmentTimings: JSON.stringify(result["appointmentTimings"]),
                            };
                            resolve(res);
                        }
                    },
                );
            });
        },
    },
};

module.exports = resolvers;
