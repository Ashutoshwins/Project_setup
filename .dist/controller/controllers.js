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
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const service_1 = __importDefault(require("../services/service"));
const userData = new service_1.default();
class userController {
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                name: joi_1.default.string().required(),
                age: joi_1.default.number().required(),
                tech: joi_1.default.string().required(),
                email: joi_1.default.string().required(),
                password: joi_1.default.string().required(),
            });
            const parmas = schema.validate(req.body, { abortEarly: false });
            if (parmas.error) {
                return res.status(404).send({ msg: parmas.error.message });
                // return sendRespons(res, { msg: parmas.error.message }, STATUS_CODES.BAD_REQUEST)
            }
            let userInput = {
                name: parmas.value.name,
                age: parmas.value.age,
                tech: parmas.value.tech,
                email: parmas.value.email,
                password: parmas.value.password,
            };
            userInput.password = yield bcrypt_1.default.hash(userInput.password, 10);
            //create newe user..    
            const user = yield userData.createNewUser(userInput);
            user.save();
            return res.status(200).send({ msg: "user created", id: user._id });
        });
    }
    getAllUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield userData.getAllDetails();
            return res.status(200).send({ msg: user });
        });
    }
    //Delete User...
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let user;
            try {
                user = yield userData.deleteById(id);
                res.status(400).send({ msg: "user deleted" });
            }
            catch (e) {
                return res.status(404).send({ msg: "user not found" });
            }
        });
    }
    //updateUsersDetails...
    updateUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Id = req.params.id;
            let data = req.body;
            try {
                const UpdateUser = yield userData.updateById(Id, data);
                if (UpdateUser === null) {
                    return res.status(304).send({ msg: "no data updated" });
                }
                else {
                    return res.status(200).send({ msg: UpdateUser });
                }
            }
            catch (e) {
                return res.status(404).send({ msg: "user not found" });
            }
        });
    }
    //loginUser.....
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            let user;
            try {
                user = yield userData.getUserByAttribute({ email });
                if (user) {
                    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                    console.log(isValidPassword);
                    if (isValidPassword) {
                        // Generate new token.....
                        let secretkey = process.env.SECRET_KEY;
                        const token = jsonwebtoken_1.default.sign({ _id: "62824f54f356a949a0cd8a14" }, secretkey);
                        console.log(token);
                        return res.status(200).send({ msg: "login successfull", token });
                    }
                    else {
                        return res.status(404).send({ msg: 'invalid credentials' });
                    }
                }
                else {
                    return res.status(404).send({ msg: 'invalid credentials' });
                }
            }
            catch (e) {
                return res.status(404).send({ msg: 'invalid credentials' });
            }
        });
    }
}
exports.default = userController;
