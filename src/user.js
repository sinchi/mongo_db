const mongoose = require('mongoose');
const PostSchema = require('../src/post');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'The name should be longer than 2 characters'
        },
        required: [true, 'Name is required.']
    },    
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPosts'
    }]
});

UserSchema.virtual('postCount').get(function(){
    return this.posts.length;
});

UserSchema.pre('remove', function(next) {
    const BlogPosts = mongoose.model('blogPosts');
    BlogPosts.remove({_id: { $in: this.blogPosts }})
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);
module.exports = User;