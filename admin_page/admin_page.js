

//console.log(firebase);

const preObject = document.getElementById('object');

const firebaseRef = firebase.database().ref().child('users');
firebaseRef.on('value',function(snapshot){
  console.log(snapshot.val())
})


//console.log(firebaseRef)

// firebaseRef.on('value', snap =>  console.log(snap.val()));


    

