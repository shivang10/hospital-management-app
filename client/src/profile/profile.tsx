import React from "react";

import {getUserDetails} from "../utils/tokenDetails";
import DoctorProfile from "./doctorProfile";
import PatientProfile from "./patientProfile";

const MyProfile: React.FC = () => {

    const tokenDetails = getUserDetails();
    const profileType = tokenDetails["type"] === "doctor" ? <DoctorProfile/> : <PatientProfile/>;

    return (
        <div>
            My Profile
            {profileType}
        </div>
    );
};

export default MyProfile;
