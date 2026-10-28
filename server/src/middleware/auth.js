import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req,res,next){try{const header=req.headers.authorization;if(!header?.startsWith('Bearer '))return res.status(401).json({message:'Authentication required'});const payload=jwt.verify(header.slice(7),process.env.JWT_SECRET);const user=await User.findById(payload.id);if(!user||!user.isActive)return res.status(401).json({message:'Account not available'});req.user=user;next();}catch{return res.status(401).json({message:'Invalid or expired token'});}}
export const allowRoles=(...roles)=>(req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({message:'You do not have permission to perform this action'});
