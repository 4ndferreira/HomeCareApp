import { AppointmentStatus } from "../enums/AppointmentStatus.js";

export interface GetAppointmentResponse {
  id: number,
  scheduledAt: Date,
  status: AppointmentStatus
  patient: {
    name: string,
    phoneNumber: string
  },
  caregiver: {
    name: string,
    phoneNumber: string
  },
  address: {
    id: number;
    alias: string
  },
}