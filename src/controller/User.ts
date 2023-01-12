import { Request, Response } from "express";
import UserService from "../service/UserService";

const service = new UserService();

export async function getAllUsers(req : Request, res : Response) {
    res.status(200).send(await service.find({ order: { firstName: 'ASC'}}));
};

export async function getOneUser(req : Request, res : Response) {
    res.status(200).send(await service.findById(req.params.id));
};