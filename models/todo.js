
var mongoose =require('mongoose');

var Todo = mongoose.model('Todo', {
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