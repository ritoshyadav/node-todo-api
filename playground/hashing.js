const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



var password =' abc123!';

// bcrypt.genSalt(10, (err, slat) =>{
//     bcrypt.hash(password, slat, (err,hash) => {
//         console.log(hash);
//     });
// });


var hashPassword = '$2a$10$Xb2SvKnKq0LD6IDh3TbiqeV.4lSLZckLgtQ8sMaiYDkdAQooBqRri';

bcrypt.compare(password,hashPassword, (err, res) =>{
    console.log(res);
});

// // var data ={
//     id:10
// }

// var token = jwt.sign(data, 'abc123');
// console.log(token);


// var decoded =jwt.verify(token,'abc123');
// console.log('decoded',decoded);
// var message = 'i am user number 3';

// var hash = SHA256(message).toString();


// console.log(`message:${message}`);
// console.log(`Hash: ${hash}`);


// var data ={
//     id:4
// };

// var token ={
//     data,
//     hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// }



// var resultHash =SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resultHash === token.hash){
//     console.log('change');
// }else{
//     console.log('not change');
// }