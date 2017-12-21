let apikey = "6fe893b2";
let searchterm = "star";
let url = "http://www.omdbapi.com/?s=" + searchterm + "&apikey=" + apikey;
let resultsplacement = $(".results-container");
let $slidercontent = $(".slidercontent");
let $id;

let ref = firebase.database().ref();
let users = ref.child("users");
let uid = "kurkrUpfd4fg0fENIjVKfCNRfQV2";
let userref = users.child(uid);
let usermovies = userref.child("movies");

const email = "danny@dyer.com";
const pass = "password";
const auth = firebase.auth();

const promise = auth.signInWithEmailAndPassword(email, pass);

$slidercontent.hide();

console.log(url);

$.get(url, function(data) {
  let results = data.Search;
  let seenIDs = {};

  let uniqueArray = results.filter(function(movie) {
    if (movie.imdbID in seenIDs) {
      return false;
    } else {
      seenIDs[movie.imdbID] = true;
      return true;
    }
  });

  $(uniqueArray).each(function(index, movie) {
    $("<div>")
      .attr("class", "movies")
      .attr("id", movie.imdbID)

      .click(function() {
        let $this = $(this);

        if ($this.hasClass("selected")) {
          $this.removeClass("selected");
          $slidercontent.slideUp();
        } else {
          $(".selected").removeClass("selected");
          $this.addClass("selected");
          detailedSearch(this.id);
          $("html,body").animate(
            {
              scrollTop: $(".slidercontent").offset().top - $(this).height() / 5
            },
            500
          );
        }
      })

      .append(
        $("<div>")
          .attr("class", "poster")
          .append($("<img>").attr("src", movie.Poster))
      )
      .append(
        $("<div>")
          .attr("class", "title")
          .html(movie.Title + " (" + movie.Year + ")")
      )

      .appendTo(resultsplacement);
  });
});

function detailedSearch(id) {
  let moredetails = "https://www.omdbapi.com/?i=" + id + "&apikey=" + apikey;
  let itemsPerRow = 0;

  let firstMovie = $(".movies").eq(0);
  let itemTop = firstMovie.position().top;

  $(".movies").each(function(i) {
    if ($(this).position().top != itemTop) {
      itemsPerRow = i;
      return false;
    }
  });

  selectedIndex = $(".movies").index($(".selected")[0]);
  selectedRowNum = Math.floor(selectedIndex / itemsPerRow) + 1;

  if ($(".movies").eq(selectedRowNum * itemsPerRow).length) {
    detailPlacement = selectedRowNum * itemsPerRow - 1;
  } else {
    detailPlacement = (selectedRowNum - 1) * itemsPerRow - 1;
  }

  $(".slidercontent").empty();

  $.get(moredetails, function(thismovie) {
    let results = $("<div>")
      .attr("class", "detailedlook")
      .attr("id", thismovie.imdbID)
      .append(
        $("<div>")
          .attr("class", "detailedinfo")
          .append(
            $("<div>")
              .attr("class", "movietitle")
              .html(thismovie.Title)
          )
          .append(
            $("<div>")
              .attr("class", "moviesubinfo")
              .append(
                $("<div>")
                  .attr("class", "movieyear")
                  .html(thismovie.Year + " ")
              )
              .append(
                $("<div>")
                  .attr("class", "movierated")
                  .html(thismovie.Rated)
              )
              .append(
                $("<div>")
                  .html(" " + thismovie.Runtime)
                  .attr("class", "movieruntime")
              )
              .append(
                $("<div>")
                  .attr("class", "moviegenre")
                  .html(thismovie.Genre)
              )
          )
          .append(
            $("<div>")
              .attr("class", "moviedescription")
              .html(thismovie.Plot)
          )
          .append(
            $("<div>")
              .attr("class", "movieawards")
              .html(thismovie.Awards)
          )
          .append(
            $("<div>")
              .attr("class", "movieratings")
              .html(thismovie.Ratings[0].Value)
          )
      )
      .append(
        $("<div>")
          .attr("class", "selectbuttons")
          .append(
            $("<input>")
              .attr("type", "button")
              .attr("id", "request")
              .attr("value", "Request")
          )
          .append(
            $("<input>")
              .attr("type", "button")
              .attr("id", "bookmark")
              .attr("value", "Bookmark")
          )
      )
      .append(
        $("<div>")
          .attr("class", "detailedposter")
          .append($("<img>").attr("src", thismovie.Poster))
      )
      .appendTo($(".slidercontent"));
  });
  $(".slidercontent")
    .insertAfter($(".movies").eq(detailPlacement))
    .slideDown();
}

class MovieRequest {
  constructor(name, datetime) {
    this.name = $(".detailedinfo")
      .children(".movietitle")
      .text();
    this.datetime = Date.now();
  }
}

$(window).resize(function() {
  if ($(".detailedlook")[0]) {
    console.log($);
    let tempid = $(".detailedlook").prop("id");
    $(".slidercontent").hide(); // hide slider so it doesn't interfere with the flex layout during resize
    clearTimeout(window.resizedFinished);

    window.resizedFinished = setTimeout(function() {
      detailedSearch(tempid);
      $("html,body").animate(
        {
          scrollTop: $(".slidercontent").offset().top - $(this).height() / 5
        },
        500
      ); // show slider again now that resize has stabilised
    }, 250);
  }
});

console.log();

$(document).on("click", "#request", function() {
  requestedMovie = new MovieRequest();
  movieid = $(".detailedlook").prop("id");
  moviedirectory = usermovies.child(movieid);
  moviedirectory.set(requestedMovie);
});

/* $(function() {
  $(window).on("scroll", function() {
    $(".detailedposter").css("margin-top", 80 + $(window).scrollTop() * -0.3);
  });
}); */
