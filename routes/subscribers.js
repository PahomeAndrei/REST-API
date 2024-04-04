const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

//Getting All
router.get('/', async (req, res) => {
   try {
     const subscribers = await Subscriber.find();
     res.json(subscribers);
   } catch (err) {
    res.status(500).json({ message: err.message });
   }
});

//Getting One
router.get('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
        res.json(subscriber);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Creating One
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Updating One 
router.patch('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
        if (req.body.name != null) {
            subscriber.name = req.body.name;
        }
        if (req.body.subscribedToChannel != null) {
            subscriber.subscribedToChannel = req.body.subscribedToChannel;
        }
        const updatedSubscriber = await subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Deleting One 
router.delete('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
        await subscriber.remove();
        res.json({ message: 'Deleted Subscriber' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware pentru a găsi un abonat după id
async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
    } catch (err) {
        return next(err);
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router;
