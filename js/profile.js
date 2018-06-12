var uid;
var fref;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
		uid = user.uid;
	  	fref = firebase.database().ref("Database/"+uid+"/Profile");
		fref.on('value',function(ds){
				$('#pd').hide();
			if(ds.child("Staff ID").val()!=null){
				$('#tab').show();
			document.getElementById("sid").innerText = document.getElementById("msid").value = ds.child("Staff ID").val();
			document.getElementById("name").innerText = document.getElementById("mname").value = ds.child("Name").val();
			document.getElementById("gender").innerText = ds.child("Gender").val();
			document.getElementById("desig").innerText = document.getElementById("mdesig").value = ds.child("Designation").val();
			if(ds.child("Gender").val()=="Male")document.getElementById('male').checked=true;
			else document.getElementById('female').checked=true;
			}else{
				$('#md').show();
				$('#EditModal').modal('show');
			}
		});
  } else {
	  window.open('index.html', '_self');
  }
});

$(document).ready(function(){
	$('#pd').show();
	$('#tab').hide();
	$('#logout').click(function(){
	firebase.auth().signOut();
	});
	$('#Save').click(function(){
		var sid = document.getElementById("msid").value;
		var name = document.getElementById("mname").value;
		var des = document.getElementById("mdesig").value;
		if(sid!="" && name!="" && des!=""){
		fref.child("Staff ID").set(sid);
		fref.child("Name").set(name);
		if(document.getElementById('male').checked) 
		fref.child("Gender").set("Male");
		else fref.child("Gender").set("Female");
		fref.child("Designation").set(des);
		$('#EditModal').modal('hide');
		}else alert("The fields must not be Empty");
	});
});

