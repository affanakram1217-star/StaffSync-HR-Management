import mongoose from 'mongoose';
const attendanceSchema=new mongoose.Schema({employee:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},date:{type:String,required:true},checkIn:{type:Date,default:Date.now},checkOut:{type:Date},status:{type:String,enum:['present','late','absent'],default:'present'}},{timestamps:true});
attendanceSchema.index({employee:1,date:1},{unique:true});
export default mongoose.model('Attendance',attendanceSchema);
