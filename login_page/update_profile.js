// Initialize Firebase
const config = {
    apiKey: "AIzaSyC4xJczHrcejbkI0VeKFnBVpeUkq6E_YFk",
    authDomain: "mikesmovies-c3799.firebaseapp.com",
    databaseURL: "https://mikesmovies-c3799.firebaseio.com",
    projectId: "mikesmovies-c3799",
    storageBucket: "mikesmovies-c3799.appspot.com",
    messagingSenderId: "840246158041"
  };
  firebase.initializeApp(config);

  const txtFirstName = document.getElementById('txtFirstName')
  const txtLastName = document.getElementById('txtLastName')
  const txtPhoneNumber = document.getElementById('txtPhoneNumber')
  const txtAddress = document.getElementById('txtAddress')
  const btnUpdateProfile = document.getElementById('btnUpdateProfile')

//Sen Add send reset password Link
btnUpdateProfile.addEventListener('click', e => {

//Get email and pass
//TO DO: CHECK FOR REAL EMAIL
const firstName = txtFirstName.value
const lastName = txtFirstName.value
const phoneNumber = txtPhoneNumber.value
const address = txtAddress.value

let user = new Users(firstName, lastName, phoneNumber, address)
console.log(user)
window.location = '../user_page/user_home.html'

})


btnContinueToUserPage.addEventListener('click', e => {

//Get email and pass
//TO DO: CHECK FOR REAL EMAIL
window.location = '../user_page/user_home.html'

})
