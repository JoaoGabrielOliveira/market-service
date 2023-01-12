import express from 'express'
import Routes from './Router';

const ExpressServer = express();
ExpressServer.use(express.json())
ExpressServer.use( Routes);

export default ExpressServer;