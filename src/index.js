const express=require('express')
const User = require('./models/user')
require('./db/mongoose')
const Task=require('./models/task')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express()
const port=process.env.PORT || 3000

// MIDDLEWARE FUNCTION
// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send('GET requsts are disabled')
//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Server inactive!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Server is on port '+port)
})



const main=async()=>{
    // const task=await Task.findById('6063318e54ae6343fc01d722')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user= await User.findById('606330144e1f9838e0565a1b')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()