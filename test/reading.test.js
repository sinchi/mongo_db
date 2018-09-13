const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the db', () => {

    let ay = null;

    beforeEach((done) => {
        ay = new User({ name: 'Ayou' });
        ay.save()
        .then( newUser => {
            console.log('Create New User ', newUser);    
            done();        
        });
    });

    it('Should find user with id', (done) => {        
        User.find({name: 'Ayou'})
        .then( users => {
            console.log('USERS', users);
            assert(users[0]._id.toString() === ay._id.toString());
            done();
        })         
    }); 

});

// Authentication with GooglePlus (Passport)
// Handle payment with Stripe
// Architecture Of NodeJS
// Handle Cache with Redis
// CI with Travis
// Authentication With JWT / OAuth2.0 (GooglePlus/FaceBook)
// Testing With Mocha
