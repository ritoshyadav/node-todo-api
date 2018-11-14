require('./config/config');
const _= require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var {authenticate} = require('./middleware/authenticate')


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',authenticate,(req, res) =>{
var todocreate= new Todo({
    text: req.body.text,
    _creator: req.user._id
}) ;
todocreate.save().then((doc) => {
    res.send(doc);
},(e) =>{
    res.status(400).send(e);
});
});

app.get('/todos', authenticate, (req, res) =>{
    Todo.find({
        _creator:req.user._id
    }).then((todos) =>{
        res.send({todos}); 
    },(e) =>{
        res.Status(400).send(e);
    });
});

// GET /todos/1243
app.get('/todos/:id', authenticate, (req, res) =>{
    var id= req.params.id;
    console.log(id)

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findOne({
        _id:id,
        _creator: req.user._id
    }).then((todo)=>{
        if(!todo){
           return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
}); 


app.delete('/todos/:id', authenticate, (req, res) =>{
    var id = req.params.id;
    console.log(id)
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove({
        _id:id,
        _creator:user._id
    }).then((todo)=>{
        if(!todo){
           return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});


app.patch('/todos/:id', authenticate, (req, res) => {

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
    Todo.findOneAndUpdate({_id:id,_creator:req.user._id}, {$set: body},{new: true}).then((todo) =>{
   // Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo) =>{

        console.log("============",todo)
        if(!todo){
            return res.status(404).send();
        }
            res.send({todo});
        }).catch((e) =>{
            res.status(400).send();
        })
    });



//POST  /USER
app.post('/user',(req, res) =>{
    var body= _.pick(req.body,['email','password']);
    var user = new User(body);
    
    user.save().then(() => {

//    console.log("==========Finish")
//    console.log(user.generateAuthToken())
    return user.generateAuthToken();
    //    res.send(user);
    }).then((token) => {
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});



app.get('/user/me', authenticate,  (req, res) =>{
    res.send(req.user);
});

app.post('/user/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    //res.send(body);

    console.log ("a========aj")
    User.findByCredentials(body.email, body.password).then((user) => {
     return user.generateAuthToken().then((token) =>{
        res.header('x-auth',token).send(user);
     })
        //res.send(user);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/user/me/token',authenticate,(req, res) =>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },() =>{
        res.status(400).send();
    });
});

app.listen(port,() =>{
    console.log(`Started on port ${port}`);
});

module.exports ={app};



