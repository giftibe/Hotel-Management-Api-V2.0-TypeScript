//PACKAGES
import express from "express"
const app = express();
import  router from './src/Routes/index.route'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'



//IMPORTS
import database from './src/db'
app.use(cors());
app.use(express.json())


const PORT = process.env.PORT || 3000;

app.use('/api', router)




app.listen(PORT, ()=>{
    database()
    console.log(`server started on port: ${PORT}`);
})
