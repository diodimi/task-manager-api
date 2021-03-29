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

