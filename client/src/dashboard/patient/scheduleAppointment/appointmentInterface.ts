export interface AvailableAppointmentInterface {
    appointmentTimings: string,
    doctorId: string,
    doctorName: string
}

export interface AppointmentSelectionInterface {
    id: string,
    departmentDoctors: string[],
    appointmentClicked: (data: AvailableAppointmentInterface) => void,
}

export interface SelectedDepartmentInterface {
    id: string,
    departmentName: string,
    departmentDoctors: string[]
}


export interface AppointmentDayTimeInterface {
    appointmentDayTime: number
}

export interface AppointmentDayInterface {
    appointmentDay: AppointmentDayTimeInterface
}

export interface AppointmentsInterface {
    appointmentDay: AppointmentDayInterface
}
