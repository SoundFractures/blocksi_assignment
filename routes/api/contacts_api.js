const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middleware/auth');

const Contact = require('../../models/Contact');

//Get all Contacts
router.get('/', authMiddleware, (req, res) => {
    Contact.find({
            user_id: req.user.id
        })
        .then(contacts => res.json(contacts))
        .catch(error => res.status(404).json({
            response: "Contacts couldn't be collected."
        }))
});

router.get('/:id', authMiddleware, (req, res) => {
    Contact.find({
            _id: req.params.id
        })
        .then(contacts => res.json(contacts))
        .catch(error => res.status(404).json({
            response: "Contact couldn't be collected."
        }))
});
//Create Contact
router.post('/', authMiddleware, async (req, res) => {
    const contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        user_id: req.user.id
    });
    await contact.save()
        .then(contact => res.json(contact)).catch(error => res.json({
            response: "Contact couldn't be created"
        }));

});

//Update Contact
router.put('/:id', authMiddleware, async (req, res) => {
    const contact = await Contact.findById(req.params.id)
        .catch(error => res.status(404).json({
            response: "Contact of that ID not found."
        }));
    contact.firstName = req.body.firstName;
    contact.lastName = req.body.lastName;
    contact.phoneNumber = req.body.phoneNumber;
    await contact.save().then(contact => res.json(contact))
        .catch(error => res.json({
            response: "Contact couldn't be updated"
        }));

});

//Delete Contact
router.delete('/:id', authMiddleware, async (req, res) => {
    await Contact.findById(req.params.id)
        .then(contact => contact.remove()
            .then(() => res.json({
                response: "Contact deleted successfully."
            })))
        .catch(error => res.status(404).json({
            response: "Contact of that ID not found."
        }));
});



module.exports = router;