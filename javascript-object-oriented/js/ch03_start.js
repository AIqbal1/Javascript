function onReady(){
	console.log('Hello Chapter 3');

	var clock = new com.avaab.Clock('clock');
	var clock2 = new com.avaab.Clock('clock2',-10,'ETC');
	var clock3 = new com.avaab.Clock('clock3',10,'X');
}

// create static method
// belong to the dDate objkect
Date.__interval = 0;
Date.__aDates = [];
Date.addToInterval = function (date) {
	// this belongs to the 'Date' ie.e refers to Date class
	console.log(date);
	this.__aDates.push(date);
	console.log(this.__aDates.length);
	
	if(!Date.__interval) {
		// this one updates the clock
		Date.__interval = setInterval(function() {Date.updateDates();}, 1000);
	}
};

Date.updateDates = function() {
	// TBD update all date elements
	console.log(this.__aDates.length);
	for(var i=0; i< this.__aDates.length; i++) {
		this.__aDates[i].updateSeconds();
	}
};

Date.prototype.updateSeconds = function() {
	this.setSeconds(this.getSeconds() + 1);
};

Date.prototype.autoClock = function(isAuto) {
	clearInterval(this.clockInterval);
	if(isAuto) {
		var that = this;		
//		this.clockInterval = setInterval(function() {that.updateSeconds()}, 1000);
		Date.addToInterval(this);
	}
	this.setSeconds(this.getSeconds() + 1);
};

// namespace
// com.avaab.projectname

var com = com || {};
	com.avaab  = com.avaab || {};
	
com.avaab.Clock = function (id,offset,label){
		console.log(id);
		offset = offset || 0;
		label = label || '';
		var d = new Date();
		var offset =(offset + d.getTimezoneOffset())*60*1000;
		this.d = new Date(offset + d.getTime());
		this.d.autoClock(true);
		this.id = id;
		this.label = label;

	var that = this;
	// this one updates the page
	setInterval(function(){that.updateClock();},1000);
	this.updateClock();
}

com.avaab.Clock.prototype.version = '1.00';

com.avaab.Clock.prototype.updateClock = function(){
	//this.d.updateSeconds();
	var clock = document.getElementById(this.id);
	clock.innerHTML = this.formatDigits(this.d.getHours()) + ":" + this.formatDigits(this.d.getMinutes()) +":"+ this.formatDigits(this.d.getSeconds()) +" "+ this.label ;
};

com.avaab.Clock.prototype.formatDigits = function(val){
	if(val<10) val = "0" + val;

	return val;
};


window.onload = onReady;

//follow me at https://twitter.com/02geek
//learn more about me at http://02geek.com