require('../src/db/mongoose')
const Task=require('../src/models/task')

const deleteTaskAndCount= async(id)=>{
    const task = await Task.findByIdAndDelete('605c744d882b291fb0f51ff8')
    const count =await Task.countDocuments({completed:false})

    return count
}

deleteTaskAndCount('605c744d882b291fb0f51ff8').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})