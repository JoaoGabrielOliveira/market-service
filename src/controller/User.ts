import { Request, Response } from "express";
import UserDAO from "../dao/UserDAO";
import UserService from "../service/UserService";
import { MapperArrayTo } from "../util/Mapper";
import { User } from "../model/User";

const service = new UserService();

export async function getAllUsers(req : Request, res : Response) {  
    return res.status(200).send(
        MapperArrayTo(UserDAO, await service.find({ order: { firstName: 'ASC'}}))
    );
};

export async function getOneUser(req : Request, res : Response) {
    return res.status(200).send(await service.findById(req.params.id));
};

export async function postNewUser(req : Request, res : Response) {
    let response; 

    const bodyEntity = req.body as User;
    if(bodyEntity.id != null)
        if (service.exist({where: {id: bodyEntity.id}}))
            return res.status(400).send({ message: `Id ${bodyEntity.id} is already used!`, data: bodyEntity});
    

    service.save(req.body).then(result => {
        if(result.id != null)
            response = res.status(201).send({ message: "User was saved with successfully", data: result});
        else
            response = res.status(400).send({ message: "User was not saved with successfully", data: result})
    }).catch(error => {
        response = res.status(500).send({message: `An error occurred when user was being saved!`, data: error});
    }).finally( () => {
        return response
    })
    
    return response;
};