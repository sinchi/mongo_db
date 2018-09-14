const mongoose =require('mongoose');
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title should be defined']
    }
});


module.exports = PostSchema;