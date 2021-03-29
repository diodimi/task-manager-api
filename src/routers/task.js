const express=require('express')
const Task=require('../models/task')
const router = new express.Router()


router.get('/tasks',async (req,res)=>{

    try{
        const tasks=await Task.find({})
        res.send(tasks)

    }catch(e){
        res.status(500).send(e)
    }


})

router.get('/tasks/:id',async (req,res)=>{
    
    try{
        const task = await Task.findById(req.params.id)
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }

})

router.post('/tasks',async (req,res)=>{
    const task =new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }

})

router.patch('/tasks/:id', async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdatesValues=['completed','description']
    const isValidOperation=updates.every((update)=>{
        return allowedUpdatesValues.includes(update)
    })
    
    if(!isValidOperation){
        return res.status(400).send({'error':'Invalid Updates'})

    }

    try{
        // const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        const task= await Task.findById(req.params.id)
        updates.forEach((update)=> task[update]=req.body[update])

        await task.save()
            
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id',async (req,res)=>{
    try{
        const task= await Task.findByIdAndDelete(req.params.id)

        if(!task){
            res.status(404).send()
        }
    
        res.send(task)
    
    }catch(e){
        res.status(500).send()
    }
})

module.exports=router