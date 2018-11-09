const _= require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req, res) =>{
var todocreate= new Todo({
    text: req.body.text
}) ;
todocreate.save().then((doc) => {
    res.send(doc);
},(e) =>{
    res.status(400).send(e);
});
});

app.get('/todos',(req, res) =>{
    Todo.find().then((todos) =>{
        res.send({todos}); 
    },(e) =>{
        res.Status(400).send(e);
    });
});

// GET /todos/1243
app.get('/todos/:id',(req, res) =>{
    var id= req.params.id;
    console.log(id)

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
           return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});


app.delete('/todos/:id',(req, res) =>{
    var id = req.params.id;
    console.log(id)
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
           return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});


app.patch('/todos/:id',(req, res) => {

    var id = req.params.id;

    var body=_.pick(req.body, ['text','compeleted']);
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    console.log("============BIF",body)
    console.log(_.isBoolean("ab"))
    console.log(body.compeleted)
    if(_.isBoolean(body.compeleted) && body.compeleted){
        body.compeletedAt= new Date().getTime();
    }else{
        body.compeleted=false;
        body.compeletedAt=null;
    }
    console.log("============B",body)
    Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo) =>{

        console.log("============",todo)
        if(!todo){
            return res.status(404).send();
        }
            res.send({todo});
        }).catch((e) =>{
            res.status(400).send();
        })
    });

app.listen(port,() =>{
    console.log(`Started on port ${port}`);
});

module.exports ={app};
