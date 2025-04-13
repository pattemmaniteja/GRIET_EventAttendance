const mongoose = require("mongoose");

// Create two models using the same schema but different collections {schema from user.js}
const { Faculty, Club } = require("./models/user");

// {schema from student.js}
const {Student} = require("./models/student");


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

let faculties =[
    {
        mail:"anuradha@griet.com",
        password:"anuradha12"
    },
    {
        mail:"sowjanya@griet.com",
        password:"sowjanya34"
    },
    {
        mail:"srikanth@griet.com",
        password:"srikanth56"
    },
    {
        mail:"anusha@griet.com",
        password:"anusha78"
    },
    {
        mail:"faculty@griet.com",
        password:"faculty90"
    }
];

let clubs = [
    {
        mail:"sdc@griet.com",
        password:"sdc12"
    },
    {
        mail:"csi@griet.com",
        password:"csi34"
    },
    {
        mail:"fsw@griet.com",
        password:"fsw56"
    },
    {
        mail:"aac@griet.com",
        password:"aac78"
    },
    {
        mail:"club@griet.com",
        password:"club90"
    }
];

let students = [
    { rollno: "23241A05D1", name: "ALLI TEJESWAR", year: 2, branch: "cse", section: "c" },
    { rollno: "23241A05D2", name: "AMARA VISHNU SARAN", year: 2, branch: "cse", section: "c" },
    { rollno: "23241A05D3", name: "AMULYA PELLURU", year: 2, branch: "cse", section: "c" },
    { rollno: "23241A05D4", name: "ARKALA ADITYA RAJ", year: 2, branch: "cse", section: "c" },
    { rollno: "23241A05D5", name: "AVASARALA KRISHNA SATHVIK", year: 2, branch: "cse", section: "c" },
    { rollno: "23241A05D6", name: "AYUSHMAN RAJA LINGAMPALLY", year: 2, branch: "cse", section: "c" },
    { rollno: "23241A05D7", name: "BADRI SREEYA", year: 2, branch: "cse", section: "c" },
    { rollno: "23241A05D8", name: "BAIRI GEETANJALI", year: 2, branch: "cse", section: "c" },
    { rollno: "23241A05D9", name: "BANDA RENITH REDDY", year: 2, branch: "cse", section: "c" },
    { rollno: "23241A05E0", name: "BANOTH SRAVANTHI", year: 2, branch: "cse", section: "c" },

    { rollno: "23241A05E1", name: "BOMMIDI KARTHIK", year: 2, branch: "cse", section: "d" },
    { rollno: "23241A05E2", name: "BONGONDA MAHESH", year: 2, branch: "cse", section: "d" },
    { rollno: "23241A05E3", name: "BOYA PAVAN KUMAR", year: 2, branch: "cse", section: "d" },
    { rollno: "23241A05E4", name: "CHELUMALLA GOUTHAM", year: 2, branch: "cse", section: "d" },
    { rollno: "23241A05E5", name: "CHIKATLA POORNACHANDRA", year: 2, branch: "cse", section: "d" },
    { rollno: "23241A05E6", name: "CHIKOTI PRANAV KUMAR", year: 2, branch: "cse", section: "d" },
    { rollno: "23241A05E7", name: "CHIRUMALLA SAI ADHVYTH", year: 2, branch: "cse", section: "d" },
    { rollno: "23241A05E8", name: "ETTADI SRIJA", year: 2, branch: "cse", section: "d" },
    { rollno: "23241A05E9", name: "ERAGHADINLA VAMSHI KRISHNA", year: 2, branch: "cse", section: "d" },
    { rollno: "23241A05F0", name: "GANAPAVARAPU PAVAN SAI TEJA", year: 2, branch: "cse", section: "d" },

    { rollno: "23241A05F1", name: "GANGAVARAM JAHANAVI REDDY", year: 2, branch: "it", section: "a" },
    { rollno: "23241A05F2", name: "GAVVALA KEERTHI", year: 2, branch: "it", section: "a" },
    { rollno: "23241A05F3", name: "GOLI SUHANI", year: 2, branch: "it", section: "a" },
    { rollno: "23241A05F4", name: "GUNDLA HEMANTH REDDY", year: 2, branch: "it", section: "a" },
    { rollno: "23241A05F5", name: "JANGILI BHARATH KUMAR", year: 2, branch: "it", section: "a" },
    { rollno: "23241A05F6", name: "KAMANI USHASRI", year: 2, branch: "it", section: "a" },
    { rollno: "23241A05F7", name: "KANDUKURI SAI BHAVANI SUMEDHA", year: 2, branch: "it", section: "a" },
    { rollno: "23241A05F8", name: "KANUMILLI GEETHA AKSHAYA", year: 2, branch: "it", section: "a" },
    { rollno: "23241A05F9", name: "KARUMANCHI SWEJITH", year: 2, branch: "it", section: "a" },
    { rollno: "23241A05G0", name: "KASARLA MANASVI REDDY", year: 2, branch: "it", section: "a" },

    { rollno: "23241A05G1", name: "KATTA SAI MANIDEEP", year: 2, branch: "it", section: "b" },
    { rollno: "23241A05G2", name: "KELLOTH ANAND NAIK", year: 2, branch: "it", section: "b" },
    { rollno: "23241A05G3", name: "KOMANDLA SAI PRANAV REDDY", year: 2, branch: "it", section: "b" },
    { rollno: "23241A05G4", name: "KOTHAKONDA NAGA SREE", year: 2, branch: "it", section: "b" },
    { rollno: "23241A05G5", name: "KUNDURU SATWIK REDDY", year: 2, branch: "it", section: "b" },
    { rollno: "23241A05G6", name: "LAVUDYA LAXMI", year: 2, branch: "it", section: "b" },
    { rollno: "23241A05G7", name: "LINGA ROHAN", year: 2, branch: "it", section: "b" },
    { rollno: "23241A05G8", name: "MALINI SINHA", year: 2, branch: "it", section: "b" },
    { rollno: "23241A05G9", name: "MALLELA SAI", year: 2, branch: "it", section: "b" },
    { rollno: "23241A05H0", name: "MARASAKATLA ABHINAV KUMAR", year: 2, branch: "it", section: "b" }
];


Faculty.insertMany(faculties);
Club.insertMany(clubs);
Student.insertMany(students);











