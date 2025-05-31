import { AppointmentStatus } from "../enums/AppointmentStatus.js"

export interface PutAppointmentRequest {
  scheduledAt: Date,
  status: AppointmentStatus,
  idAddress: number
}