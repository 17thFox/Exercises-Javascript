function myStack(){
	this.array = [];
	this.size = 0;
}

myStack.prototype.pushStack = function(number){
	this.array[this.size] = number;
	this.size += 1;
}

myStack.prototype.popStack = function(){
	if(this.size == 0)
	{
		return;
	}
	this.size -= 1;
}


myStack.prototype.topStack = function(){
	if(this.size == 0){
		return undefined;
	}
	return this.array[this.size - 1];
}


function test1(){
	var stiva = new myStack();
	stiva.pushStack(3);
	if (stiva.topStack() != 3){
		console.log("Failed 1");
	}
	stiva.pushStack(2);
	if (stiva.topStack() != 2){
		console.log("Failed 2");
	}
}



function test2(){
	var stiva = new myStack();
	if (stiva.topStack() != undefined){
		console.log("Failed 3");
	}
	stiva.pushStack(9);
	stiva.pushStack(10);
	if (stiva.topStack() != 10){
		console.log("Failed 4");
	}
	stiva.popStack();
	if (stiva.topStack() != 9){
		console.log("Failed 5");
	}
	stiva.popStack();
	if (stiva.topStack() != undefined){
		console.log("Failed 6");
	}
	stiva.popStack();
	if (stiva.topStack() != undefined){
		console.log("Failed 7");
	}
	stiva.popStack();
	stiva.pushStack(10);
	if (stiva.topStack() != 10){
		console.log("Failed 8");
	}
}
