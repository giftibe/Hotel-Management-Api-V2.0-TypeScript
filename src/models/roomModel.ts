import mongoose, { model } from 'mongoose';

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim:true
    },    
    role: {
        type: String,
        enum: ["guest", "admin"],
        required: [true, "Please specify user role"],
        trim:true
    },

})


const roomTypeSchema =  new Schema({

        name: {
            type: String, required: true,
            trim: true,
            unique: true
        }
})

const roomSchema =  new Schema({
            name:{
                type:String,
                required: true,
                trim: true
            },  

            roomType:{
                type: Schema.Types.ObjectId,
                ref: 'myroomtype',
                required: true
            },
            
            price: {
                type:Number,
                required: true
            },
        }
);

export const RoomTypes = mongoose.model('myroomtype',  roomTypeSchema);
export const Room = mongoose.model('room',  roomSchema);
export const Users = mongoose.model('user',  userSchema);
module.exports =  {RoomTypes, Room, Users};