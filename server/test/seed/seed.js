const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId =new ObjectID();
const userTwoId =new ObjectID();

const users =[{
    _id: new ObjectID(),
    email: 'ritoshy@gamil.com',
    password: 'ritosh123!',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId.toHexString(),access: 'auth'}, 'abc123').toString()
    }]
},
    {
        _id: new ObjectID(),
    email: 'ritosh2011@gamil.com',
    password: 'ritosh12345!',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId.toHexString(),access: 'auth'}, 'abc123').toString()
    }]
    
}] 

const todos=[{
    _id : new ObjectID(),
    text:'First test todo'
},{
    _id : new ObjectID(),
    text:'Second test todo',
    compeleted:true,
    compeletedAt:333
}];

const populateTodos = (done) =>{
    Todo.remove({}).then(() =>{
        return Todo.insertMany(todos);
    }) .then(() => done());
};

const populateUsers = (done) =>{
    User.remove({}).then(() =>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo])
    }) .then(() => done());
};

module.exports={todos,populateTodos, users, populateUsers}; 