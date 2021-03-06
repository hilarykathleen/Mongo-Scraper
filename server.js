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

var PORT = process.env.PORT || 3000;

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

const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/unit18Populate";

mongoose.connect(MONGODB_URI);


// Here Routes

app.get("/", (req, res) => {
  console.log("server.js")
    db.Article.find({ saved: false })
        .then(dbArticle => {
          // console.log("dbArticle", dbArticle)
            res.render("articles", { articles: dbArticle })
        })
        .catch(function(err){
            return res.json(err)
        })
})

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
                    // console.log(result)
                result.save = false;

            // pushing results into database
            db.Article.create(result)
            .then(function(dbArticle){
            console.log(dbArticle)
            })
            .catch(function(err){
            return res.json(err)
      })
    });
            res.send("scrape complete")
  });
})

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for saving selected Article 
  app.put("/savedArticles/:id", function(req, res) {
    console.log(req.params, 'THIS WORKED')
    
  
    // Grab every document in the Articles collection
    // db.Article.find({})
    //   .then(function(dbArticle) {
    //     // If we were able to successfully find Articles, send them back to the client
    //     res.json(dbArticle);
    //   })
    //   .catch(function(err) {
    //     // If an error occurred, send it to the client
    //     res.json(err);
    //   });
  });

  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for saving/updating an Article's associated Note
 app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });