import React from "react";

import {useQuery} from "@apollo/client";

import {getUserDetails} from "../../utils/tokenDetails";
import PastAppointments from "./pastAppointments";
import {PatientAppointmentInterface} from "./patientAppointmentInterface";
import {PATIENT_APPOINTMENTS} from "./patientAppointmentsGqlQuery";
import ScheduleAppointment from "./scheduleAppointment/scheduleAppointment";
import UpcomingAppointments from "./upcomingAppointments";


const PatientDashboard: React.FC = () => {
    const {username, password} = getUserDetails();

    const patientAppointments = useQuery(PATIENT_APPOINTMENTS, {
        variables: {
            username: username,
            password: password
        }
    });

    if (patientAppointments.loading) {
        return <div>Loading</div>;
    }
    if (patientAppointments.error) {
        return <div>Error</div>;
    }

    const data = patientAppointments.data?.userLogin?.user;
    const allUpcomingAppointments = data?.appointments.map((appointment: PatientAppointmentInterface) => {
        return <UpcomingAppointments
            key={appointment.id}
            date={appointment.date}
            departmentId={appointment.departmentId}
            id={appointment.id}
            doctorId={appointment.doctorId}
            time={appointment.time}
        />;
    });

    const allPastAppointments = data?.appointments.map((appointment: PatientAppointmentInterface) => {
        return <PastAppointments
            key={appointment.id}
            date={appointment.date}
            departmentId={appointment.departmentId}
            id={appointment.id}
            doctorId={appointment.doctorId}
            time={appointment.time}
        />;
    });

    return (
        <div>
            Patient Dashboard
            <ScheduleAppointment/>
            {allUpcomingAppointments}
            {allPastAppointments}
        </div>
    );
};

export default PatientDashboard;
