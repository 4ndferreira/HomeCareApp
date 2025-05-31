import { CaregiverRepository } from "../repositories/CaregiverRepository.js";
import { Caregiver } from "../models/caregiver/entities/Caregiver.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { PatientRepository } from "../repositories/PatientRepository.js";
import { GetCaregiverResponse } from "../models/caregiver/dtos/GetCaregiverResponse.js";
import toGetCaregiverResponse from "../models/caregiver/mappers/ToGetCaregiverResponse.js";
import { singleton } from "tsyringe";

@singleton()
export class CaregiverService {
  constructor(
    private caregiverRepository: CaregiverRepository,
    private patientRepository: PatientRepository,
    private userRepository: UserRepository
  ) {}

  async getAllCaregivers(): Promise<GetCaregiverResponse[]> {
    const careProfs = await this.caregiverRepository.findAll({
      relations: { user: true },
    });

    const detailedCaregiver = await Promise.all(
      careProfs.map(async (careProf) => {
        try {
          return toGetCaregiverResponse(careProf);
        } catch (e) {
          console.error("Error processing care professional:", e);
          return null;
        }
      })
    );

    return detailedCaregiver.filter(
      (p): p is GetCaregiverResponse => p !== null
    );
  }

  async getCaregiverById(id: number): Promise<GetCaregiverResponse | null> {
    const careProf = await this.caregiverRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!careProf) throw new NotFoundError("Care Professional not found");

    return toGetCaregiverResponse(careProf);
  }

  async getCaregiverByIdUser(
    idUser: number
  ): Promise<GetCaregiverResponse | null> {
    const user = await this.userRepository.findOne({
      where: { id: idUser },
    });
    if (!user) throw new Error("User not found");

    const careProf = await this.caregiverRepository.findByUserId({
      where: { idUser },
      relations: { user: true },
    });
    if (!careProf) throw new NotFoundError("Care Professional not found");

    return toGetCaregiverResponse(careProf);
  }

  async createCaregivers(data: Partial<Caregiver>) {
    const user = await this.userRepository.findOne({
      where: { id: data.idUser },
    });
    if (!user) throw new NotFoundError("User not found.");
    const idUser = user.id;
    const associatedPatient = await this.patientRepository.findByUserId({
      where: { id: idUser },
    });
    const associatedCaregiver = await this.caregiverRepository.findByUserId({
      where: { id: idUser },
    });
    if (associatedPatient || associatedCaregiver)
      throw new Error("User already associated.");

    return this.caregiverRepository.createAndSave(data);
  }

  updateCaregivers(id: number, caregiverData: Partial<Caregiver>) {
    return this.caregiverRepository.update(id, caregiverData);
  }
}
