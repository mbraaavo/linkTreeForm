const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const https = require('https');
const dotenv = require('dotenv').config();
const app = express();



app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//BravoLinks Routing and stuff :D

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/linkedin', (req, res) => {
    res.redirect('https://www.linkedin.com/in/mbraaavo');
});

app.get('/github', (req, res) => {
    res.redirect('https://github.com/mbraaavo');
});

app.get('/reddit', (req, res) => {
    res.redirect('https://www.reddit.com/user/mbraaavo/posts/');
});

app.get('/twitter', (req,res) => {
    res.redirect('https://twitter.com/Braaaaaaavo');
});

//Gathering our form data with post method (remove console.log)

app.post('/', (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    console.log(fName, lName, email);

      // Creating our flat pack json data "template"

      const data = {
        members:[{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: fName ,
                LNAME: lName
            }
        }]

    };

    const jsonData = JSON.stringify(data);

    //MAILCHIMP API STUFFFFF (WORK IN PROGRESS)
  
    //server: 'us14',
    const list_id = process.env.API_LIST_ID;
    const url = process.env.API_URL + `/${list_id}`;
    const api_key = process.env.API_KEY;
    //options for https request 
    const options = {
        method: "POST",
        auth: `mbraaavo:${api_key}`
    };

    //our https request
    const request = https.request(url, options, function(response) {
        
        if (response.statusCode == 200){
            res.sendFile(__dirname + '/success.html'); 
        }
        else {
            res.sendFile(__dirname + '/failure.html');
        };
    });

    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000, () => {
    console.log('SERVER IS UP!!! :D');
})