
const express = require('express');
const path = require('path');


const port = 8989;

// database
const db = require('./config/mongoose');

const Contact = require('./models/contact');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded());


app.use(express.static('assets'));


var contactList = [];

app.get('/', async function (req, res) {
    try {
        const contacts = await Contact.find({});
        return res.render('home', {
            title: "My Contact Lists",
            contact_list: contacts
        });
    } catch (err) {
        console.log("error in fetching contacts from db", err);
        return;
    }
});

app.post('/create-contact', async function (req, res) {
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });

        console.log('New contact created:', newContact);
        return res.redirect('/');
    } catch (err) {
        console.error('Error in creating contact:', err);
        return res.status(500).send('Error in creating a contact');
    }
});

app.get('/', async function (req, res) {
    try {
        const contacts = await Contact.find({});
        return res.render('home', {
            title: "My Contact Lists",
            contact_list: contacts
        });
    } catch (err) {
        console.log("error in fetching contacts from db", err);
        return res.status(500).send("Internal Server Error"); // Sending an error response
    }
});

// POST route to create a new contact
app.post('/create-contact', function (req, res) {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log("error in creating contact", err);
            return res.status(500).send("Internal Server Error"); // Sending an error response
        }
        return res.redirect('/');
    });
});


app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log("My Express is running on Port:", port);
});


app.get('/delete-contact/:phone', async function (req, res) {
    try {
        let phone = req.params.phone;

        await Contact.findOneAndDelete({ phone: phone });

        return res.redirect('/');
    } catch (err) {
        console.log("error in deleting contact", err);
        return res.status(500).send("Internal server error");
    }
});