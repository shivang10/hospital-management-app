import React from "react";

import {useQuery} from "@apollo/client";

import {getUserDetails} from "../../utils/tokenDetails";
import {DoctorAppointmentInterface} from "./doctorAppointmentInterface";
import {DOCTOR_APPOINTMENTS} from "./doctorAppointmentsGqlQuery";
import PastAppointments from "./pastAppointments";
import {processUpcomingAppointmentData, processPastAppointmentData} from "./processAppointmentData";
import UpcomingAppointments from "./upcomingAppointments";


const DoctorDashboard: React.FC = () => {

    const {id} = getUserDetails();

    const {data, loading, error} = useQuery(DOCTOR_APPOINTMENTS, {
        variables: {
            id: id,
            userType: "doctor"
        }
    });

    if(loading) {
        return <div>Loading</div>;
    }

    if(error) {
        return <div>Error</div>;
    }

    const allUpcomingAppointments = processUpcomingAppointmentData(data?.userAppointments)
        .map((appointment: DoctorAppointmentInterface) => {
            return <UpcomingAppointments
                key={appointment.id}
                date={appointment.date}
                departmentId={appointment.departmentId}
                id={appointment.id}
                time={appointment.time}
                patientName={appointment.patientName}
                problem={appointment.problem}
                day={appointment.day}
                patientId={appointment.patientId}/>;
        });

    const allPastAppointments = processPastAppointmentData(data?.userAppointments)
        .map((appointment:DoctorAppointmentInterface) => {
            return <PastAppointments
                key={appointment.id}
                date={appointment.date}
                departmentId={appointment.departmentId}
                id={appointment.id}
                time={appointment.time}
                patientName={appointment.patientName}
                problem={appointment.problem}
                day={appointment.day}
                patientId={appointment.patientId}
            />;
        });

    return (
        <div>
            Doctor Dashboard
            {allUpcomingAppointments}
            {allPastAppointments}
        </div>
    );
};

export default DoctorDashboard;
