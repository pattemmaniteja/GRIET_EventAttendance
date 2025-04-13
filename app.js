const express = require('express');
const app = express();
const port = 3000;

// importing the collections from db
const {Faculty , Club} = require("./models/user.js");
const {Student} = require("./models/student.js");
const {Participant} = require("./models/participant.js");

const mongoose = require("mongoose");
main()
    .then(() =>{
        console.log("connection successful");
    })
    .catch((err) =>{
        console.log(err);
    })
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/griet");
}

//session management
const session = require("express-session");
app.use(session({
    secret:"security",
    resave: false,
    saveUninitialized: false
}));



//for parsing data
app.use(express.urlencoded({ extended: true })); // handles form POST data
app.use(express.static('public'));
app.use(express.json()); // <-- this is important for JSON body parsing

// Set EJS as templating engine
const path = require("path");
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Serve static files from "public" folder
app.use(express.static('public'));

// Route
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/faculty1', async (req, res) => {
    const {facultyUsername, facultyPassword} = req.body;
    try{
        const faculty = await Faculty.findOne({ mail: facultyUsername, password: facultyPassword });

        if (faculty) {
            res.render('faculty1');
        } else {
            res.send('<script>alert("Invalid Faculty credentials"); window.location.href="/";</script>');

        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/faculty2', (req, res) => {
    res.render('faculty2');
});

app.post('/club1', async (req, res) => {
    const {clubUsername, clubPassword} = req.body;
    try{
        const club = await Club.findOne({ mail: clubUsername, password: clubPassword });

        if (club) {
            req.session.clubId=club._id;
            res.render('club1');
        } else {
            res.send('<script>alert("Invalid Club credentials"); window.location.href="/";</script>');

        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/club2', (req, res) => {
    res.render('club2');
});

app.post('/add',async (req,res) =>{
    const {regInput} = req.body;
    console.log(regInput);
    try{
        const data = await Student.findOne({rollno: regInput});
        if (!data) {
            return res.json({ success: false, message: "Student not found" });
        }
        const admin = await Club.findById(req.session.clubId);
        const clubName = admin.mail.split("@")[0];
        const newParticipant = new Participant(
        {
            rollno:data.rollno,
            name: data.name,
            year: data.year,
            branch: data.branch,
            section: data.section,
            event: clubName
        });
        await newParticipant.save();
        res.json({ success: true }); // success response
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
