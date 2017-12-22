


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    const currentuser = firebase.auth().currentUser;

    let users = []
    let rootRef = firebase.database().ref()
    let userListRef = rootRef.child("users")
    let userIDRef = userListRef.child("Info")



    const txtFirstName = document.getElementById('txtFirstName')
    const txtLastName = document.getElementById('txtLastName')
    const txtPhoneNumber = document.getElementById('txtPhoneNumber')
    const txtAddress = document.getElementById('txtAddress')
    const btnUpdateProfile = document.getElementById('btnUpdateProfile')

  //Sen Add send reset password Link
  btnUpdateProfile.addEventListener('click', e => {

  userIDRef = userListRef.child(currentuser.uid)
  u = userIDRef.child("Info")
  let user = new User(txtAddress.value, txtPhoneNumber.value, txtLastName.value, txtFirstName.value)
  u.set(user)

  alert("You have updated your information")

   // window.location = '../user_page/user_home.html'

  })
  btnContinueToUserPage.addEventListener('click', e => {

  //Get email and pass
  //TO DO: CHECK FOR REAL EMAIL
  window.location = '../user_page/user_home.html'

  })

  // function userInfoObservers() {
  // console.log("I am not here")
  // userListRef.once("value").then(function(snapshot){
  // console.log("I am here")
  //   console.log(snapshot)
  //   for(key in snapshot.val()) {
  //
  //     // get the title of the object
  //     let title = (snapshot.val()[key].title)
  //     let user = new User (title)
  //     users.push(user)
  //   }
  //   console.log(users)
  // })
  //
  // }

  } else {
    console.log("something is wrong")
  }
});



//
// function updateUI() {
//
//   $(shoppingLists).each(function(index,shoppingList){
//
//       $("<div>")
//       .append($("<li>").html(shoppingList.title))
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
