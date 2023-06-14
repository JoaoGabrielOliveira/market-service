import { Request, Response, Router } from "express";
import { getAllUsers, getOneUser, postNewUser } from './controller/User';

let routes = [
    {verb: "GET", path: "", controller: (req : Request, res : Response) => {
        res.send("Uma mensagem de bom dia para todos vocês");
    }},
    {verb: "GET", path: "/users", controller: getAllUsers},
    {verb: "POST", path: "/users", controller: postNewUser},
    {verb: "GET", path: "/users/:id", controller: getOneUser},
];

function returnRoutes() : Router{
    const Routes = Router({});
    routes.forEach(route => {
        switch(route.verb.toLocaleUpperCase()){
            default:
            case 'GET':
                Routes.get(route.path, route.controller)
            break;
            case 'POST':
                Routes.post(route.path, route.controller)
            break;
            case 'PUT':
                Routes.put(route.path, route.controller)
            break;
            case 'DELETE':
                Routes.delete(route.path, route.controller)
            break;
        }
    });
    return Routes
}

export default returnRoutes();