import mongoose from 'mongoose';
import { DB_Name } from '../constants.js';

const database = async () =>{
   try{

    const connectionDb =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
    console.log(`\n connection successfully coonected DB:HOST= ${connectionDb.connection.host}`)

 } catch(error){

    console.log(`database connection error at: ${error}`)

 }
}

export default database;
