import { GetRepository } from "../database/data-source";
import { User } from "../model/User";
import BaseService from "./BaseService";

export default class UserService extends BaseService<User> {
    constructor(){
        super();
        this.repository = GetRepository(User);
    }

    async findById(id:any) {
        return this.findOneBy({id: id});
    }
}