// Importing Express
const express = require('express');

// Instantiate Express
const app = express();

//Define port
const port = 8080;

//Listenen to the port
app.listen(port, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server is running on port", port);
});

//API

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.get("/mail", (req, res) => {
    res.sendFile(__dirname + "/mail.html")
}) 

//Nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kenzyonadventure@gmail.com',
    pass: '**'
  }
})

function sendMail(mail) {
    let mailOptions = {
        from: "kenzyonadventure@gmail.com",
        to: "kenzyonadventure@gmail.com",
        name: mail.name,
        email: mail.email,
        subject: mail.subject,
        html: mail.email + "  " + mail.name + "  ----------- || " + mail.body
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email Sent: " + info.response);
        }
    })
}

app.post("/sendMail", (req, res) => {
    mail = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        body: req.body.message
    }
    console.log(mail);
    sendMail(mail)
    res.redirect("/")
})