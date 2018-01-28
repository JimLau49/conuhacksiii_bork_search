const bodyParser = require('body-parser');
const http = require('http');
const request = require('request');
const express = require('express');
const cheerio = require('cheerio');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    let query = req.body.Body;
    let searchUrl = "http://google.com/search?q=" + query.split(" ").join("+");
    let searchHTML;
    request({
        uri: searchUrl,
        },
        function(err, ress, body) {
            searchHTML = cheerio.load(body);
            console.log(searchHTML("div#search").text().split(" ")[0] +
                searchHTML("div#search").text().split(" ")[1]
                + '\n\n\n\n');

            let ans =  "";
            for(i = 0; i < 5; i++ )
                ans += " " + searchHTML("div#res").text().split(" ")[i] + " "

            twiml.message(ans);
            console.log(searchHTML("div#res").text())


            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());

            //console.log(searchHTML("body").data('tts-text'));
        }
    );



});

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});
