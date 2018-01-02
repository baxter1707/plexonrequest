let ref = firebase.database().ref();
let users = ref.child("users");
let uid = "W8yZUhnQxLQX9o604e6GFdXDiS02"
let userref = users.child(uid);
let usermovies = userref.child("movies");
let wishlist = userref.child("wishlist");
let userinfo = userref.child("Info");

const email = "jonathan.shumate@gmail.com";
const pass = "hero1234";
const auth = firebase.auth();

const promise = auth.signInWithEmailAndPassword(email, pass);



//_______THIS SECTION LOOPS THROUGH THE ARRAY_________//
usermovies.on("value",function(snapshot){

for(movies in snapshot.val()){
  let title = snapshot.val()[movies]
  title.movies = movies
  // console.log(title.movies)
  let movieINFO= 'http://www.omdbapi.com/?i='+ title.movies + '&apikey=d1da1b5c'
  // console.log(movieINFO)

  $.get(movieINFO,function(info){
    $(info).each(function(index,information){
      // console.log(information.Title)
      $("<li>").addClass("list-item")
      .append($("<div>").attr("id","poster-title-container")
      .append($("<img>").attr("src",information.Poster))
      .append($("<img>").addClass("trash-can-image").attr("src","images/trashcan.png").click(function (){
         var answer = confirm("Are you sure you want to delete this request?");
            if (answer) {
               usermovies.child(title.movies).remove()
               $(".list-item").remove()
               $("#movie-choice-container").html("")

            }else{
               return false;
            }

      }))
      .append($("<h4>").html(information.Title))
      )

      .appendTo($("#movie-choice-container"))
    })
  })
}
})



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



//____________Wish List__________//
  wishlist.on("value",function(snapshot){

  for(movies in snapshot.val()){
    let title = snapshot.val()[movies]
    title.movies = movies
    console.log(title.movies)
    let movieINFO= 'http://www.omdbapi.com/?i='+ title.movies + '&apikey=d1da1b5c'
    // console.log(movieINFO)

    $.get(movieINFO,function(info){
      $(info).each(function(index,information){
        // console.log(information.Title)

        $("<li>").addClass("list-item")
        .append($("<div>").attr("id","poster-title-container")
        .append($("<img>").attr("src",information.Poster))
        .append($("<img>").addClass("trash-can-image").attr("src","images/trashcan.png").click(function (){
           var answer = confirm("Are you sure you want to move this to your request list?");
              if (answer) {
                 wishlist.child(title.movies).remove()
                 usermovies.child(title.movies)
                 $(".list-item").remove()
                 $("#movie-choice-container").html("")

              }else{
                 return false;
              }

        }))
        .append($("<h4>").html(information.Title))
        )

        .appendTo($("#wishlist-container"))
      })
    })
  }
  })



  //________Dynamically greet user________//
userinfo.on("value",function(snapshot){
  for(userInfo in snapshot.val()){
    let info = snapshot.val()
    // console.log(info.firstName)


    $("<h1>").html("Welcome " + info.firstName + "!")
    .appendTo(".title-div")
    break
  }



})
