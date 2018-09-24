
var topics = [ "Goku", "Vegeta", "SSJ", "Gohan", "Piccolo", "Beerus", "Android 17", "Jiren", "Toppo", "Frieza", "Broly", "Bulma", "Ultra Instinct", "Kid Buu"];
$(document).on("click", ".gif", DBZcharacters);
renderButtons();

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var giphy = $("#gif-input").val().trim();
    topics.push(giphy);
    renderButtons();
});
function DBZcharacters() {
    var dbz = $(this).attr("data-character");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    dbz + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        
        console.log(response.data)
        var results = response.data;
        for (var i=0; i < results.length; i++) {
           if(results[i].rating !== "r" && results[i].rating !== "pg-13"){
                var rating = results[i].rating;
                var p =$("<p>").text("Rating: " + rating);
                var gifDiv = $("<div class='gifs'>");
                var image = $("<img>");
                image.attr({
                    "src": results[i].images.fixed_height.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url
                })
                gifDiv.append(image);
                gifDiv.append(p);
                $("#gif-placeholder").prepend(gifDiv);
            };
        };
    });
}

function renderButtons() {
    $("#button-holder").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gif btn btn-info");
        a.attr("data-character", topics[i]);
        a.text(topics[i]);
        $("#button-holder").append(a);
    };
}

$(".gifs").on("click", function() {
   
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }});
    //remainder of pseudo-code: Unable to change gif's states from still to animate. 





