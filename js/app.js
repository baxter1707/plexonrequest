


for (i = 0; i <3;i++){

// ___________Request Number One____________//
$("<div>").attr("id","user-request").addClass("selection-container")
.append($("<label>").html("1."))
.append($("<div>").attr("id","poster-title-container")
.append($("<img>").attr("src","http://starwarsblog.starwars.com/wp-content/uploads/2017/10/the-last-jedi-theatrical-blog.jpg"))
.append($("<img>").addClass("trash-can-image").attr("src","images/trashcan.png").click(function (){
   var answer = confirm("Are you sure you want to delete this request?");
      if (answer) {
         $("#user-request").remove();
      }else{
         return false;
      }
}))
.append($("<h3>").html("Movie Title Here.")))

.appendTo($("#movie-choice-container"))
}
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
