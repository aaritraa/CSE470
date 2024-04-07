
const mongoose = require('mongoose');
const messages_model = require("../model/models/messages_model.js");


const sendMessage = async (req, res) => {
  const { fromEmail, fromName, toEmail, toName, content } = req.body;

  try {
    const message = new messages_model({
      fromEmail: fromEmail,
      toEmail: toEmail,
      toName: toName,
      fromName: fromName,
      content: content
    });
    console.log(message)

    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

// const getSenders = async (req, res) => {
//   const { email } = req.params;

//   try {
//     const senders = await messages_model.find({ toEmail: email }).distinct('fromName');
//     res.json(senders);
//   } catch (error) {
//     console.error('Error fetching senders:', error);
//     res.status(500).json({ message: 'Error fetching senders' });
//   }
// };

const getSenders = async (req, res) => {
  const { email } = req.params;

  try {
    const senders = await messages_model.aggregate([
      { $match: { toEmail: email } },
      { $group: { _id: { fromEmail: '$fromEmail', fromName: '$fromName' } } }
    ]);
    res.json(senders);
  } catch (error) {
    console.error('Error fetching senders:', error);
    res.status(500).json({ message: 'Error fetching senders' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { userEmail, selectedSender } = req.params;
    const messagesSent = await messages_model.find({ fromEmail: selectedSender, toEmail: userEmail });
    const messagesReceived = await messages_model.find({ fromEmail: userEmail, toEmail: selectedSender });
    const messages = [...messagesSent, ...messagesReceived];
    console.log(messages);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

module.exports = {
    sendMessage,
    getSenders,
    getMessages
  };