const UserSchema = require("../mongoDbSchema/UserSchema.js");
const DoctorSchema = require("../mongoDbSchema/DoctorSchema");
const processInputData = require("../functions/processUserData");
const bcrypt = require("bcryptjs");
const userSchemaFields = require("../constants/userSchemaFields");
const doctorSchemaFields = require("../constants/doctorSchemaFields");

// const resolvers = {
//     Query: {
//         users: () => {
//             console.log("Users getting called");
//             return new Promise((resolve, reject) => {
//                 UserSchema.find((err, friends) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                     } else {
//                         console.log(friends);
//                         resolve(friends);
//                     }
//                 });
//             });
//         },
//         user: (parent, args) => {
//             const username = args.username;
//             return new Promise((resolve, reject) => {
//                 UserSchema.findOne({username}).exec().then((user) => {
//                     bcrypt.compare(args.password, user.password).then((compareResult) => {
//                         if (compareResult) {
//                             resolve(user);
//                         } else {
//                             reject(user);
//                         }
//                     });
//                 });
//             });
//         },
//     },
//     Mutation: {
//         createUser: (parent, args) => {
//             const user = args.input;
//             const saltRounds = bcrypt.genSaltSync(10);
//             const pwd = bcrypt.hashSync(user.password, saltRounds);

//             const newUser = new UserSchema({
//                 name: user.name,
//                 username: user.username,
//                 age: user.age,
//                 password: pwd,
//             });
//             user.id = newUser._id;
//             return new Promise((resolve, reject) => {
//                 newUser.save((err) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(newUser);
//                     }
//                 });
//             });
//         },
//         updateUser: (parent, args) => {
//             const user = args.input;
//             const processedUserData = processInputData(user, userSchemaFields);
//             const userId = user.id;
//             return new Promise((resolve, reject) => {
//                 UserSchema.findOneAndReplace(
//                     {_id: userId},
//                     {$set: {processedUserData}},
//                     {upsert: true, new: true},
//                     (err, result) => {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve(result);
//                         }
//                     },
//                 );
//             });
//         },
//         createDoctor: (parent, args) => {
//             const doctor = args.input;
//             const saltRounds = bcrypt.genSaltSync(10);
//             const pwd = bcrypt.hashSync(doctor.password, saltRounds);

//             const newDoctor = new DoctorSchema({
//                 name: doctor.name,
//                 username: doctor.username,
//                 password: pwd,
//             });

//             doctor.id = newDoctor._id;
//             return new Promise((resolve, reject) => {
//                 newDoctor.save((err) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(newDoctor);
//                     }
//                 });
//             });
//         },
//         updateDoctor: (parent, args) => {
//             const doctor = args.input;
//             const processedUserData = processInputData(doctor, doctorSchemaFields);
//             const userId = doctor.id;
//             return new Promise((resolve, reject) => {
//                 DoctorSchema.findOneAndReplace(
//                     {_id: userId},
//                     {$set: {processedUserData}},
//                     {upsert: true, new: true},
//                     (err, result) => {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve(result);
//                         }
//                     },
//                 );
//             });
//         },
//     },
// };


const resolvers = {
    users: () => {
        return new Promise((resolve, reject) => {
            UserSchema.find((err, friends) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(friends);
                }
            });
        });
    },
    user: (args) => {
        const username = args.username;
        const password = args.password;
        return new Promise((resolve, reject) => {
            UserSchema.findOne({username}).exec().then((user) => {
                bcrypt.compare(password, user.password).then((compareResult) => {
                    if (compareResult) {
                        resolve(user);
                    } else {
                        reject(user);
                    }
                });
            });
        });
    },
    createUser: (args) => {
        const user = args.input;
        const saltRounds = bcrypt.genSaltSync(10);
        const pwd = bcrypt.hashSync(user.password, saltRounds);

        const newUser = new UserSchema({
            name: user.name,
            username: user.username,
            age: user.age,
            password: pwd,
        });
        user.id = newUser._id;
        return new Promise((resolve, reject) => {
            newUser.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newUser);
                }
            });
        });
    },
    updateUser: (args) => {
        const user = args.input;
        const processedUserData = processInputData(user, userSchemaFields);
        const userId = user.id;
        return new Promise((resolve, reject) => {
            UserSchema.findOneAndReplace(
                {_id: userId},
                {$set: {processedUserData}},
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
    createDoctor: (args) => {
        const doctor = args.input;
        const saltRounds = bcrypt.genSaltSync(10);
        const pwd = bcrypt.hashSync(doctor.password, saltRounds);

        const newDoctor = new DoctorSchema({
            name: doctor.name,
            username: doctor.username,
            password: pwd,
        });

        doctor.id = newDoctor._id;
        return new Promise((resolve, reject) => {
            newDoctor.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newDoctor);
                }
            });
        });
    },
    updateDoctor: (args) => {
        const doctor = args.input;
        const processedUserData = processInputData(doctor, doctorSchemaFields);
        const userId = doctor.id;
        return new Promise((resolve, reject) => {
            DoctorSchema.findOneAndReplace(
                {_id: userId},
                {$set: {processedUserData}},
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

};
module.exports = resolvers;
