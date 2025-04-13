const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    mail:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

const Faculty = mongoose.model("Faculty", userSchema);
const Club = mongoose.model("Club", userSchema);

module.exports = {
    Faculty,
    Club
};








