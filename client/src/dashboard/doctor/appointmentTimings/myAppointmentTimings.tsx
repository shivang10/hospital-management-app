import React from "react";

import {useQuery} from "@apollo/client";

import {getUserDetails} from "../../../utils/tokenDetails";
import {MyAppointmentsInterface} from "./myAppointmentsInterface";
import {MY_APPOINTMENT_TIMINGS} from "./myAppointmentTimingsGqlQuery";

const MyAppointmentTimings: React.FC = () => {

    const {id} = getUserDetails();

    const {data, loading, error} = useQuery(MY_APPOINTMENT_TIMINGS, {
        variables: {ids: [id]}
    });

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    const availableTimings = (appointments: any) => {
        return Object.keys(appointments)
            .map((appointmentDay) => {
                const daySlots = Object.keys(appointments[appointmentDay])
                    .filter((appointmentDayTime) => appointments[appointmentDay][appointmentDayTime] > 0)
                    .map((appointmentDayTime) => {
                        return (
                            <td key={appointmentDayTime}>
                                {appointmentDayTime}
                            </td>
                        );
                    });
                return (
                    <tr key={appointmentDay}>
                        <td>{appointmentDay}</td>
                        {daySlots}
                    </tr>
                );
            });
    };

    const myTimings = data?.departmentDoctorsTimings
        .map((doctor: MyAppointmentsInterface) => {
            const allTimeSlots = availableTimings(JSON.parse(doctor["appointmentTimings"]));
            return <div key={doctor["doctorId"]}>
                <table className="simple-table">
                    <tbody>{allTimeSlots}</tbody>
                </table>
            </div>;
        });

    return (
        <div>
            <h3 className="appointment-heading">My Timings</h3>
            {myTimings}
        </div>
    );
};

export default MyAppointmentTimings;
