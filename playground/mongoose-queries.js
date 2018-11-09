

const {mongoose} =require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
// var id ='5be5317221545c3bc72152df';

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id Not found');
//     }
//        console.log('Todo', todo);
// });

// //playground/mongoose-queries.js

User.findById('5be53973bd67261b440a60c9').then((user) =>{
    if(!user){
        return console.log('unable to find User');
    }
    console.log(JSON.stringify, undefined, 2);
},(e)=>{
    console.log(e);
});
 