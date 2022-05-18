import Joi from 'joi';
import { Request, response, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Service from "../services/service";




const userData: any = new Service()

export default class userController{
 async newUser (req: Request, res: Response) {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        tech: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    const parmas = schema.validate(req.body, { abortEarly: false });
    if (parmas.error) {
        return res.status(404).send({msg:parmas.error.message })
        // return sendRespons(res, { msg: parmas.error.message }, STATUS_CODES.BAD_REQUEST)
    }
    let userInput = {
        name : parmas.value.name,
        age: parmas.value.age,
        tech:parmas.value.tech,
        email:parmas.value.email,
        password:parmas.value.password,
    }

    userInput.password = await bcrypt.hash(userInput.password, 10);

    //create newe user..    
    const user = await userData.createNewUser(userInput)
    user.save()
    return res.status(200).send({msg:"user created",id: user._id})

}

async getAllUserDetails(req: Request, res: Response) {
    let user = await userData.getAllDetails()
    return res.status(200).send({ msg: user })
}
//Delete User...

async deleteUser(req: Request, res: Response) {
    let id = req.params.id
    let user;
    try {
        user = await userData.deleteById(id)

        res.status(400).send({ msg: "user deleted" })
    } catch (e) {
        return res.status(404).send({ msg: "user not found" })
    }
}
//updateUsersDetails...

async updateUserData(req: Request, res: Response) {
    let Id = req.params.id
    let data: any = req.body
    try {
        const UpdateUser = await userData.updateById(Id, data)
        if (UpdateUser === null) {
            return res.status(304).send({ msg: "no data updated" })
        }
        else {
            return res.status(200).send({ msg: UpdateUser })
        }
    } catch (e) {
        return res.status(404).send({ msg: "user not found" })
    }
}
//loginUser.....

async loginUser(req: Request, res: Response) {
    const { email, password } = req.body
    let user;
    try {
        user = await userData.getUserByAttribute({ email })

        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password)
            console.log(isValidPassword)
            if (isValidPassword) {
                // Generate new token.....
                let secretkey: any = process.env.SECRET_KEY
                const token = jwt.sign({ _id: "62824f54f356a949a0cd8a14" }, secretkey);
                console.log(token)
                return res.status(200).send({ msg: "login successfull", token })
            } else {
                return res.status(404).send({ msg: 'invalid credentials' })
            }
        } else {
            return res.status(404).send({ msg: 'invalid credentials' })
        }
    } catch (e) {
        return res.status(404).send({ msg: 'invalid credentials' })
    }
}
}












