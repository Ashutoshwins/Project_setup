"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const controllers_1 = __importDefault(require("../controller/controllers"));
const express_1 = __importDefault(require("express"));
exports.route = express_1.default.Router();
const middlewares_1 = __importDefault(require("../middleware/middlewares"));
const controller = new controllers_1.default();
const auth = new middlewares_1.default();
exports.route.post('/create', auth.auth, controller.newUser),
    exports.route.get('/getAllData', controller.getAllUserDetails);
exports.route.delete('/deleteUser/:id', controller.deleteUser);
exports.route.patch('/updateUser/:id', controller.updateUserData);
exports.route.post('/login', controller.loginUser);
