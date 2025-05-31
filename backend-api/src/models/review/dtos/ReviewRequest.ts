export interface ReviewRequest {
  rating: number;
  comment: string;
  idCaregiver: number;
  idPatient: number;
}