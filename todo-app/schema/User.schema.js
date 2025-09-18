import { EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    username: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false,
    },
    password_hash: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    todos: {
      type: "one-to-many",
      target: "Todo",
      inverseSide: "user",
    },
  },
});
