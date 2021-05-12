const express=require('express')
const sharp = require('sharp')
const multer=require('multer')
const User=require('../models/user')
const auth=require('../middleware/auth')
const {sendWelcomeEmail,sendCancelEmail}=require('../emails/account')
const router = new express.Router()



router.post('/users',async (req,res)=>{
    const user= new User(req.body)

    try{
        await user.save()
        // Sending welcome email
        sendWelcomeEmail(user.email,user.name)
        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e.message)
    }

})

router.post('/users/login',async(req,res)=>{
    try{
        const user= await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})


router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    limits:{
        // Image sizelimit 1 MB
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        // Check file type
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a valid type file!'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar') ,async (req,res)=>{
    // Take the buffer, resize it, covert it to png
    const buffer = await sharp(req.file.buffer).resize({ width:250,height:250}).png().toBuffer()
    
    req.user.avatar= buffer
    await req.user.save()
    res.send()
    
},(error,req,res,next)=>{
    // The message we send in case we catch error
    res.status(400).send({error:error.message})
})

router.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user= await User.findById(req.params.id)
        
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)

})

router.patch('/users/me',auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const idValidOperation= updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!idValidOperation){
        return res.status(400).send({'error':'Invalid Updates'})
    }

    try{
        const user=await req.user

        updates.forEach((update)=>user[update]=req.body[update])

        await user.save()

        // Option new returns new user and runVlidators runs the validations we have provided.
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth,async (req,res)=>{
    try{
        req.user.remove()
        sendCancelEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

module.exports=router