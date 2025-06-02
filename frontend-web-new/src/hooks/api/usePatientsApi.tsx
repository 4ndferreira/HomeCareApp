import api from "@/services/api";
import { useCrudApi } from "../useCrudApi";

export interface Patient {
  id?: number | null; // somente é preechido em operações GET. POST e PUT passar nulos
  idUser: number;
  name: string;
  cpf: string;
  birthDate: string;
}

export function usePatientsApi() {
  const crud = useCrudApi<Patient>('patients');

  const getByUserId = (id: string) => api.get<Patient>(`patients/user/${id}`);

  return { ...crud, getByUserId };
}