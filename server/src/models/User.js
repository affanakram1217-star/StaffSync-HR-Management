import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  password:{type:String,required:true,minlength:8,select:false}, role:{type:String,enum:['hr','manager','employee'],default:'employee'},
  department:{type:String,default:'General'}, jobTitle:{type:String,default:'Employee'}, phone:{type:String,default:''},
  avatarColor:{type:String,default:'#dbeafe'}, isActive:{type:Boolean,default:true}
},{timestamps:true});
userSchema.pre('save',async function(next){ if(!this.isModified('password')) return next(); this.password=await bcrypt.hash(this.password,12); next(); });
userSchema.methods.comparePassword=function(password){return bcrypt.compare(password,this.password);};
export default mongoose.model('User',userSchema);
