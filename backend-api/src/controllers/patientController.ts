import { Body, Controller, Get, Path, Post, Put, Delete, Route, Tags } from "tsoa";
import { PatientService } from "../services/PatientService.js";
import { GetPatientResponse } from "../models/patient/dtos/GetPatientResponse.js";
import { PatientRequest } from "../models/patient/dtos/PatientRequest.js";
import { CreateResponse } from "../models/shared/CreateResponse.js";
import { injectable } from "tsyringe";
import { UserService } from "../services/UserService.js";

@injectable()
@Route("patients")
@Tags("Patients")
export class PatientController extends Controller {
  constructor(
    private patientService: PatientService, 
    private userService: UserService) { super() }
  /**
   * @summary Busca a lista de todos os pacientes da base
   * @returns Lista de todos os pacientes e seus dados
   */
  @Get("/")
  public async getAllPatients(): Promise<GetPatientResponse[]> {
    return await this.patientService.getAllPatients();
  }
  /**
   * @summary Busca um paciente específico pelo seu ID
   * @returns Retorna os dados do paciente consultado
   */
  @Get("/{id}")
  public async getPatientById(@Path() id: number): Promise<GetPatientResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid patient id: ${id}`);
    }
    const patient = await this.patientService.getPatientById(id);
    if (!patient) {
      this.setStatus(404);
      throw new Error("Patient not found");
    }
    return patient;
  }
  /**
   * @summary Busca um paciente específico pelo ID do usuário associado
   * @returns Retorna os dados do paciente consultado
   */
  @Get("/user/{idUser}")
  public async getPatientByUserId(@Path() idUser: number): Promise<GetPatientResponse> {
    if (isNaN(idUser)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${idUser}`);
    }
    const patient = await this.patientService.getPatientByUserId(idUser);
    if (!patient) {
      this.setStatus(404);
      throw new Error("Patient not found");
    }
    return patient;
  }
  /**
   * @summary Cria um novo cadastro de paciente na base
   * @returns Retorna o ID do cadastro criado
   */
  @Post("/")
  public async createPatient(
    @Body() patientData: PatientRequest
  ): Promise<CreateResponse> {
    const userExists = await this.userService.getUserById(
      patientData.idUser
    );
    if(!userExists) throw new Error("User not found.");
    
    const patient = await this.patientService.createPatient(patientData);

    this.setStatus(201);
    return { id: patient.id };
  }
  /**
   * @summary Atualiza o cadastro de paciente na base
   */
  @Put("/{id}")
  public async updatePatient(
    @Path() id: number,
    @Body() patientData: PatientRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid patient id: ${id}`);
    }
    const updated = await this.patientService.updatePatient(id, patientData);
    if (!updated) {
      this.setStatus(404);
      throw new Error(`There is no patient associated with id ${id}.`);
    }
    this.setStatus(204);
  }
}
