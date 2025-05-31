import { PatientRepository } from "../repositories/PatientRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { CaregiverRepository } from "../repositories/CaregiverRepository.js";
import { Patient } from "../models/patient/entities/Patient.js";
import { GetPatientResponse } from "../models/patient/dtos/GetPatientResponse.js";
import { toGetPatientResponse } from "../models/patient/mappers/ToGetPatientResponse.js";
import { singleton } from "tsyringe";

@singleton()
export class PatientService {
  constructor(
    private patientRepository: PatientRepository,
    private caregiverRepository: CaregiverRepository,
    private userRepository: UserRepository
  ) {}

  async getAllPatients(): Promise<GetPatientResponse[]> {
    const patients = await this.patientRepository.findAll({
      relations: { user: true },
    });
    const detailedPatient = await Promise.all(
      patients.map(async (patient) => {
        const idUser = patient.idUser;
        try {
          const user = await this.userRepository.findOne({
            where: { id: idUser },
          });
          if (!user) throw new NotFoundError("User not found");

          return toGetPatientResponse(patient);
        } catch (e) {
          console.error("Error processing patient:", e);
          return null;
        }
      })
    );
    return detailedPatient.filter(
      (p: any): p is GetPatientResponse => p !== null
    );
  }

  async getPatientById(id: number): Promise<GetPatientResponse | null> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!patient) throw new NotFoundError("Patient not found");

    return toGetPatientResponse(patient);
  }

  async getPatientByUserId(idUser: number) {
    const user = await this.userRepository.findOne({
      where: { id: idUser },
    });
    if (!user) throw new Error("User not found");

    const patient = await this.patientRepository.findByUserId({
      where: { idUser },
      relations: { user: true },
    });
    if (!patient) throw new NotFoundError("Patient not found");

    return toGetPatientResponse(patient);
  }

  async createPatient(patientData: Partial<Patient>) {
    const patientIdUser = patientData.idUser;

    const user = await this.userRepository.findOne({
      where: { id: patientIdUser },
    });
    if (!user) throw new NotFoundError("User not found.");
    const idUser = user.id;

    const associatedPatient = await this.patientRepository.findByUserId({
      where: { idUser },
    });

    const associatedCaregiver = await this.caregiverRepository.findByUserId({
      where: { idUser },
    });
    if (associatedPatient || associatedCaregiver)
      throw new Error("User already associated.");

    return this.patientRepository.createAndSave(patientData);
  }

  updatePatient(id: number, patientData: Partial<Patient>) {
    return this.patientRepository.update(id, patientData);
  }
}
