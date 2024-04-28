// import { Promise } from "mongoose";
import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const { id: reciverId } = req.params;

    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage?._id);
    }

    Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: `Inter Server Error : ${error.message}` });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { id: userTochatId } = req.params;

    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userTochatId] },
    }).populate("message");

    if (!conversation) {
      res.status(200).json([]);
    }

    res.status(200).json(conversation.message);
  } catch (error) {
    res.status(500).json({ error: `Inter Server Error : ${error.message}` });
  }
};
