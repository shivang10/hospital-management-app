const {UserSchema} = require("../mongoDbSchema/UserSchema.js");
const bcrypt = require("bcryptjs");

const resolvers = {
    Query: {
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
        user: (parent, args) => {
            const username = args.username;
            return new Promise((resolve, reject) => {
                UserSchema.findOne({username}).exec().then((user) => {
                    bcrypt.compare(args.password, user.password).then((compareResult) => {
                        if (compareResult) {
                            resolve(user);
                        } else {
                            reject(user);
                        }
                    });
                });
            });
        },
    },
    Mutation: {
        createUser: (parent, args) => {
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
    },
};

module.exports = resolvers;
