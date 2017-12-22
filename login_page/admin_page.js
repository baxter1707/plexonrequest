
let users = []
let rootRef = firebase.database().ref()
let userListRef = rootRef.child("users")
let userIDRef = userListRef.child("Info")
let divShowAllUsers = document.getElementById("divShowAllUsers")
let txtUserSearch = document.getElementById("txtUserSearch")
let btnUserSearch = document.getElementById("btnUserSearch")
let displaySearchedUser = document.getElementById("displaySearchedUser")

firebase.auth().onAuthStateChanged(function(user){
  if (user) {

    const currentuser = firebase.auth().currentUser;

  btnshowAllUser.addEventListener('click', e => {
  divShowAllUsers.innerHTML = ""
   userInfoObservers()
  })

  btnUserSearch.addEventListener('click', e => {
    displaySearchedUser.innerHTML = ""
   userSearch()
  })

  function userInfoObservers() {

    loadUserArray()
    updateUI()
  }

  } else {
    console.log("something is wrong")
  }
});

function updateUI() {

  $(users).each(function(index,user){

      $("<div>")
      .append($("<li>")
          .append($("<div>").html("Name:" + user.firstName + " "+user.lastName))
          .append($("<div>").html("Address: "+ user.address))
          .append($("<div>").html("Phone: "+ user.phoneNumber))
            )
      .appendTo(divShowAllUsers)
  })
  users =[]
}

function loadUserArray(){

      userListRef.once("value").then(function(snapshot){

      for(key in snapshot.val()) {
      // // get the title of the object
      let userInfoFromDatabase = Object.values(snapshot.val()[key])[0]
      let u = new User(snapshot.val()[key])
      let userAddress = userInfoFromDatabase.address
      let userFirstName = userInfoFromDatabase.firstName
      let userLastName = userInfoFromDatabase.lastName
      let userPhoneNumber = userInfoFromDatabase.phoneNumber
      let user = new User(userAddress, userPhoneNumber, userLastName, userFirstName)
      users.push(user)}

  })
}

function userSearch() {

  loadUserArray()
  searchUserFunction()

}

function searchUserFunction(){

  let search = $("#txtUserSearch").val().toLowerCase()

  let searchResult = users.filter(function(item){
    let itemFirstNmae = item.firstName.toLowerCase()
    return itemFirstNmae == search
  })

  $("<div>")
  .append($("<li>").append($("<div>").html("Name: " + searchResult[0].firstName + " " + searchResult[0].lastName))
                    .append($("<div>").html("Phone: " + searchResult[0].phoneNumber))
                    .append($("<div>").html("address: " + searchResult[0].address))
                  )
  .appendTo(displaySearchedUser)

      users =[]
}
