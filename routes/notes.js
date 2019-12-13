app.get("/all", function(req, res) {
    // Find all notes in the notes collection
    db.notes.find({}, function(error, found) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      else {
        // Otherwise, send json of the notes back to user
        // This will fire off the success function of the ajax request
        res.json(found);
      }
    });
  });

  // Select just one note by an id
app.get("/find/:id", function(req, res) {
    // When searching by an id, the id needs to be passed in
    // as (mongojs.ObjectId(IdYouWantToFind))
  
    // Find just one result in the notes collection
    db.notes.findOne(
      {
        // Using the id in the url
        _id: mongojs.ObjectId(req.params.id)
      },
      function(error, found) {
        // log any errors
        if (error) {
          console.log(error);
          res.send(error);
        }
        else {
          // Otherwise, send the note to the browser
          // This will fire off the success function of the ajax request
          console.log(found);
          res.send(found);
        }
      }
    );
  });

  // Update just one note by an id
app.post("/update/:id", function(req, res) {
    // When searching by an id, the id needs to be passed in
    // as (mongojs.ObjectId(IdYouWantToFind))
  
    // Update the note that matches the object id
    db.notes.update(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        // Set the title, note and modified parameters
        // sent in the req body.
        $set: {
          title: req.body.title,
          note: req.body.note,
          modified: Date.now()
        }
      },
      function(error, edited) {
        // Log any errors from mongojs
        if (error) {
          console.log(error);
          res.send(error);
        }
        else {
          // Otherwise, send the mongojs response to the browser
          // This will fire off the success function of the ajax request
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });

  // Delete One from the DB
app.get("/delete/:id", function(req, res) {
    // Remove a note using the objectID
    db.notes.remove(
      {
        _id: mongojs.ObjectID(req.params.id)
      },
      function(error, removed) {
        // Log any errors from mongojs
        if (error) {
          console.log(error);
          res.send(error);
        }
        else {
          // Otherwise, send the mongojs response to the browser
          // This will fire off the success function of the ajax request
          console.log(removed);
          res.send(removed);
        }
      }
    );
  });
  