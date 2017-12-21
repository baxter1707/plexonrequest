let ref = firebase.database().ref();
let users = ref.child("users");
let uid = "kurkrUpfd4fg0fENIjVKfCNRfQV2"
let userref = users.child(uid);
let usermovies = userref.child("movies");

const email = "danny@dyer.com";
const pass = "password";
const auth = firebase.auth();

const promise = auth.signInWithEmailAndPassword(email, pass);


//moviedirectory = usermovies.child(movieid);
  //moviedirectory.set(requestedMovie);


usermovies.on("value",function(snapshot){

for(movies in snapshot.val()){
  let title = snapshot.val()[movies]
  title.movies = movies
  console.log(title.movies)
  let movieINFO= 'http://www.omdbapi.com/?i='+ title.movies + '&apikey=d1da1b5c'
  console.log(movieINFO)

  $.get(movieINFO,function(info){
    $(info).each(function(index,information){
      console.log(information.Title)

      $("<li>").addClass("list-item")
      .append($("<div>").attr("id","poster-title-container")
      .append($("<h3>").html(information.Title))
      .append($("<img>").attr("src",information.Poster))
      .append($("<img>").addClass("trash-can-image").attr("src","images/trashcan.png").click(function (){
         var answer = confirm("Are you sure you want to delete this request?");
            if (answer) {
               usermovies.child(movies).remove()
               $(".list-item").remove()
               $("#movie-choice-container").html("")

            }else{
               return false;
            }

      }))
      )

      .appendTo($("#movie-choice-container"))
    })
  })
}
})


// ___________Request Number One____________//


$("#movie-choice-container").sortable()





// _____________TOGGLE SECTION TEST_____________
$( function() {
    // run the currently selected effect
    function runEffect() {
      // get effect type from
      var selectedEffect = $( "#effectTypes" ).val();

      // Most effect types need no options passed by default
      var options = {};
      // some effects have required parameters
      if ( selectedEffect === "scale" ) {
        options = { percent: 50 };
      } else if ( selectedEffect === "size" ) {
        options = { to: { width: 200, height: 60 } };
      }

      // Run the effect
      $( "#effect" ).toggle( selectedEffect, options, 500 );
    }
    $( "#button" ).on( "click", function() {
      runEffect();
    });
  })
