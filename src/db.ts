import { any } from 'joi';
import mongoose from 'mongoose'
// import ProcessEnv from './interfaces/hotel.interfaces'

function database(){
    mongoose
        .set('strictQuery', true)
        .connect( process.env.DATABASE_URI!, {
            // userCreateIndex: true,
            // useNewUrlParser:true,
            // userUnifiedTopology:true,
        })
        .then(()=>{
            console.log('Hurray! mongoDB is connected');
        })
        .catch((err) =>{
            console.log('====== An error occured while connecting to database ======= ' + err);
        })
    
}

export default database;
