import { Body, Controller, Get, Path, Post, Put, Delete, Route, Tags, } from "tsoa";
import { CaregiverService } from "../services/CaregiverService.js";
import { UserService } from "../services/UserService.js";
import { GetCaregiverResponse } from "../models/caregiver/dtos/GetCaregiverResponse.js";
import { CaregiverRequest } from "../models/caregiver/dtos/CaregiverRequest.js";
import { CreateResponse } from "../models/shared/CreateResponse.js";
import { injectable } from "tsyringe";

@injectable()
@Route("care-professionals")
@Tags("Caregivers")
export class CaregiverController extends Controller {
  constructor(
    private caregiverService: CaregiverService, 
    private userService: UserService) { 
      super() 
  };
  /**
   * @summary Busca a lista de todos os cuidadores da base
   * @returns Lista de todos os cuidadores e seus dados
   */
  @Get("/")
  public async getAllCareProfessinals(): Promise<
    GetCaregiverResponse[]
  > {
    const caregivers =
      await this.caregiverService.getAllCaregivers();
    return caregivers;
  }
  /**
   * @summary Busca um cuidador específico pelo seu ID
   * @returns Retorna os dados do cuidador consultado
   */
  @Get("/{id}")
  public async getCareProfessinalById(
    @Path() id: number
  ): Promise<GetCaregiverResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid Caregiver id: ${id}`);
    }
    const caregiver =
      await this.caregiverService.getCaregiverById(id);
    if (!caregiver) {
      this.setStatus(404);
      throw new Error("Caregiver not found");
    }
    return caregiver;
  }
  /**
   * @summary Busca um cuidador específico pelo ID do usuário associado
   * @returns Retorna os dados do cuidador consultado
   */
  @Get("/user/{idUser}")
  public async getCareProfessinalByUserId(
    @Path() idUser: number
  ): Promise<GetCaregiverResponse> {
    if (isNaN(idUser)) {
      this.setStatus(400);
      throw new Error(`Invalid User id: ${idUser}`);
    }
    const caregiver =
      await this.caregiverService.getCaregiverByIdUser(idUser);
    if (!caregiver) {
      this.setStatus(404);
      throw new Error("Caregiver not found");
    }
    return caregiver;
  }
  /**
   * @summary Cria um novo cadastro de cuidador na base
   * @returns Retorna o ID do cadastro criado
   */
  @Post("/")
  public async createCareProfessinal(
    @Body() caregiverData: CaregiverRequest
  ): Promise<CreateResponse> {
    const userExists = await this.userService.getUserById(
      caregiverData.idUser
    );
    if(!userExists) throw new Error("User not found.");
    
    const caregiver =
      await this.caregiverService.createCaregivers(
        caregiverData
      );
    if (!caregiver) throw new Error("Unable to create caregiver.");
    
    this.setStatus(201);
    return { id: caregiver.id };
  }
  /**
   * @summary Atualiza o cadastro de cuidador na base
   */
  @Put("/{id}")
  public async updateCareProfessinal(
    @Path() id: number,
    @Body() caregiverData: CaregiverRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid Caregiver id: ${id}`);
    }
    const updated = await this.caregiverService.updateCaregivers(
      id,
      caregiverData
    );
    if (!updated) {
      this.setStatus(404);
      throw new Error("Caregiver not found");
    }
    this.setStatus(204);
  }
}
