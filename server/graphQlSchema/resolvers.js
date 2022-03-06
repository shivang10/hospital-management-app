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

dotenv.config();

const resolvers = {
    Query: {
        userLogin: (parent, args) => {
            const username = args.username;
            return new Promise((resolve, reject) => {
                UserSchema.findOne({username}).exec()
                    .then((user) => {
                        bcrypt.compare(args.password, user.password)
                            .then((compareResult) => {
                                if (compareResult) {
                                    const token = jwt.sign({id: user._id, username: user.username, type: "user"}, process.env.JWT_SECRET);
                                    const res = {
                                        token,
                                        user,
                                    };
                                    resolve(res);
                                } else {
                                    reject(user);
                                }
                            });
                    });
            });
        },
        doctorLogin: (parent, args) => {
            const username = args.username;
            return new Promise((resolve, reject) => {
                DoctorSchema.findOne({username}).exec()
                    .then((doctor) => {
                        bcrypt.compare(args.password, doctor.password)
                            .then((compareResult) => {
                                if (compareResult) {
                                    const token = jwt.sign({id: doctor._id, username: doctor.username, type: "doctor"}, process.env.JWT_SECRET);
                                    const res = {
                                        token,
                                        doctor,
                                    };
                                    resolve(res);
                                } else {
                                    reject(doctor);
                                }
                            });
                    });
            });
        },
        userBookAppointment: (parent, args) => {
            const user = args.input;
            console.log(user);
        },
        doctorViewAppointments: (parent, args) => {
            const doctor = args.input;
            return new Promise((resolve, reject) => {
                DoctorSchema.find({doctor}, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(reject);
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
        departmentDetails: (parent, args) => {
            const department = args.input;
            const departmentId = department.id;
            return new Promise((resolve, reject) => {
                DepartmentSchema.findOne(
                    {_id: departmentId},
                    {},
                    {},
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
                        const token = jwt.sign({id: user._id, username: user.username, type: "user"}, process.env.JWT_SECRET);
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
                        const token = jwt.sign({id: doctor._id, username: doctor.username, type: "doctor"}, process.env.JWT_SECRET);
                        const res = {
                            token,
                            doctor,
                        };
                        resolve(res);
                    }
                });
            });
        },
        doctorAppointmentTimings: (parent, args) => {
            const doctor = args.input;
            const doctorId = doctor.id;
            return new Promise((resolve, reject) => {
                DoctorSchema.findOneAndUpdate(
                    {_id: doctorId},
                    {
                        $push: {
                            appointmentTimings: {
                                $each: [doctor],
                                $position: 0,
                            },
                        },
                    },
                    {$upsert: true, new: true},
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
    },
};

module.exports = resolvers;
