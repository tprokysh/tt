import express from 'express';
import bodyParser from "body-parser";
import coreRouter from './core/router'

const server = express();
const config = process.env;

const start = () => {
    server.use(bodyParser.json());
    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
      });

    server.use(`${config.API_PREFIX}/`, coreRouter);

    server.listen(config.PORT, () => {
        console.log(`Server has been started...`)
    });
};
 
export default {
    start
};