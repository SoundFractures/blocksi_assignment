const express = require('express');
const router = express.Router();


const Contact = require('../../models/Contact');

//Get all Contacts
router.get('/', async (req, res) => {
    await Contact.find()
        .then(contacts => res.json(contacts))
        .catch(error => res.status(404).json({
            status: "User does not exsist."
        }))
});

//Create Contact
router.post('/', async (req, res) => {
    const contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        user_id: req.body.user_id
    });
    await contact.save()
        .then(contact => res.json(contact));

});

//Update Contact
router.put('/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id)
        .catch(error => res.status(404).json({
            status: "Contact of that ID not found."
        }));
    contact.firstName = req.body.firstName;
    contact.lastName = req.body.lastName;
    contact.phoneNumber = req.body.phoneNumber;
    await contact.save().then(contact => res.json(contact))
        .catch(error => res.json(error));

});

//Delete Contact
router.delete('/:id', async (req, res) => {
    await Contact.findById(req.params.id)
        .then(contact => contact.remove()
            .then(() => res.json({
                status: "Contact deleted successfully."
            })))
        .catch(error => res.status(404).json({
            status: "Contact of that ID not found."
        }));
});



module.exports = router;