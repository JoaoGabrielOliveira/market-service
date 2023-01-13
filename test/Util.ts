import { DataSource } from "typeorm";

export async function makeInMemoryDatabase(entities : any[]) : Promise<DataSource>{
    let dataSource = new DataSource({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: entities,
        synchronize: true,
        logging: false
      });

      return dataSource.initialize();
}