import { DataSource } from "typeorm";
import { UserSchema } from "../schema/User.schema.js";
import { TodoSchema } from "../schema/Todo.schema.js";
import dotenv from "dotenv";
import { ElevatedTokenSchema } from "../schema/ElevatedToken.schema.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [UserSchema, TodoSchema, ElevatedTokenSchema],
  migrations: ["./migrations/*.js"],
  migrationsTableName: "migrations",
  ssl: {
    rejectUnauthorized: false,
  },
});
