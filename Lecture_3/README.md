# Install Dependencies

```
npm install typeorm reflect-metadata
```

```
npm install pg
```

# Generate Schema

```js
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
    },
  },
});
```

# Create DataSource for TypeORM

```js
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
  synchronize: true, // auto-create tables in dev
  logging: true,
  entities: [TodosSchema],
  ssl: {
    rejectUnauthorized: false, // for local development
  },
});
```

# Start the App with DB Connection

```js
import express from "express";
import todosRouter from "./routers/todosRouter.js";
import { AppDataSource } from "./db/data-source.js";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.get("/", (req, res) => {
      res.send("Hello World.");
    });

    app.use("/todos", todosRouter);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.error("DB connection error:", err));
```

# Migration Scripts

```json
"migration:generate": "typeorm migration:generate -d ./db/data-source.js -o --esm",
"migration:run": "typeorm migration:run -d ./db/data-source.js",
"migration:revert": "typeorm migration:revert -d ./db/data-source.js",
"migration:show": "typeorm migration:show -d ./db/data-source.js"
```

## Additional Migration Configuration for Data Source

```json
 + migrations: ["./migrations/*.js"],
 + migrationsTableName: "migrations_history",
```
