import React from "react";

import {useQuery} from "@apollo/client";

import {getUserDetails} from "../../utils/tokenDetails";
import PastAppointments from "./pastAppointments";
import {PatientAppointmentInterface} from "./patientAppointmentInterface";
import {PATIENT_APPOINTMENTS} from "./patientAppointmentsGqlQuery";
import {processPastAppointmentData, processUpcomingAppointmentData} from "./processAppointmentData";
import ScheduleAppointment from "./scheduleAppointment/scheduleAppointment";
import UpcomingAppointments from "./upcomingAppointments";


const PatientDashboard: React.FC = () => {
    const {id} = getUserDetails();

    const patientAppointments = useQuery(PATIENT_APPOINTMENTS, {
        variables: {
            id: id,
            userType: "patient"
        }
    });

    if (patientAppointments.loading) {
        return <div>Loading</div>;
    }
    if (patientAppointments.error) {
        return <div>Error Dashboard</div>;
    }

    const data = patientAppointments.data?.userAppointments;
    const allUpcomingAppointments = processUpcomingAppointmentData(data)
        .map((appointment: PatientAppointmentInterface) => {
            return <UpcomingAppointments
                key={appointment.id}
                date={appointment.date}
                departmentId={appointment.departmentId}
                id={appointment.id}
                doctorId={appointment.doctorId}
                time={appointment.time}
                doctorName={appointment.doctorName}
                problem={appointment.problem}
                day={appointment.day}
            />;
        });

    const allPastAppointments = processPastAppointmentData(data)
        .map((appointment: PatientAppointmentInterface) => {
            return <PastAppointments
                key={appointment.id}
                date={appointment.date}
                departmentId={appointment.departmentId}
                id={appointment.id}
                doctorId={appointment.doctorId}
                time={appointment.time}
                doctorName={appointment.doctorName}
                problem={appointment.problem}
                day={appointment.day}
            />;
        });

    return (
        <div className="patientDashboard">
            <div className="dashboard-title">
                <h1>Patient Dashboard</h1>
            </div>
            
            <ScheduleAppointment/>
            <table className="simple-table">
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Monday</td>
                        <td>8-9</td>
                        <td>9-10</td>
                        <td>10-11</td>
                        <td>11-12</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>8-9</td>
                        <td>9-10</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>8-9</td>
                        <td>10-11</td>
                        <td>11-12</td>
                    </tr>
                    <tr>
                        <td>Thrusday</td>
                        <td>8-9</td>
                        <td>9-10</td>
                        <td>10-11</td>
                        
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>8-9</td>
                        <td>9-10</td>
                        <td>10-11</td>
                    </tr>
                </tbody>
            </table>

            <h3 className="appointment-heading">Upcoming Appointment</h3>
            <table className="simple-table">
                <thead>
                    <tr>
                        <th>Reference Id</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Department</th>
                        <th>Day</th>
                        <th>Doctor Name</th>
                        <th>Problem</th>
                    </tr>
                </thead>
                <tbody>
                    {allUpcomingAppointments}
                </tbody>
            </table>
            <h3 className="appointment-heading">Past Appointment</h3>
            <table className="simple-table">
                <thead>
                    <tr>
                        <th>Reference Id</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Department</th>
                        <th>Day</th>
                        <th>Doctor Name</th>
                        <th>Problem</th>
                    </tr>
                </thead>
                <tbody>
                    {allPastAppointments}
                </tbody>
            </table>
        </div>
    );
};

export default PatientDashboard;
