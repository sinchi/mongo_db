const User = require('../src/user');
const assert = require('assert');

describe('Creating records', _ => {
    it('Should create user into DB', (done) => {
      const user = new User({name: 'BELGHAR'});
      user.save()
      .then( _ => {
        assert(!user.isNew);
        done();
      })
    });    
});