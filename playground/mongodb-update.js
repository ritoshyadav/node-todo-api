const {MongoClient, ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017', (err, cleint) => {
    var db=cleint.db('TodoApps');
    if(err) {
        return console.log('Unable to connect mongoDB Sever');
    }
    console.log('Connected to MongoDB server');
    


// // findOneAndUpdate
// db.collection('Todos').findOneAndDelete({
//     _id: new ObjectID('5be455673b5f532604c74299')
//  }, {
//      $set: {
//          completed: true
//         }
//     }, {
//          returnOriginal: false
//      }).then((result) =>{
//     console.log(result);
// })  ;

// // findOneAndUpdate
// db.collection('Todos').findOneAndDelete({
//     _id: new ObjectID('5be455673b5f532604c74299')
//  }, {
//      $set: {
//          Name: 'Ritosh'
//         }, 
//         $inc: {
//             age:1
//         }
//     }, {
//          returnOriginal: false
//      }).then((result) =>{
//     console.log(result);
// })  ;


 


});