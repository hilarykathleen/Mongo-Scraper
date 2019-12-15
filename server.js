var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Here Routes

app.get("/scrape", function(req, res) {
    axios.get("https://www.npr.org/sections/news/")
        .then(function(response){
            // Here's where we store the cheerio data
            var $ = cheerio.load(response.data);
            // Look through cheerio data for all the h2's - headlines
            const foo = $('div.item-info')
            //     console.log(foo)
            // Go through each h2 and look for the things we need
            foo.each(function(i, element){
                // Empty object that we're eventually going to throw into our database
                var result = {};
                // Get the title of the h2
                result.title = $(this)
                    .children("h2.title")
                    .children("a")
                    .text();
                result.link = $(this)
                    .children("h2.title")
                    .children("a")
                    .attr("href");
                result.summary = $(this)
                    .children("p")
                    .last()
                    .text();
                    console.log(result)
            })
            res.send('done')
            // console.log(response, "response")
            // res.json(response.data)
        })  
        .catch(function(error){
            console.log(error, "error")
        })
    // res.send("done")
  
  });
  





app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });