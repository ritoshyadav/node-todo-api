
var mongoose =require('mongoose');

// const Schema = mongoose.Schema;

// const TodoSchema =new Schema({
var Todo = mongoose.model('todo',{
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    compeleted: {
      type: Boolean,
      default: false
    },
    compeletedAt: {
        type: Number,
        default: null
    }
});



module.exports = {Todo}