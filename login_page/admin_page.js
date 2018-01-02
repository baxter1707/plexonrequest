let users = []
let rootRef = firebase.database().ref()
let userListRef = rootRef.child("users")
let userIDRef = userListRef.child("Info")
let showAllUsers = document.getElementById("showAllUsers")

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {



      const btnLogout = document.getElementById('btnLogout')

      //Add logout event
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        window.location = '../login_page/user_login.html';
    })}})

firebase.auth().onAuthStateChanged(function(user){
  if (user) {

    const currentuser = firebase.auth().currentUser;

  btnshowAllUser.addEventListener('click', e => {

   userInfoObservers()
  })

  function userInfoObservers() {
  userListRef.once("value").then(function(snapshot){

    for(key in snapshot.val()) {
      // // get the title of the object
      let userInfoFromDatabase = Object.values(snapshot.val()[key])[0]
      let userAddress = userInfoFromDatabase.address
      let userFirstName = userInfoFromDatabase.firstName
      let userLastName = userInfoFromDatabase.lastName
      let userPhoneNumber = userInfoFromDatabase.phoneNumber
      let user = new User(userAddress, userPhoneNumber, userLastName, userFirstName)

      users.push(user)

    }
    updateUI()
  })

  }

  } else {
    console.log("something is wrong")
  }
});

function updateUI() {
    let counter = 0
  $(users).each(function(index,user){
    console.log(user)
      $("<div>")
      .append($("<li class='userDisplayMenu'>")
          .append($("<div class='menuName'>").html(user.firstName + " "+user.lastName))
          .append($("<button id='userProfile' class='userMenuItem' onClick=moreDetails()>User Profile </button>"))
          // .append($("<button class='userMenuButton'>Pending Requests</button>"))
          // .append($("<button class='userMenuButton'>Send Message</button>"))
          
          // .append($("<div>").html("Address: "+ user.address))
          // .append($("<div>").html("Phone: "+ user.phoneNumber))
            )
      
      .appendTo(showAllUsers)
  })

}
const displayUserDetails = document.getElementById('displayUserDetails')
function moreDetails() {
  $(users).each(function(index,user){
  $("<div>")
  .append($("<div>").html("Address: "+ user.address))
  .append($("<div>").html("Phone: "+ user.phoneNumber))
})
  .appendTo(displayUserDetails)
}
