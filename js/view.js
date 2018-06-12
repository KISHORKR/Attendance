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
	var datref = firebase.database().ref("Database/"+uid+"/Attendance/"+document.getElementById('batch').value+"/"+document.getElementById('section').value);
	document.getElementById('date').innerHTML="<option value='scsc'>Select Date</option>";
	datref.on('value',function(ds){
			$('#dat').show();
			ds.forEach(function(child) {
				var batch = document.getElementById('date');
				batch.innerHTML += "<option value='"+child.key+"'>"+child.key+"</option>";
            });
		});
	
}
function selectdat(){
	var tatref = firebase.database().ref("Database/"+uid+"/Attendance/"+document.getElementById('batch').value+"/"+document.getElementById('section').value+"/"+document.getElementById('date').value);
	document.getElementById('time').innerHTML="<option value='scsc'>Select Time</option>";
	tatref.on('value',function(ds){
			$('#tim').show();
			ds.forEach(function(child) {
				var batch = document.getElementById('time');
				batch.innerHTML += "<option value='"+child.key+"'>"+child.key+"</option>";
            });
		});
}

function selecttim(){
	var a = new Array();
	var flag=0;
	count=0;
	var fref = firebase.database().ref("Batches/"+document.getElementById('batch').value+"/"+document.getElementById('section').value);
	var tatref = firebase.database().ref("Database/"+uid+"/Attendance/"+document.getElementById('batch').value+"/"+document.getElementById('section').value+"/"+document.getElementById('date').value+"/"+document.getElementById('time').value);
	var attdata = document.getElementById('attdata');
	attdata.innerHTML="";
	tatref.on('value',function(ds){
				a=[];
				ds.forEach(function(child) {
				a[count]=child.key;
				count++;
				});
		});			
		
		
	fref.on('value',function(ds){
			$('#att').show();
			ds.forEach(function(child) {
				var flag=1;
				a.forEach(function(x){
					if(child.key==x)flag=0;
				});				
				if(flag==1)
				attdata.innerHTML += "<tr><td class='success'>"+child.key+"</td><td class='success'>"+child.val()+"</td><td class='success'>Present</td></tr>";
				else attdata.innerHTML += "<tr><td class='danger'>"+child.key+"</td><td class='danger'>"+child.val()+"</td><td class='danger'>Absent</td></tr>";
            });
		});	
}



$(document).ready(function(){
	var currentdate = new Date(); 
	$('#bat').hide();
	$('#dat').hide();
	$('#pd').show();
	$('#att').hide();
	$('#tim').hide();
	$('#sec').hide();
	$('#logout').click(function(){
	firebase.auth().signOut();
	});
});