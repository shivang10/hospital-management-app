const bcrypt = require("bcryptjs");

const processInputData = (previousData) => {
    const finalData = {};
    Object.keys(previousData).forEach((userField) => {
        if (previousData[userField]) {
            if (userField === "password") {
                const saltRounds = bcrypt.genSaltSync(10);
                finalData[userField] = bcrypt.hashSync(previousData[userField], saltRounds);
            } else {
                finalData[userField] = previousData[userField];
            }
        }
    });
    return finalData;
};

module.exports = processInputData;
