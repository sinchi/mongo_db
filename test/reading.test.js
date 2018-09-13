const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the db', () => {

    let ay = null;

    beforeEach((done) => {
        ay = new User({ name: 'Ayou' });
        ay.save()
        .then( newUser => {            
            done();        
        });
    });


    it('Should find all users from the db', (done) => {
        User.find({name: 'Ayou'})
        .then(users => {            
            assert(users[0]._id.toString() === ay._id.toString());
            done();
        });
    });

    it('Should find user with id', (done) => {                
        User.findOne({_id: ay._id})
        .then(user => {
            assert(ay._id.toString() === user._id.toString());            
            done();
        });
    }); 

});

// Authentication with GooglePlus (Passport)
// Handle payment with Stripe
// Architecture Of NodeJS
// Handle Cache with Redis
// CI with Travis
// Authentication With JWT / OAuth2.0 (GooglePlus/FaceBook)
// Testing With Mocha
