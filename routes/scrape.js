app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.nytimes.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
    });
});


app.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/")
      .then(function(response){
          // Here's where we store the cheerio data
          var $ = cheerio.load(response.data);
          // Look through cheerio data for all the h2's - headlines
          const foo = $('h2')
          // Go through each h2 and look for the things we need
          foo.each(function(i, element){
              // Empty object that we're eventually going to throw into our database
              var result = {};
              // Get the title of the h2
              result.title = $(this)
                  .text();

              result.link = $(this)
                  .children("a")
                  .attr("href");
              result.summary = $(this)
                  .children("ul")
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
