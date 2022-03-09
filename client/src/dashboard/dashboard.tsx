import React from "react";

import Navbar from "../navbar/navbar";
import {getUserDetails} from "../utils/tokenDetails";
import DoctorDashboard from "./doctorDashboard";
import PatientDashboard from "./patientDashboard";

const Dashboard: React.FC = () => {

    const tokenDetails = getUserDetails();
    const dashboardType = tokenDetails["type"] === "doctor" ? <DoctorDashboard/> : <PatientDashboard/>;

    return (
        <div>
            <Navbar/>
            {dashboardType}
        </div>
    );
};

export default Dashboard;
