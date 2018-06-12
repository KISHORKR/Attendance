var uid;
var fref;
var count;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
		uid = user.uid;
	  	fref = firebase.database().ref("Batches");
		fref.on('value',function(ds){
			$('#pd').hide();
			$('#bat').show();
			ds.forEach(function(child) {
				var batch = document.getElementById('batch');
				batch.innerHTML += "<option value='"+child.key+"'>"+child.key+"</option>";
            });
		});
  } else {
	  window.open('index.html', '_self');
  }
});
function selectbat(){
	var batref = firebase.database().ref("Batches/"+document.getElementById('batch').value);
	document.getElementById('section').innerHTML="<option value='scsc'>Select Section</option>";
	batref.on('value',function(ds){
			$('#sec').show();
			ds.forEach(function(child) {
				var batch = document.getElementById('section');
				batch.innerHTML += "<option value='"+child.key+"'>"+child.key+"</option>";
            });
		});
}

function selectsec(){
	var secref = firebase.database().ref("Batches/"+document.getElementById('batch').value+"/"+document.getElementById('section').value);
	var attdata = document.getElementById('attdata');
	attdata.innerHTML="";
	secref.on('value',function(ds){
			count=0;
			$('#att').show();
			ds.forEach(function(child) {
				attdata.innerHTML += "<tr><td class='info'>"+child.key+"</td><td class='info'>"+child.val()+"</td><td class='info'><input type='checkbox' checked id='k"+count+"' value='"+child.key+"' />"+"</td></tr>";
				count++;
            });
		});
}
function attsave(){
	var currentdate = new Date(); 
	var atref = firebase.database().ref("Database/"+uid+"/Attendance/"+document.getElementById('batch').value+"/"+document.getElementById('section').value+"/"+currentdate.getDate()+"-"+(currentdate.getMonth()+1)+"-"+currentdate.getFullYear()+"/"+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds());
	var i;
	for(i=0;i<count;i++){
		var temp = document.getElementById('k'+i);
		if(temp.checked==false){
			atref.child(temp.value).set("Absent");
		}
	}
	alert("Submitted successfully at "+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds());
	
}
$(document).ready(function(){
	var currentdate = new Date(); 
	$('#bat').hide();
	$('#pd').show();
	$('#att').hide();
	$('#sec').hide();
	$('#logout').click(function(){
	firebase.auth().signOut();
	});
});