import { EntitySchema } from "typeorm";

export const TodosSchema = new EntitySchema({
  name: "Todos",
  tableName: "todos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    description: {
      type: "varchar",
      nullable: false,
    },
  },
});
