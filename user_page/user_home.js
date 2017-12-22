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



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {



      const btnLogout = document.getElementById('btnLogout')

      //Add logout event
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        window.location = '../login_page/user_login.html';
    })


    const btnUpdateYourProfile = document.getElementById('btnUpdateYourProfile')
    const btngoToAdminPage = document.getElementById('btngoToAdminPage')

    //Add logout event
    btnUpdateYourProfile.addEventListener('click', e => {
      window.location = '../login_page/update_profile.html';
    })

    // btnshowCurrentUser.addEventListener('click', e => {
    //
    //   var currentuser = firebase.auth().currentUser;
    //
    //   let displayCurrentUser = document.getElementById('currentUser')
    //   displayCurrentUser.innerHTML="current user: " + currentuser.email
    // })

    btngoToAdminPage.addEventListener('click', e => {
      if (user.uid == 'OTVKOeIE84MYXRidQYOskh1slP92'){

        window.location = '../login_page/admin_page.html';
      }
      else {

       alert("you don't have the right")
      }
    })


  } else {
    console.log("something is wrong")
  }
});
