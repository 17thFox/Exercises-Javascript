function myQueue(){
	this.array = [];
	this.size = 0;
}

myQueue.prototype.pushQueue = function(number){
	this.array[this.size] = number;
	this.size += 1;
}

myQueue.prototype.popQueue = function(){
	if(this.size == 0)
	{
		return;
	}
	var arrayTemp = this.array;
	for (var i = 1; i <= arrayTemp.length - 1; i ++) {
		this.array[i-1] = arrayTemp[i]; 
	}
	this.size -= 1;
}
myQueue.prototype.firstQueue = function(){
	if(this.size == 0){
		return undefined;
	}
	return this.array[0];
}

myQueue.prototype.lastQueue = function(){
	if(this.size == 0){
		return undefined;
	}
	return this.array[this.size - 1];
}

function test1(){
	var coada = new myQueue();

	if(coada.firstQueue() != undefined){
		console.log("Failed 1");
	}
	if(coada.lastQueue() != undefined){
		console.log("Failed 2");
	}

	coada.pushQueue(9);

	if(coada.firstQueue() != 9){
		console.log("Failed 4");
	}

	if(coada.lastQueue() != 9){
		console.log("Failed 5");
	}

	coada.pushQueue(2);

	if(coada.firstQueue() != 9){
		console.log("Failed 7");
	}
	if(coada.lastQueue() != 2){
		console.log("Failed 8");
	}	

	coada.popQueue();

	if(coada.firstQueue() != 2){
		console.log("Failed 9");
	}

	if(coada.lastQueue() != 2){
		console.log("Failed 10");
	}

	coada.popQueue();

	if(coada.firstQueue() != undefined){
		console.log("Failed 11");
	}
	if(coada.lastQueue() != undefined){
		console.log("Failed 12");
	}

	coada.popQueue();

	if(coada.firstQueue() != undefined){
		console.log("Failed 13");
	}
	if(coada.lastQueue() != undefined){
		console.log("Failed 14");
	}
}

test1();