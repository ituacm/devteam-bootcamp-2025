import { EntitySchema } from "typeorm";

export const TodoSchema = new EntitySchema({
  name: "Todo",
  tableName: "todos",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    title: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: false,
    },
    completed: {
      type: "boolean",
      default: false,
    },
    user_id: {
      type: "varchar",
      generated: "uuid",
      nullable: false,
    },
    created_at: {
      type: "timestamptz",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamptz",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",
      },
      onDelete: "CASCADE",
    },
  },
  indices: [
    {
      name: "IDX_TODO_COMPLETED",
      columns: ["completed"],
    },
    {
      name: "IDX_TODO_CREATED_AT",
      columns: ["created_at"],
    },
    {
      name: "IDX_TODO_USER_ID",
      columns: ["user_id"],
    },
  ],
});
