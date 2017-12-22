
let users = []
let rootRef = firebase.database().ref()
let userListRef = rootRef.child("users")
let userIDRef = userListRef.child("Info")
let divShowAllUsers = document.getElementById("divShowAllUsers")


firebase.auth().onAuthStateChanged(function(user){
  if (user) {

    const currentuser = firebase.auth().currentUser;

  btnshowAllUser.addEventListener('click', e => {

   userInfoObservers()
  })

  function userInfoObservers() {
  console.log("I am not here")
  userListRef.once("value").then(function(snapshot){
  console.log("I am here")

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
      .append($("<li>")
          .append($("<div>").html("Name:" + user.firstName + " "+user.lastName))
          .append($("<div>").html("Address: "+ user.address))
          .append($("<div>").html("Phone: "+ user.phoneNumber))
            )
      .appendTo(divShowAllUsers)
  })

}



// function updateUI() {
//
//   $(users).each(function(index,user){
//
//       $("<div>")
//       .append($("<li>").html(user.title))
//       .append($("<input>").attr("placeholder","Enter Title").attr("id","grocery-title-textbox"))
//       .append($("<input>").attr("placeholder","Enter Price").attr("id","grocery-price-textbox"))
//       .append($("<button>").attr("shopping-list-title",shoppingList.title).html("Add Grocery Item").click(function(){
//
//           // get grocery item title
//           let groceryTitle = $($(this).siblings("#grocery-title-textbox")[0]).val()
//           let price = $($(this).siblings("#grocery-price-textbox")[0]).val()
//
//           let groceryItem = new GroceryItem(groceryTitle,price)
//           console.log(groceryItem)
//
//           let title = $(this).attr("shopping-list-title")
//           let shoppingList = shoppingLists.filter(function(item){
//             return item.title == title
//           })[0]// just get the first item of the array
//
//           console.log(shoppingList)
//           shoppingList.groceryItems.push(groceryItem)
//
//           let shoppingListRef = shoppingListsRef.child(shoppingList.title)
//           shoppingListRef.set(shoppingList)
//
//       }))
//       .appendTo(shoppingListUL)
//
//   })
//
// }
