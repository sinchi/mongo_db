const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
before((done) => {    
    mongoose.connect('mongodb://localhost:27017/udemy_mongo', { useNewUrlParser: true });
    mongoose.connection
    .once('open', _ => done())
    .on('error', err => console.warn('Error: ', err));
});

beforeEach( done => mongoose.connection.collections.users.drop(() => {    
    done();
}));


