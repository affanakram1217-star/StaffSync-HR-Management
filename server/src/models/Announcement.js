import mongoose from 'mongoose';
const schema=new mongoose.Schema({title:{type:String,required:true,trim:true,maxlength:160},body:{type:String,required:true,trim:true,maxlength:4000},author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},audience:{type:String,enum:['all','hr','manager','employee'],default:'all'}},{timestamps:true});
export default mongoose.model('Announcement',schema);
