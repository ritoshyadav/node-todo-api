const {MongoClient, ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017', (err, cleint) => {
    var db=cleint.db('TodoApps');
    if(err) {
        return console.log('Unable to connect mongoDB Sever');
    }
    console.log('Connected to MongoDB server');
    
// // delete many
// db.collection('Todos').deleteMany({text: 'Something to do'}).then((result) =>{
//     console.log(result);
// })  ;

// // delete one
// db.collection('Todos').deleteOne({text: 'Something to do'}).then((result) =>{
//     console.log(result);
// })  ;

// // findOneAnddelete
// db.collection('Todos').findOneAndDelete({text: 'Something to do'}).then((result) =>{
//     console.log(result);
// })  ;


// // findOneAnddelete
// db.collection('Todos').findOneAndDelete({_id: new ObjectID('5be455673b5f532604c74299')
//  }).then((result) =>{
//     console.log(JSON.stringify(result, undefined, 2));
// })  ;

});