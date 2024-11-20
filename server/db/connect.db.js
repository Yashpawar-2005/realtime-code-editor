import mongoose from "mongoose";
    
const connectDB= async () => {
    try {
     
      const connection=  await mongoose.connect(`${process.env.MONGOURL}/${process.env.DB_NAME}`)
      console.log("database connected omg")
    } catch (error) {
        console.log("Mongoose Connection error",error)
        process.exit(1)
    }
}
export default connectDB

