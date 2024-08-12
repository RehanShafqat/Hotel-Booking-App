import mongoose from "mongoose"


const dbConnection  =async ()=> { 
   try {
     await mongoose.connect(process.env.MONGOURI as string)
   } catch (error) {
    console.log(error);
   }
}
export default dbConnection;