const events_model = require("../model/models/events_model.js");

const getAllEvents = async (req, res) => {
  try {
    const events = await events_model.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const indicateInterest = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await events_model.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.interestCount += 1;
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const indicateDisinterest = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await events_model.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.uninterestedCount += 1;
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  indicateDisinterest,
  indicateInterest,
  getAllEvents
};
