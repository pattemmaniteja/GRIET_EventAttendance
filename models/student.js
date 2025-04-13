const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
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
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = {
    Student
};