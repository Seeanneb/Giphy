$(document).ready(function(){


	var gifs = ["happy", "sad", "lol", "high five"];



      function displayGifs(){
        $("button").on("click", function() {
          $("#gifs-here").empty();
        var gif = $(this).attr("data-name");
        var giphyURL = "http://api.giphy.com/v1/gifs/search?q="
           + gif + "&api_key=8b8cd2cb996644309688ee7eb046faf6&limit=10";

        $.ajax({
            url : giphyURL,
            method: "GET"
        }).done(function(response){

          var results = response.data;
          console.log(response)
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class = 'item'>");
              var gifImage = $("<img>");
              gifImage.attr({"src":results[i].images.fixed_height.url, 
                                    "data-still":results[i].images.fixed_height_still.url,
                                      "data-animate":results[i].images.fixed_height.url});

              gifDiv.append(gifImage);

              $("#gifs-here").prepend(gifDiv);

            }
          });
        });
      };

      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < gifs.length; i++) {
          var newButton = $("<button>").addClass("gif").attr("data-name", gifs[i]).text(gifs[i]);
          $("#buttons-view").append(newButton);
        }
      }
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        renderButtons();
      });

      function freezeGif(){ 
      $("#gifs-here").on("click", function(){

        var a = $(this).attr("data-animate")
        var b = $(this).attr("data-still")

          if (a === "data-animate") {
            $(this).attr("src", "data-still")
          }else if (b === "data-still") {
            $(this).attr("src", "data-animate")
          }
      }) 
    };

     
      renderButtons();
      $(".gif").on("click",displayGifs());

});

