


$(document).ready(function(){
  console.log("this is being called")
//   function getArticles() {
//     $.get("/scrape").then(function(data){
//       console.log(data)
//     })
    

//   }
//   getArticles();

// })

$(document).on('click', '.save-button', function(event){
  // console.log(event.target)
  console.log(event.target.id)
  console.log("this is being clicked");
  // $.ajax({
  //   method: 'PUT',
  //   url: "/savedArticles/:id",
  //   data: event.target.id,
  //   // dataType: 'json',
  //   // success: callback
  // });

  // $.put("/savedArticles/" + event.target.id).then()
  $.ajax({
    method: "PUT",
    url: "/savedArticles/" + event.target.id, 
    data: event.target.id
  }).then(
    function(data) {
      console.log("pass id");
      }
  );
  });




// Grab the articles as a json
// function renderArticles() {
//     $.getJSON("/article", function (data) {
//       console.log("data being called", data)
//       for (var i = 0; i < data.length; i++) {
//         // Display the apropos information on the page
//         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//       }
//     });
//   }
  
//   renderArticles();
  
//   $(document).on("click", ".saveArticle", function () {
  
//     // console.log("something has been clicked" + $(this).data("id") )
//    var id = $(this).data("id")
//     $.post( "savethisarticle/"+ id, function( data ) {
//       $("#articles").empty();
//       renderArticles()
//     });
//   })
  
  
//   $(document).on("click", "#scrapeNow", function () {
//     $.ajax({
//       method: "GET",
//       url: "/scrape",
//     })
//       .then(function (data) {
//         $("#articles").empty();
//         renderArticles();
//       })
//   })
})
