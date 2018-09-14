const assert = require('assert');
const User = require('../src/user');
const BlogPosts = require('../src/blogposts');

describe('Test MiddleWare', () => {

    let a, blogPost, comment;
    beforeEach((done) => {
        
        a = new User({
            name: 'ayoub'                   
        });
        blogPost = new BlogPosts({
            title: 'JS is great',
            content: 'JS is awsome'
        });        

        a.blogPosts.push(blogPost);       

        Promise.all([
            a.save(),
            blogPost.save()
        ]).then(() => {
            done();
        });
    });

    it('users clean up dangling blogposts on remove', (done) => {
        a.remove()        
        .then(() => BlogPosts.count())
        .then(count => {
            assert(count === 0);
            done();
        });
    });
});