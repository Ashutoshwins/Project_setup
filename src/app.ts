import express, { Application } from "express";
import { json } from "body-parser";
import { connect, ConnectOptions } from "mongoose";
import {route} from './route/routes'

export default class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.connectToMongo();
        this.initializeMiddlewares();
        this.connectToRoute();
    }

    private connectToMongo() {
        connect('mongodb://localhost:27017/Crudd', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions)
            .then(() => {
                console.log("Connected to MongoDB...");
            })
            .catch((e) => {
                console.error("There was an error connecting to MongoDB:");
                console.error(e);
            });
    }

    private initializeMiddlewares() {
        this.app.use(json());
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    private connectToRoute(){
        this.app.use(route);
    }
}


