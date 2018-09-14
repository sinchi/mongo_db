const assert = require('assert');
const User = require('../src/user');

describe('Subdocument Test', () => {
    it('should create new subdocument post', (done) => {
        const user = new User({
            name: 'Ayoub',
            posts: [{title: 'First Post'}]
        });

        user.save()
        .then(() => User.findOne({name: 'Ayoub'}))
        .then(_user => {
            assert(_user.posts[0].title === 'First Post');
            done();
        });
    });

    it('should add subdocument post', (done) => {
        const user = new User({
            name: 'Ayoub',
            posts: [{title: 'Post Title'}]
        });

        user.save()
        .then(() => User.findOne({ name: 'Ayoub' }))
        .then( _user => {
            _user.posts.push({title: 'Pushed Post Title'});            
            _user.save()
            .then(() => User.findOne({ name: 'Ayoub' }))
            .then(__user => {                
                assert(__user.posts[1].title === 'Pushed Post Title');
                done();
            });
        });
    });


    it('should remove post from user', (done) => {
        const user = new User({
            name: 'Ayoub',
            posts: [{ title: 'Remove this post' }]
        });

        user.save()
        .then(() => User.findOne({ name: 'Ayoub' }))
        .then(_user => {            
            _user.posts[0].remove();
            _user.save()
            .then(() => User.findOne({ name: 'Ayoub' }))
            .then(__user => {
                assert(__user.posts.length === 0);
                done();
            });
        });
    });

    it('should post title be required', () => {
        const user = new User({
            name: 'ayoub',
            posts: [{ title: '' }]
        });

        const validationResult = user.validateSync();
        const { message } = validationResult.errors['posts.0.title'];
        
        assert(message === 'The title should be defined');
    });

    it('should increment the postCount of (posts)', (done) => {
        const user = new User({
            name: 'ayoub',
            posts: [{ title: 'Post Title' }]
        });

        user.save()
        .then(() => User.findOne({ name: 'ayoub' }))
        .then(_user => {
            _user.posts.push({ title: 'second post' });
            _user.save()
            .then(() => User.findOne({ name: 'ayoub' }))
            .then(__user => {
                assert(__user.postCount === 2);
                done();
            });
        });
    });
});