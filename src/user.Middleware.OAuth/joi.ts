import express, {Application, NextFunction, Request, Response} from 'express'
import Joi from 'joi'

// using joi package to validate data 
function validateRoomJoi(req: Request,res: Response, next: NextFunction) {
    const joiRoomSchema = Joi.object({
        name: Joi.string(),
        roomType:Joi.string(),
        price:Joi.number().integer()
    })

    const {error, value} = joiRoomSchema.validate(req.body)
    if(error){
            res.status(422)
                .send({
                    message: error,
                    success: false,
                });
    }
    else{
        next() //if validation is successful, it moves to the next program
    }
}

export default validateRoomJoi