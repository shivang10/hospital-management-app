import React from "react";

import {getUserDetails} from "../utils/tokenDetails";
import DoctorProfile from "./doctor/doctorProfile";
import PatientProfile from "./patient/patientProfile";

const MyProfile: React.FC = () => {

    const userType = getUserDetails()["type"];
    const profileType = userType === "doctor" ? <DoctorProfile/> : <PatientProfile/>;

    return (
        <div>
            My Profile
            {profileType}
        </div>
    );
};

export default MyProfile;
