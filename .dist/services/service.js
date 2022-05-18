"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../model/models"));
class UserService {
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let userInput = user;
            try {
                user = new models_1.default(userInput);
                return user;
            }
            catch (e) {
                console.log(e);
                return (e);
            }
        });
    }
    getUserByAttribute(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield models_1.default.findOne(attributes);
                return user;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getAllDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                let user = yield models_1.default.find({});
                if (user) {
                }
                return user;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield models_1.default.findByIdAndDelete(id).lean();
                if (user !== null) {
                    return user;
                }
                else {
                    console.log("error");
                }
            }
            catch (e) {
                return (e);
            }
        });
    }
    updateById(Id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield models_1.default.findByIdAndUpdate(Id, data);
                console.log(user);
                return user;
            }
            catch (e) {
                return (e);
            }
        });
    }
}
exports.default = UserService;
