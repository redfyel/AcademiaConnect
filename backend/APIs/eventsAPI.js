const express = require('express');
const router = express.Router();
//const Event = require('../models/Event'); // Mongoose model

// GET all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new event (Admin use case)
router.post('/events', async (req, res) => {
  const { title, description, start, end, conductedBy, location, registrationLink } = req.body;

  const newEvent = new Event({
    title,
    description,
    start,
    end,
    conductedBy,
    location,
    registrationLink,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update an event
router.put('/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an event
router.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
