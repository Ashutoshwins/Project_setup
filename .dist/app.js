"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = require("mongoose");
const routes_1 = require("./route/routes");
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.connectToMongo();
        this.initializeMiddlewares();
        this.connectToRoute();
    }
    connectToMongo() {
        (0, mongoose_1.connect)('mongodb://localhost:27017/Crudd', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
            .then(() => {
            console.log("Connected to MongoDB...");
        })
            .catch((e) => {
            console.error("There was an error connecting to MongoDB:");
            console.error(e);
        });
    }
    initializeMiddlewares() {
        this.app.use((0, body_parser_1.json)());
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    connectToRoute() {
        this.app.use(routes_1.route);
    }
}
exports.default = App;
