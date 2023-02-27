import mongoose from 'mongoose'
import {RoomTypes, Room, Users} from '../models/roomModel'
import {IHotel} from '../interfaces/hotel.interfaces'

class HotelServices { 
    //TO CREATE ROOM TYPE
    async createRoomType(id:string){
            return await RoomTypes.create(id)
    }

    //TO FETCH  ROOM TYPE
    async fetchAllRoomTypes(){
        return await RoomTypes.find(); 
    }

    //TO CREATE ROOMS
    async createRoom(data: Partial<IHotel>){    
            return await Room.create(data)
    }

     //TO FETCH ROOMS BY ID
    async fetchRoom(id:string){
        return await Room.find({_id: id})
    }

    //TO EDIT ROOMS
    async editRoom(id:string, type:Partial<IHotel>){
        return await Room.findOneAndUpdate({_id:id}, type, {
            new: true
        });
    }

    //TO DELETE ROOMS
    async deleteRoom(id:string){
        return await Room.findByIdAndDelete({_id: id})
    }

    //TO FETCH ALL USERS
    async fetchAllUser(){
        return await Users.find({}); 
    }
}

export default new HotelServices()