require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection (use env variable for production)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB connection error:", err));


// const mongoose = require("mongoose");
// main()
//     .then(() =>{
//         console.log("connection successful");
//     })
//     .catch((err) =>{
//         console.log(err);
//     })
// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/griet");
// }

// ____________________________________________________________________________________________________________________________________________________

//session management
const session = require("express-session");
app.use(session({
    secret:"security",
    resave: false,
    saveUninitialized: false
}));

// importing the collections from db
const {Faculty , Club} = require("./models/user.js");
const {Student} = require("./models/student.js");
const {Participant} = require("./models/participant.js");
const {Event} = require("./models/event.js");

//for parsing data
app.use(express.urlencoded({ extended: true })); // handles form POST data
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
    if (!req.session.userId) {
        return res.redirect("/");
    }
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
            req.session.userId = faculty._id;
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
    if (!req.session.userId) {
        return res.redirect("/");
    }
    res.render('faculty2', { data: [] });
});

app.post('/get-data', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/");
    }
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
    if (!req.session.clubId) {
        return res.redirect("/");
    }
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
    if (!req.session.clubId) {
        return res.redirect("/");
    }
    const { eventName, clubName, eventType, description}= req.body;
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
    if (!req.session.clubId) {
        return res.redirect("/");
    }
    res.render('club2');
});

app.post('/add-data',async (req,res) =>{
    if (!req.session.clubId) {
        return res.redirect("/");
    }
    const {regInput} = req.body;
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

app.get('/add-permission',(req,res) => {
    if (!req.session.clubId) {
        return res.redirect("/");
    }
    res.render('add-permission');
});

const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/addscript', upload.single('eventFile'), async (req,res) =>{
    const {description} = req.body;

    try{
    const fileData = fs.readFileSync(req.file.path);
    const admin = await Club.findById(req.session.clubId);
    const clubName = admin.mail.split("@")[0];
    const data = await Event.findOne({clubname:clubName});

    data.permission = description;
    data.file ={
        data:fileData,
        contentType: req.file.mimetype,
        originalName: req.file.originalname
    };
    fs.unlinkSync(req.file.path);
    await data.save();
    res.json({success:true});
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Update failed" });
      }
});

app.get('/get-permission',async (req, res) =>{
    if (!req.session.userId) {
        return res.redirect("/");
    }
    try{
        const permissions = await Event.find({},'file permission');
        res.render('get-permission',{permissions});
    }catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/terms',(req,res) =>{
    res.render('terms');
});

app.get('/contact',(req,res) =>{
    res.render('contact');
});

app.get('/logout',(req,res) =>{
    req.session.destroy((err)=>{
        res.redirect("/");
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
