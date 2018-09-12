const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost:27017/udemy_mongo', { useNewUrlParser: true });
    mongoose.connection
    .once('open', _ => {
        console.log('Open');
        done();
    })
    .on('error', err => console.warn('Error: ', err));
});

beforeEach( done => mongoose.connection.collections.users.drop(() => {
    done();
}) );


