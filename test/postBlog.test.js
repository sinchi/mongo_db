const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPosts = require('../src/blogposts');
const Comment = require('../src/comment');
const assert = require('assert');

describe('Associations', () => {
    let a, blogPost, comment;
    beforeEach((done) => {
        
        a = new User({
            name: 'ayoub'                   
        });
        blogPost = new BlogPosts({
            title: 'JS is great',
            content: 'JS is awsome'
        });
        comment = new Comment({ content: 'First comment'});

        a.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = a;

        Promise.all([
            a.save(),
            blogPost.save(),
            comment.save()
        ]).then(() => {
            done();
        });
    });

    it('save a relation between a user and blogposts', (done) => {
        User.findOne({ name: 'ayoub' })
        .populate('blogPosts')
        .then((ayoub) => {
            assert(ayoub.blogPosts[0].title === 'JS is great');
            done();
        })
    });

    it('saves full relation graph', (done) => {
        User.findOne({ name: 'ayoub' })
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }              
            }
        })
        .then(user => {
            assert(user.name === 'ayoub');
            assert(user.blogPosts[0].title === 'JS is great');
            assert(user.blogPosts[0].comments[0].content === 'First comment');
            assert(user.blogPosts[0].comments[0].user.name === 'ayoub');            
            done();
        });
    });
});