const assert = require('assert');
const User = require('../src/user');
const mongoose = require('mongoose');

describe('Deleting a user', () => {        
    let a;
    beforeEach((done) => {
        a = new User({name: 'Ayou'});
        a.save()
        .then(() => done());
    });

    it('model instance remove', (done) => {
        a.remove()
        .then(() => User.findOne({ name: 'Ayou' }))
        .then((user) => {
            assert(user === null);
            done();
        });        
    });

    it('class method remove', (done) => {        
        User.deleteOne({ name: 'Ayou' })
        .then(() => User.findOne({ name: 'Ayou' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    });

    it('class method findOneAndDelete', (done) => {
        User.findOneAndDelete({ _id: a._id })
        .then(() => User.findOne({ name: 'Ayou' }))
        .then((user) => {
            assert(user === null);
            done();
        });        
    });

    it('class findByIdAndDelete', (done) => {
        User.findByIdAndDelete({ _id: a._id })
        .then(() => User.findOne({ name: 'Ayou' }))
        .then((user) => {
            assert(user === null);
            done();
        });        
    });
});