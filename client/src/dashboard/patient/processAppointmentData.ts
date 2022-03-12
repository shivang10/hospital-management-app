export const processPastAppointmentData = (appointments: { date: number; }[]) => {
    return appointments.map((appointment: { date: number; }) => {
        return appointment.date;
    });
};

export const processUpcomingAppointmentData = (appointments: { date: number; }[]) => {
    return appointments.map((appointment: { date: number; }) => {
        return appointment.date;
    });
};