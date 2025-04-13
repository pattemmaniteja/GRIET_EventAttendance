const mongoose = require("mongoose");
const participantSchema = new mongoose.Schema({
    rollno: {
        type: String
    },
    name: {
        type: String
    },
    year: {
        type:Number
    },
    branch: {
        type: String
    },
    section: {
        type: String
    },
    event: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400  // 24 hours in seconds
    }
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = {
    Participant
};