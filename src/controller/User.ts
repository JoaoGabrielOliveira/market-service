import { Request, Response } from "express";
import UserDAO from "../dao/UserDAO";
import UserService from "../service/UserService";
import { MapperArrayTo } from "../util/Mapper";

const service = new UserService();

export async function getAllUsers(req : Request, res : Response) {  
    res.status(200).send(
        MapperArrayTo(UserDAO, await service.find({ order: { firstName: 'ASC'}}))
    );
};

export async function getOneUser(req : Request, res : Response) {
    res.status(200).send(await service.findById(req.params.id));
};