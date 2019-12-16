// Grab the articles as a json
function renderArticles() {
    $.getJSON("/article", function (data) {
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      }
    });
  }
  
  renderArticles();
  
  $(document).on("click", ".saveArticle", function () {
  
    // console.log("something has been clicked" + $(this).data("id") )
   var id = $(this).data("id")
    $.post( "savethisarticle/"+ id, function( data ) {
      $("#articles").empty();
      renderArticles()
    });
  })
  
  
  $(document).on("click", "#scrapeNow", function () {
    $.ajax({
      method: "GET",
      url: "/scrape",
    })
      .then(function (data) {
        $("#articles").empty();
        renderArticles();
      })
  })