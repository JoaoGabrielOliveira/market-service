import "reflect-metadata";
import Environment from "./config/Enviroment";
import { InitializeDataSource } from "./database/data-source"
import ExpressServer from "./Server";
import SendEvent from "./util/Event";

InitializeDataSource().then(async () => SendEvent("Initing connection with database!", {}))
    .catch(error => SendEvent(error.message, error, 'error'));

ExpressServer.listen(Number.parseInt(Environment.PORT), Environment.HOST,
    () => SendEvent(`Server running on http://${Environment.HOST}:${Environment.PORT}`, {}))