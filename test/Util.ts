import { DataSource } from "typeorm";
import { SetAndInitializeDataSource} from "../src/database/data-source";

export async function makeInMemoryDatabase(entities : any[]) : Promise<boolean>{
      return SetAndInitializeDataSource(new DataSource({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: entities,
        synchronize: true,
        logging: false
      }));
      
}