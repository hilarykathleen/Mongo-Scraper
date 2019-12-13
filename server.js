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
    axios.get("https://www.nytimes.com/")
        .then(function(response){
            var $ = cheerio.load(response.data);
            const foo = $('h2')
            foo.each(function(i, element){
                var result = {};
                result.title = $(this)
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