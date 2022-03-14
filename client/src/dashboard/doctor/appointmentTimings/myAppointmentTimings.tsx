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
                return Object.keys(appointments[appointmentDay])
                    .map((appointmentDayTime) => {
                        return(
                            <div key={appointmentDayTime}>
                                {appointmentDay}: {appointmentDayTime}: {appointments[appointmentDay][appointmentDayTime]}
                            </div>
                        );
                    });
            });
    };

    const myTimings = data?.departmentDoctorsTimings
        .map((doctor: MyAppointmentsInterface) => {
            const allTimeSlots = availableTimings(JSON.parse(doctor["appointmentTimings"]));
            return <div key={doctor["doctorId"]}>
                {allTimeSlots}
            </div>;
        });

    return(
        <div>
            Timings
            {myTimings}
        </div>
    );
};

export default MyAppointmentTimings;
