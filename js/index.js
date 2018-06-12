firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	$('#Uname').val('');
	$('#Pword').val('');
	$('#bt').hide();
	$('#pro').show();
	window.open('profile.html', '_self');
  } else {
	  	$('#bt').show();
	    $('#pro').hide();
  }
});

$(document).ready(function(){

	$('#bt').click(function(){
		var uname = $('#Uname').val();
		var pword = $('#Pword').val();
		if(uname!="" && pword!=""){
				$('#bt').hide();
				$('#pro').show();
			firebase.auth().signInWithEmailAndPassword(uname, pword).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
				$('#bt').show();
				$('#pro').hide();
			});
			
		}else{
			alert("The Fields must not be empty!..");
		}
	});
});