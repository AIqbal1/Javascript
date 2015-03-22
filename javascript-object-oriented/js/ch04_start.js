function onReady(){
	console.log('Hello Chapter 4');

	var clock = new com.o2GEEK.Clock('clock');
	var clock2 = new com.o2GEEK.TextClock('clock2',-300,'ETC');
	var clock2 = new com.o2GEEK.AlarmClock('clock3',300,'X', 23, 16);

	// funciton 'call' that belongs to a function and changges the scope.
	// every function is also an object
	LiveDate.call(clock, 1 ,2, 3);
	
	// very similar to call above but uses an array
	LiveDate.apply(clock, [1,2,3]);
}

function LiveDate(a, b, c) {
	console.log(this, a, b, c);
}

Date.__interval = 0;
Date.__aDates = [];
Date.addToInterval=function (date){
	//console.log(this.__interval);
	this.__aDates.push(date);

	if(!Date.__interval)
		Date.__interval = setInterval(function(){Date.updateDates()},1000);
}
Date.updateDates= function(){
	//console.log(this.__aDates.length);
	for(var i=0; i<this.__aDates.length;i++)
		this.__aDates[i].updateSeconds();
}


Date.prototype.updateSeconds = function(){
	this.setSeconds(this.getSeconds()+1);
	//console.log(Date.__interval);
}

Date.prototype.autoClock = function(isAuto){
	//clearInterval(this.clockInterval);

	if(isAuto){
		/*var that= this;
		this.clockInterval = setInterval(function(){that.updateSeconds()},1000);*/
		Date.addToInterval(this);
	}
}
var com = com || {};
	com.o2GEEK = com.o2GEEK || {};


com.o2GEEK.Clock = function (id,offset,label){
		offset = offset || 0;
		label = label || '';
		var d = new Date();
		var offset = (offset+ d.getTimezoneOffset())*60*1000;
		this.d = new Date(offset+d.getTime());
		this.d.autoClock(true);
		this.id = id;
		this.label= label;
		 

	var that = this;
	setInterval(function(){
		that.updateClock();},1000);
	this.updateClock();
}
com.o2GEEK.Clock.prototype.version = '1.00';
com.o2GEEK.Clock.prototype.updateClock = function(){
			//console.log(this.version);
			var date = this.d;
				//date.updateSeconds();
			var clock = document.getElementById(this.id);
			clock.innerHTML = this.formatDisplay(date.getHours(), date.getMinutes(), date.getSeconds(), this.label);
		};
		
com.o2GEEK.Clock.prototype.formatDisplay = function(h, m, s, label) {
	return this.formatDigits(h) + ":" + this.formatDigits(m) +":"+ this.formatDigits(s) +" "+ label ;
};

com.o2GEEK.Clock.prototype.formatDigits= function(val){
	if(val<10) val = "0" + val;

	return val;
};


// inheritance
com.o2GEEK.TextClock = function(id, offset, label) {
	// arguments property for every function
	com.o2GEEK.Clock.apply(this, arguments);
	console.log(this.version);
};

// telling TextClock its prototype is something else, now the constructor is CLOCK, its inherited now!!
// Object.create creates an empty prototype... pass in an argument to create to create the right object
// modern browsers only IE 9+
com.o2GEEK.TextClock.prototype = Object.create(com.o2GEEK.Clock.prototype);

// telling TextClock the constructor is still the same, NOT CLOCK!!
com.o2GEEK.TextClock.prototype.constructor = com.o2GEEK.TextClock;

// overriding the superclass method
com.o2GEEK.TextClock.prototype.formatDisplay = function(h, m, s, label) {
	return this.formatDigits(h) + " hours " + this.formatDigits(m) +" mins "+ this.formatDigits(s) +" secs "+ label ;
};

com.o2GEEK.TextClock.prototype.version = '1.01';



// alarm clock inheritance alamr -> textclock - > clock

com.o2GEEK.AlarmClock = function(id, offset, label, almH, almM) {
	// arguments property for every function
	this.almH = almH;
	this.almM = almM;
	com.o2GEEK.TextClock.apply(this, arguments);
	console.log(this.version);
};

com.o2GEEK.AlarmClock.prototype = Object.create(com.o2GEEK.TextClock.prototype);

com.o2GEEK.AlarmClock.prototype.constructor = com.o2GEEK.AlarmClock;

//overriding the superclass method
com.o2GEEK.AlarmClock.prototype.formatDisplay = function(h, m, s, label) {
	if(h == this.almH && m == this.almM) {
		var snd = new Audio('art/beep.mp3');
		snd.play();
		return 'WAKE UP';
	}
	else {
		return this.formatDigits(h) + " hours " + this.formatDigits(m) +" mins "+ this.formatDigits(s) +" secs "+ label ;
	}	
};


window.onload = onReady;

//follow me at https://twitter.com/02geek
//learn more about me at http://02geek.com