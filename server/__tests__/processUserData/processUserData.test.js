const processUserData = require("../../functions/processUserData");
const {userDataWithFewFields,
    userDataWithFewFieldsResult,
    userDataWithNoField,
    userDataWithNoFieldResult,
    userDataWithUnknownField,
    userDataWithUnknownFieldResult,
    doctorDataWithFewFields,
    doctorDataWithFewFieldsResult,
} = require("./processUser.data");
const userSchemaFields = require("../../constants/userSchemaFields");
const doctorSchemaFields = require("../../constants/doctorSchemaFields");

describe("tests for process user data", () => {
    test("tests if no data is there", () => {
        expect(processUserData(userDataWithNoField, userSchemaFields)).toEqual(userDataWithNoFieldResult);
    });

    test("tests when only few fields are there", () => {
        expect(processUserData(userDataWithFewFields, userSchemaFields)).toEqual(userDataWithFewFieldsResult);
    });

    test("tests when unknown fields are there", () => {
        expect(processUserData(userDataWithUnknownField, userSchemaFields)).toEqual(userDataWithUnknownFieldResult);
    });
});

describe("tests for process doctor data", () => {
    test("tests when only few fields are there", () => {
        expect(processUserData(doctorDataWithFewFields, doctorSchemaFields)).toEqual(doctorDataWithFewFieldsResult);
    });
});
