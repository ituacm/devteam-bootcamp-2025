import { EntitySchema } from "typeorm";

export const ElevatedTokenSchema = new EntitySchema({
  name: "ElevatedToken",
  tableName: "elevated_tokens",
  columns: {
    token: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    userId: {
      type: "uuid",
      nullable: false,
    },
    action: {
      type: "enum",
      enum: ["change_email", "change_password"],
      nullable: false,
    },
    expiresAt: {
      type: "timestamp",
      nullable: false,
    },
    used: {
      type: "boolean",
      default: false,
      nullable: false,
    },
  },
});
