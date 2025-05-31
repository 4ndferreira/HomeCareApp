import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/user/entities/User.js";
import { Patient } from "../models/patient/entities/Patient.js";
import { Caregiver } from "../models/caregiver/entities/Caregiver.js";
import { Appointment } from "../models/appointment/entities/Appointment.js";
import { Review } from "../models/review/entities/Review.js";
import { Address } from "../models/address/entities/Address.js";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Patient, Caregiver, Appointment, Review, Address],
  extra: {
    pool_mode: "transaction",
  },
});
