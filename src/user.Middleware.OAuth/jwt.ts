import express, {Application, NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import constants from '../message/constants'
const {MESSAGES} = constants

//function that verify's the token and goes to the next module/operation next() if successful
function verifyToken(req: Request,res: Response, next: NextFunction) {
    const bearHeader = req.headers['authorization']
    if(typeof bearHeader !== 'undefined'){
        const bearToken =  bearHeader.split(' ')[1]
        req.query.token = bearToken
        next()
    }else{
        res.status(403)
        .send({ message:MESSAGES.UNAUTHORIZED , success: false }); // Restricting access if authorization fails 
    }
};

export default verifyToken
