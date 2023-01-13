import { DataSource } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User } from "../model/User";
import BaseService from "./BaseService";

export default class UserService extends BaseService<User> {
    constructor(dataSource : DataSource = AppDataSource){
        super();
        this.repository = dataSource.getRepository(User);
    }

    async findById(id:any) {
        return this.findOneBy({id: id});
    }
}