import {Router} from 'express';import Announcement from '../models/Announcement.js';import {protect,allowRoles} from '../middleware/auth.js';
const router=Router();router.use(protect);
router.get('/',async(req,res,next)=>{try{const announcements=await Announcement.find({$or:[{audience:'all'},{audience:req.user.role}]}).populate('author','name role').sort({createdAt:-1}).limit(100);res.json({announcements});}catch(e){next(e);}});
router.post('/',allowRoles('hr'),async(req,res,next)=>{try{const {title,body,audience='all'}=req.body;if(!title?.trim()||!body?.trim())return res.status(400).json({message:'Title and message are required'});const announcement=await Announcement.create({title,body,audience,author:req.user._id});await announcement.populate('author','name role');res.status(201).json({announcement});}catch(e){next(e);}});
router.delete('/:id',allowRoles('hr'),async(req,res,next)=>{try{const a=await Announcement.findByIdAndDelete(req.params.id);if(!a)return res.status(404).json({message:'Announcement not found'});res.json({message:'Announcement deleted'});}catch(e){next(e);}});
export default router;
