import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["./src/model/**.ts"],
    migrations: ["./src/database/migration/**.ts"],
    subscribers: [],
})
