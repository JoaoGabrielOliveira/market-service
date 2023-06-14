import { BaseEntity, DataSource, Entity, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import SendEvent from "../util/Event";

interface Service<T extends BaseEntity> {
    find(options : FindManyOptions <T>) : Promise<T[]>;
    findBy(params : FindOptionsWhere<T> | FindOptionsWhere<T>) : Promise<T[]>
    findOne(options?: FindOneOptions<T>) : Promise<T>
    findOneBy(params : FindOptionsWhere<T> | FindOptionsWhere<T>) : Promise<T>
}

export default abstract class BaseService<T extends BaseEntity> implements Service<T> {
    public repository : Repository<T>;
    private nameTable : string;

    get name(){
        (!this.nameTable)
            this.nameTable = "Users";
        return this.nameTable;
    }

    async find(options?: FindManyOptions<T>) {
        SendEvent(`Starting search for ${this.name} in database!`, options, 'info');

        const models = this.repository.find(options);
        models.then(result => {
            if(result)
                SendEvent(`Search for ${this.name} completed successfully!`, options);
            else
                SendEvent(`Has no ${this.name} in database!`, options, 'warn');
        }).catch((error) => {
            SendEvent(`Search for ${this.name} has a error!`, error, 'error');
        });

        return models;
    }

    async findOne(options?: FindOneOptions<T>) {
        SendEvent(`Starting search for one ${this.name} in database!`, {}, 'info');

        const models = this.repository.findOne(options);
        models.then(result => {
            if(result)
                SendEvent(`Search for one ${this.name} completed successfully!`, options);
            else
                SendEvent(`Has no ${this.name} in database!`, options, 'warn');
        }).catch((error) => {
            SendEvent(`Search for ${this.name} has a error!`, error, 'error');
        });

        return models;
    }

    async findBy(params : FindOptionsWhere<T> | FindOptionsWhere<T>){
        SendEvent(`Starting search by params for ${this.name} in database!`, params, 'info');

        const models = this.repository.findBy(params);
        models.then(result => {
            if(result)
                SendEvent(`Search by params for ${this.name} completed successfully!`, params);
            else
                SendEvent(`Has no ${this.name} with this params in database!`, params, 'warn');
        }).catch((error) => {
            SendEvent(`Search for ${this.name} has a error!`, error, 'error');
        });

        return models;
    }

    async findOneBy(params : FindOptionsWhere<T> | FindOptionsWhere<T>){
        SendEvent(`Starting search by params for one ${this.name} in database!`, params, 'info');

        const models = this.repository.findOneBy(params);
        models.then(result => {
            if(result)
                SendEvent(`Search by params for one ${this.name} completed successfully!`, params);
            else
                SendEvent(`Has no ${this.name} with this params in database!`, params, 'warn');
        }).catch((error) => {
            SendEvent(`Search for one ${this.name} has a error!`, error, 'error');
        });

        return models;
    }

    async exist(options?: FindOneOptions<T>) : Promise<boolean> {
        SendEvent(`Starting search for one ${this.name} in database!`, {}, 'info');

        const existEntity = this.repository.exist(options);

        existEntity.then(result => {
            if(result)
                SendEvent(`Search for one ${this.name} completed successfully!`, options);
            else
                SendEvent(`Has no ${this.name} in database!`, options, 'warn');
        }).catch((error) => {
            SendEvent(`Search for ${this.name} has a error!`, error, 'error');
        });

        return existEntity;
    }
}