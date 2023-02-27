import express, { Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcrypt'
import {RoomTypes, Room, Users} from '../models/roomModel'
import mongoose from 'mongoose'
import {IHotel} from '../interfaces/hotel.interfaces'



import constants from '../message/constants'
const {MESSAGES} = constants

class User{

//signing up
async signupUser(req:Request, res:Response){
    try{
    const email = req.body.email

    const findAllUser = await Users.findOne({email})
    if(findAllUser){ 
        res.status(500) .send({ message: MESSAGES.DUPLICATE, success: false });
    }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);


        await Users.create({
            email: req.body.email,
            password: hashedPassword,
            role:req.body.role})

            // This creates a token for only admin which they can use to perform other special requests.
            if(req.body.role === "admin"){
                jwt.sign({email: req.body.email, role:req.body.role}, process.env.SECRET_KEY!,  { expiresIn: '1h' }, (error , token)=>{
                    res.json({
                        message: MESSAGES.REGISTERED, 
                        success: true,
                        token
                    })

                })
                }
            else{
                res.status(201)
                .json({
                        message: MESSAGES.REGISTERED,  
                        success: true,
                    }); 
            }
        }
    catch(err){
        res.status(500)
        .send({ message: MESSAGES.ERROR, success: false });
    }
}


//login user, validating email and using bcrypt to compare passwords 
    async loginUser(req:Request, res:Response){
        const {email} = req.body
        const {password} = req.body
        const checkUsers = await Users.findOne({email})

        
        if(checkUsers == null){ 
            res.status(500)
            .json({ message: MESSAGES.REGISTER, success: false });
        }
        
        const checkUserspassword = String(await Users.findOne({password}))
        bcrypt.compare(password, checkUserspassword);
            res.status(403)
            .json({
            success: true,
            message: MESSAGES.LOGIN,
            checkUsers})
    }
}
export default new User()
