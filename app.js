const express = require('express');
const app = express();
const port = 3000;

// importing the collections from db
const {Faculty , Club} = require("./models/user.js");
const {Student} = require("./models/student.js");
const {Participant} = require("./models/participant.js");
const {Event} = require("./models/event.js");

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

app.get('/faculty1', async(req,res) =>{
    try{
    const events = await Event.find();
    res.render('faculty1',{events});
    }catch (error) {
        res.status(500).send('Server error');
    }
});

app.post('/faculty1', async (req, res) => {
    const {facultyUsername, facultyPassword} = req.body;
    try{
        const faculty = await Faculty.findOne({ mail: facultyUsername, password: facultyPassword });

        if (faculty) {
            const events = await Event.find();
            res.render('faculty1',{events});
        } else {
            res.send('<script>alert("Invalid Faculty credentials"); window.location.href="/";</script>');

        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/faculty2', (req, res) => {
    res.render('faculty2', { data: [] });
});

app.post('/get-data', async (req, res) => {
  const { year, branch, section } = req.body;
  try {
    const data = await Participant.find({
      year: parseInt(year),  
      branch: branch,
      section: section
    });
    res.render('faculty2',{data});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get('/club1',(req,res) =>{
    res.render('club1');
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

app.post('/add-event' , async (req,res)=>{
    const { eventName, clubName, eventType, description}= req.body;
    console.log(eventName);
    try{
        const newEvent = new Event({
            eventname:eventName,
            clubname:clubName,
            eventType:eventType,
            description:description
        });
        await newEvent.save();
        res.json({ success: true });
    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/club2', (req, res) => {
    res.render('club2');
});

app.post('/add-data',async (req,res) =>{
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
