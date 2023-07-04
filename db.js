import mongoose from "mongoose";


const connectDB = async ()=>{
    console.log('process.env.MONGODB_URI_LOCAL', process.env.MONGODB_URI_LOCAL)
    await mongoose.connect(process.env.MONGODB_URI_LOCAL)
    console.log('after connect');
}

mongoose.connection.once('connected', ()=>{
    console.log('mongodb is connected');
})

mongoose.connection.on('error', ()=>{
    console.log('mongodb is not connected');
})

mongoose.set('toJSON', {
    virtuals:true,
    transform:(doc, converted)=>{
        delete converted._id;
    }
})

export default connectDB;