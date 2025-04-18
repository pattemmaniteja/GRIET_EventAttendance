const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    eventname: {
        type: String
    },
    clubname: {
        type: String
    },
    eventtype: {
        type:String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400  // 24 hours in seconds
    },
    permission: {
        type:String
    },
    file: {
        data: Buffer,
        contentType: String,
        originalName: String
      }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = {
    Event
};