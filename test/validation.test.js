const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {

    it('requires a user name', () => {
        const user = new User({
            name: ''
        });

        const validationResult = user.validateSync();        
        const { message } = validationResult.errors.name;
        assert(message ===  'Name is required.');
    });

    it('name should be longer than 2', () => {
        const user = new User({
            name: 'a'            
        });      
        
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message ===  'The name should be longer than 2 characters');
    });

});