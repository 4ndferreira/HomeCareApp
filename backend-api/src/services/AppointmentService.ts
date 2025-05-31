import { AppointmentRepository } from "../repositories/AppointmentRepository.js";
import { AddressRepository } from "../repositories/AddressRepository.js";
import { PatientRepository } from "../repositories/PatientRepository.js";
import { CaregiverRepository } from "../repositories/CaregiverRepository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { PostAppointmentRequest } from "../models/appointment/dtos/PostAppointmentRequest.js";
import { PutAppointmentRequest } from "../models/appointment/dtos/PutAppointmentRequest.js";
import { GetAppointmentResponse } from "../models/appointment/dtos/GetAppointmentResponse.js";
import toGetAppointmentResponse from "../models/appointment/mappers/ToGetAppointmentResponse.js";
import { singleton } from "tsyringe";

@singleton()
export class AppointmentService {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private addressRepository: AddressRepository,
    private patientRepository: PatientRepository,
    private caregiverRepository: CaregiverRepository
  ) {}

  async getAllAppointments(
    idCaregiver: number | undefined,
    idPatient: number | undefined
  ): Promise<GetAppointmentResponse[]> {
    const where: any = {};
    if (idCaregiver) where.idCaregiver = idCaregiver;
    if (idPatient) where.idPatient = idPatient;
    const appointments = await this.appointmentRepository.findAll({
      where,
      relations: {
        patient: { user: true },
        caregiver: { user: true },
        address: true,
      },
    });

    const detailedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        try {
          return toGetAppointmentResponse(appointment);
        } catch (e) {
          console.error("Error processing appointment:", e);
          return null;
        }
      })
    );
    return detailedAppointments.filter(
      (a: GetAppointmentResponse | null) => a !== null
    );
  }

  async getAppointmentById(id: number): Promise<GetAppointmentResponse | null> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: id },
      relations: {
        patient: { user: true },
        caregiver: { user: true },
        address: true,
      },
    });
    if (!appointment) throw new NotFoundError("Appointment not found");

    return toGetAppointmentResponse(appointment);
  }

  async createAppointments(appointmentData: PostAppointmentRequest) {
    const address = await this.addressRepository.findOne({
      where: { id: appointmentData.idAddress },
    });
    const idPatient = appointmentData.idPatient;
    const idCaregiver = appointmentData.idCaregiver;
    if (!address) throw new NotFoundError("Address not found.");

    const patient = await this.patientRepository.findOne({
      where: { id: idPatient },
    });
    if (!patient) throw new NotFoundError("Patient not found.");

    const caregiver = await this.caregiverRepository.findOne({
      where: { id: idCaregiver },
    });
    if (!caregiver) throw new NotFoundError("Care professional not found.");

    return this.appointmentRepository.createAndSave({
      scheduledAt: appointmentData.scheduledAt,
      idPatient: appointmentData.idPatient,
      idCaregiver: appointmentData.idCaregiver,
      address,
      patient,
      caregiver,
    });
  }

  async updateAppointments(id: number, appointmentData: PutAppointmentRequest) {
    const address = await this.addressRepository.findOne({
      where: { id: appointmentData.idAddress },
    });
    if (!address) throw new Error("Address not found.");

    const updated = await this.appointmentRepository.update(id, {
      scheduledAt: appointmentData.scheduledAt,
      status: appointmentData.status,
      address,
    });

    if (!updated) return null;

    return updated;
  }

  deleteAppointments(id: number) {
    return this.appointmentRepository.delete(id);
  }
}
