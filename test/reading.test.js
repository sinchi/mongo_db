const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the db', () => {

    let ay, dr, mo, br = null;

    beforeEach((done) => {
        ay = new User({ name: 'Ayou' });     
        dr= new User({name: 'driss'});
        mo = new User({name: 'moaad'});
        br = new User({name: 'brahim'});
        Promise.all([
            ay.save(),
            dr.save(),
            mo.save(),
            br.save()
        ])           
        .then( () => done());


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

    it('can skip and limit the result set', (done) => {
        User.find({}).skip(1).limit(2).sort({ name: 1 })
        .then(users => {                        
            assert(users.length === 2);
            assert(users[0].name === 'brahim');
            assert(users[1].name === 'driss'); 
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
