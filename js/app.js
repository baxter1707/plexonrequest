

// ___________Request Number One____________//
$("<div>").attr("id","number-one-request").addClass("selection-container")
.append($("<label>").html("1."))
.append($("<div>").attr("id","poster-title-container")
.append($("<img>").attr("src","http://starwarsblog.starwars.com/wp-content/uploads/2017/10/the-last-jedi-theatrical-blog.jpg"))
.append($("<button>").html("Remove").click(function (){
   var answer = confirm("Are you sure you want to delete this request?");
      if (answer) {
         $("#number-one-request").remove();
      }else{
         return false;
      }
}))
.append($("<h3>").html("Movie Title Here.")))

.appendTo($("#movie-choice-container"))

//_____________Request Number 2____________//
$("<div>").attr("id","number-two-request").addClass("selection-container")
.append($("<label>").html("2."))
.append($("<div>").attr("id","poster-title-container")
.append($("<img>").attr("src","http://starwarsblog.starwars.com/wp-content/uploads/2017/10/the-last-jedi-theatrical-blog.jpg"))
.append($("<button>").html("Remove").click(function (){
   var answer = confirm("Are you sure?");
      if (answer) {
         return true
         ;
      }else{
         return false;
      }
}))
.append($("<h3>").html("Movie Title Here.")))
.appendTo($("#movie-choice-container"))

//_______________Request Number 3______________//
$("<div>").attr("id","number-three-request").addClass("selection-container")
.append($("<label>").html("3."))
.append($("<div>").attr("id","poster-title-container")
.append($("<img>").attr("src","http://starwarsblog.starwars.com/wp-content/uploads/2017/10/the-last-jedi-theatrical-blog.jpg"))
.append($("<button>").html("Remove").click(function (){
   var answer = confirm("Are you sure?");
      if (answer) {
         return true;
      }else{
         return false;
      }
}))
.append($("<h3>").html("Movie Title Here")))
.appendTo($("#movie-choice-container"))



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



movieChoiceContainer.sortable()
