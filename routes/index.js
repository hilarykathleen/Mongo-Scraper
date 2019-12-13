app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });
  
  // Handle form submission, save submission to mongo
  app.post("/submit", function(req, res) {
    console.log(req.body);
    // Insert the note into the notes collection
    db.notes.insert(req.body, function(error, saved) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      else {
        // Otherwise, send the note back to the browser
        // This will fire off the success function of the ajax request
        res.send(saved);
      }
    });
  });