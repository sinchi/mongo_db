const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const BlogPostModel = mongoose.model('blogPosts', BlogPostSchema);
module.exports = BlogPostModel;