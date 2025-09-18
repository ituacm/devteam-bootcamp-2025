import { DataSource } from "typeorm";
import { UserSchema } from "../schema/User.schema.js";
import { TodoSchema } from "../schema/Todo.schema.js";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "neondb",
  synchronize: false,
  logging: true,
  entities: [UserSchema, TodoSchema],
  migrations: ["./migrations/*.js"],
  migrationsTableName: "migrations",
  ssl: {
    rejectUnauthorized: false,
  },
});
