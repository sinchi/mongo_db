const assert = require('assert');
const User = require('../src/user');

describe('Updating user ', () => {
    let a;

    beforeEach((done) => {
        a = new User({ name: 'Ayou', postCount: 0 });
        a.save()
        .then((newUser) => {            
            done();
        });
    });

    it('instance type using set and save', (done) => {
        a.set('name', 'Ayoub');        
        assertName(a.save(), done);
    });

    it('Class Model can update', (done) => {
        assertName(User.updateOne({ name: 'Ayou' }, {name: 'Ayoub'}), done);        
    });

    it('A Class can update one record instance update', (done) => {
        assertName(User.findOneAndUpdate({name: 'Ayou'}, { name: 'Ayoub' }), done)
    });

    it('Model class can find record with an Id and Update', (done) => {
        assertName(User.findByIdAndUpdate(a._id, {name: 'Ayoub'}), done);
    });

    it('A user can have their postcount incremented by 10', (done) => {
        User.update({name: 'Ayou'},{ $inc:  { postCount: 10 } })
        .then(() => User.findOne({ name: 'Ayou' }))
        .then(user => {            
            assert(user.postCount === 10);
            done();
        });
    });
});

function assertName(operation, done) {
    operation.then(() => User.find({}))
    .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Ayoub');        
        done();
    });
}