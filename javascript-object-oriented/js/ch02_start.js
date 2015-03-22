function onReady(){
	console.log('Hello Chapter 2');
//	var clock = createClock('clock');
//	var clock2 = createClock('clock2');
	
	var clock = new Clock('clock', 0);
	var clock2 = new Clock('clock2', 10, 'ETC');
	
	
}

// every function is a constructor by default.
// tradition in javascript funcitons that create things have upper case first letter.
// function that is a constructor by default will return an object 
function Clock(id, offset, label) {
	var that = this;
	// any value is not valid, null
	// global variable
	offset = offset || 0;
	label = label || '';
	
	var d = new Date();
	this.offset = (offset + d.getTimezoneOffset()) * 60 * 60 * 1000;
	// var c = {}; // shortcut new object	
	// method because it belongs to an object
	this.updateClock = function () {
		var date = new Date();
		date = new Date((offset + d.getTimezoneOffset()) * 60 * 60 * 1000 + date.getTime());
		var clock = document.getElementById(id);
		console.log(this);
		// find the format method inside the object
		clock.innerHTML = this.formatDigits(date.getHours()) + ":" + this.formatDigits(date.getMinutes()) +":"+ this.formatDigits(date.getSeconds()) + " " + label ;
	};
	
	this.formatDigits = function(val){
		if(val<10) val = "0" + val;

		return val;
	};
	// in a sense the method is being removed from the 'c' object and sent to the set interval, so sent interval
	// will not see the 'this' object. it is sent as a function not aas a method.
	// to solve this we send a function encapsualting the method call.
	// NOT : setInterval(c.updateClock, 1000);
	// so ==>
	setInterval(function() {that.updateClock();}, 1000);
	
	// make the initial call
	this.updateClock();
}

window.onload = onReady;

//follow me at https://twitter.com/02geek
//learn more about me at http://02geek.com
