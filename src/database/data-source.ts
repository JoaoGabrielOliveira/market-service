import "reflect-metadata";
import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

var AppDataSource : DataSource = undefined;

export function SetDataSource(dataSource : DataSource){
    AppDataSource = dataSource;
}

export async function InitializeDataSource() : Promise<boolean>{
    const promise = AppDataSource.initialize().then(result => result.isInitialized);
    return promise
}

export async function SetAndInitializeDataSource(dataSource : DataSource){
    SetDataSource(dataSource);
    return InitializeDataSource();
}

export function DestroyDataSource(){
    return AppDataSource.destroy();
}

export function GetRepository<T>(model : {new() : T}) {
    return AppDataSource.getRepository<T>(model);
}

/** Set default dataSource */
SetDataSource(new DataSource({
    type: "sqlite",
    database: "./src/database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["./src/model/**.ts"],
    migrations: ["./src/database/migration/**.ts"],
    subscribers: [],
}));

