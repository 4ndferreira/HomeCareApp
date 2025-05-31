export interface GetReviewResponse {
  id: number;
  rating: number;
  comment?: string | null;
  idCaregiver: number;
  patient: {
    id: number;
    name: string;
    urlImage?: string | null
  }
}