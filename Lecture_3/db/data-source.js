import { DataSource } from "typeorm";
import { TodosSchema } from "../schema/Todos.schema.js";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "neondb",
  synchronize: false, // disable auto-sync, use migrations instead
  logging: true,
  entities: [TodosSchema],
  migrations: ["./migrations/*.js"],
  migrationsTableName: "migrations_history",
  ssl: {
    rejectUnauthorized: false, // for local development
  },
});
