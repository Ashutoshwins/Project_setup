import UserController from '../controller/controllers'
import express from 'express';
export const route = express.Router();
import middleware from '../middleware/middlewares'
const controller = new UserController();
const auth = new middleware();

route.post('/create',auth.auth, controller.newUser),
route.get('/getAllData', controller.getAllUserDetails);
route.delete('/deleteUser/:id', controller.deleteUser);
route.patch('/updateUser/:id', controller.updateUserData);
route.post('/login', controller.loginUser);






