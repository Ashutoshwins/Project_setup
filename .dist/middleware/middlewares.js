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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class middleware {
    auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenString = req.headers.authorization;
                let token = tokenString.replace('Bearer ', "");
                // console.log(token)
                let secretkey = process.env.SECRET_KEY;
                const verifyUser = jsonwebtoken_1.default.verify(token, secretkey);
                if (!verifyUser) {
                    req.userId = verifyUser._id;
                    return res.status(401).send({ msg: "User Unauthorized" });
                }
                next();
            }
            catch (e) {
                res.status(401).send({ msg: "User Unauthorized" });
            }
        });
    }
}
exports.default = middleware;
