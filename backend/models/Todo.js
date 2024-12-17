const mongoose=require('mongoose')

const TodoSchema=mongoose.Schema({
    date:{
        type:String,
        rquired:true
    },
    todo:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Todo',TodoSchema)