const {MongoClient, ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017', (err, cleint) => {
    var db=cleint.db('TodoApps');
    if(err) {
        return console.log('Unable to connect mongoDB Sever');
    }
    console.log('Connected to MongoDB server');
    
// db.collection('Todos').find({
// //    completed:'true'
// _id: new ObjectID('5be455673b5f532604c74299')
// }).toArray().then((docs) =>{
// console.log('Todos');
// console.log(JSON.stringify(docs, undefined, 2));
// }, (err) =>{
//     console.log('Unable to Fetch Todos', err);
// });

// db.collection('Todos').find().count().then((count) =>{
//     console.log(`Todos Count ${count}`);   
//     }, (err) =>{
//         console.log('Unable to Fetch Todos', err);
//     });


   // db.close();
}); 