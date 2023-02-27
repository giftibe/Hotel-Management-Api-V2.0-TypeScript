import express, {Application, Request, Response} from 'express'
// import * as bodyParser from 'body-parser';
import constants from '../message/constants'
const {MESSAGES} =constants
import HotelServices from '../services/services'


class HotelController{

    //create a room type
    async createRoomType(req:Request, res:Response){
        let success: boolean = false;
        try{
            const reqBody = req.body
                
            // checking if the room type exist 
            let existingRoomType = await HotelServices.fetchAllRoomTypes()
            if(existingRoomType == reqBody.name){ res.status(403).json({
                success: false,
                message: 'Room type already exist'
            })}

            //if the room type doesn't exist, we create one
            const newRoomType = await HotelServices.createRoomType(req.body)
            res.status(201)
                .send({
                    message: MESSAGES.CREATED,
                    success: true,
                    newRoomType

                }); 
        }
        catch(err){
            res.status(500)
            .send({ message:MESSAGES.ERROR, success: false });
        }    
    }

    //fetch all room types
    async fetchRoomType(req:Request, res:Response) {
        try {
        const data = await HotelServices.fetchAllRoomTypes();
        res.status(200)
            .send({ message: MESSAGES.FETCHED, success: true, ROOM_TYPES: data });
        } catch (err) {
            res.status(500)
                .send({ message: MESSAGES.ERROR, success: false });
        }
    }

    //Creating rooms with room
    async createARoom(req:Request, res:Response){
        try {
        const data =  await (await HotelServices.createRoom(req.body)).populate("roomType")
        res.status(201)
            .send({ message: MESSAGES.CREATED, success: true, ROOMS:data });

        } catch (err) {
        res.status(500)
            .send({ message: MESSAGES.ERROR, success: false });
        }
    }

    //Delete Room
    async DeleteARoom(req:Request, res:Response){
        try{
        const {id} =req.params

        //check if room to delete exist
        const existingRoom = await HotelServices.fetchRoom(id)
        if(!existingRoom){
            res.status(500)
            .send({
                message: 'Room does not exit',
                success: false 
            });
        }

        await HotelServices.deleteRoom(id)
        res.status(201)
            .send({
                message: MESSAGES.DELETED,
                success: true,
            });   
        }    
        catch (err) {
            res.status(500)
            .send({ message: MESSAGES.ERROR, success: false });
        } 
    }
    

    //Fetch rooms
    async fetchARoom(req:Request, res:Response){
        try{
        const {id} = req.params

        //check if the room to fetch exists
        const existingRoom = await HotelServices.fetchRoom(id)
        if(!existingRoom){
            res.status(500)
            .send({
                message: 'Room does not exit',
                success: false 
            });
        }

        res.status(201)
            .send({
                message: MESSAGES.FETCHED,
                success: true,
                existingRoom
            }); 
        }
        catch (err) {
            res.status(500)
            .send({ message: MESSAGES.ERROR, success: false });
        }       
    }


    //Patch room
    async editRoom(req:Request, res:Response) {
        try{
        const {id} =req.params
        const updateData = req.body
        
        //check if the room to edit exist
        const existingRoom = await HotelServices.fetchRoom(id)
        if(!existingRoom){
            res.status(500)
            .send({
                message: 'Room to edit does not exit',
                success: false 
            });
        }

        //if room exists, edit it
        const change = await HotelServices.editRoom(id, updateData);
        res.status(200)
            .send({ message: MESSAGES.UPDATED, success: true, change});
        }    
        catch (err) {
            res.status(500)
            .send({ message: MESSAGES.ERROR, success: false });
        }
    }

        //fetch all users
        async fetchAllUser(req:Request, res:Response) {
            try {
                const data = await HotelServices.fetchAllUser();
                res.status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
                } catch (err) {
                    res.status(500)
                        .send({ message: MESSAGES.ERROR, success: false });
            }
    }
}

export default new HotelController();