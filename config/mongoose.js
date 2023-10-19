const mongoose = require('mongoose');// importing mongoose module
mongoose.connect('mongodb://127.0.0.1/contact_list_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});// connecting mongodb to our database




const db = mongoose.connection; // this connection property give us the acess to the database other way we can say that this is our database we are going to use

// check if there is an error
db.on('error', console.error.bind(console, 'error in connect with database'));

//  up and running then print sucessfull message
db.once('open', function () {
    console.log('Successfully connected to the MongoDb');
});