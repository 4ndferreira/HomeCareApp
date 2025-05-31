import { Controller, Route, Tags, Get, Post, Put, Delete, Path, Body, SuccessResponse, Response as TsoaResponse, Query } from "tsoa";
import { AppointmentService } from "../services/AppointmentService.js";
import { GetAppointmentResponse } from "../models/appointment/dtos/GetAppointmentResponse.js";
import { PostAppointmentRequest } from "../models/appointment/dtos/PostAppointmentRequest.js";
import { CreateResponse } from "../models/shared/CreateResponse.js";
import { PutAppointmentRequest } from "../models/appointment/dtos/PutAppointmentRequest.js";
import { injectable } from "tsyringe";

@injectable()
@Route("appointments")
@Tags("Appointments")
export class AppointmentController extends Controller {
  constructor(private appointmentService: AppointmentService) { super() }
  /**
   * @summary Busca por todos os agendamentos da base
   * @returns Lista de todos os agendamentos
   */
  @Get("/")
  public async getAllAppointments(
    @Query() idCaregiver?: number,
    @Query() idPatient?: number
  ): Promise<GetAppointmentResponse[]> {
    if (idCaregiver && idPatient)
      throw new Error("Only one filter should be used per consultation.");
    
    const response = await this.appointmentService.getAllAppointments(
      idCaregiver,
      idPatient
    );
    return response;
  }
  /**
   * @summary Busca por um agendamento pelo seu ID
   * @returns Exibe os dados do agendamento
   */
  @Get("/{id}")
  @TsoaResponse<null>(404, "Appointment not found")
  public async getAppointmentById(
    @Path() id: number
  ): Promise<GetAppointmentResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid appointment id: ${id}`);
    }
    const appointment = await this.appointmentService.getAppointmentById(id);
    if (!appointment) {
      this.setStatus(404);
      throw new Error("Appointment not found");
    }
    return appointment;
  }
  /**
   * @summary Cria um novo agendamento
   * @returns Retorna o ID do agendamento criado
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  public async createAppointment(
    @Body() body: PostAppointmentRequest
  ): Promise<CreateResponse> {
    const appointment = await this.appointmentService.createAppointments(body);
    this.setStatus(201);
    return { id: appointment.id };
  }
  /**
   * @summary Atualiza um agendamento pelo ID
   */
  @SuccessResponse("204", "No Content")
  @Put("{id}")
  public async updateAppointment(
    @Path() id: number,
    @Body() body: PutAppointmentRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid appointment id: ${id}`);
    }

    const updated = await this.appointmentService.updateAppointments(id, body);
    if (!updated) {
      this.setStatus(404);
      throw new Error("Appointment not found");
    }
    this.setStatus(204);
  }
  /**
   * @summary Remove um agendamento da base
   */
  @SuccessResponse("204", "No Content")
  @Delete("{id}")
  public async deleteAppointment(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }

    const deleted = await this.appointmentService.deleteAppointments(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error("Appointment not found");
    }
    this.setStatus(204);
  }
}
