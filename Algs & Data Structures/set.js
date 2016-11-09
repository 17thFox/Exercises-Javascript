function mySet(){
	this.array = [];
	this.size = 0;
}

mySet.prototype.addSet = function(number){

	if(this.size == 0)
	{
		this.array[this.size] = number;
		this.size += 1;
		return;
	}

	var has = this.hasSet(number);
	if(has){
		return 'The number already exists';
	}

	var min = 1000;
	var arrayTemp = this.array;

	for (var i = 0; i < this.size; i ++){
		if(number < this.array[i] && min > i){
			min = i;
		}
		else if(number > this.array[i]){
			min = -1;
		}
	}		
	
	if (min === -1) {
		this.array[this.size] = number;
		this.size += 1;
		return;
	}
	else{
		this.array[min] = number;
		this.size += 1;
		for (var j = min + 1; j < this.size; j ++) {
			this.array[j] = arrayTemp[j-1]; 
		}
	}
	
	
}

mySet.prototype.deleteSet = function(number){
	if(this.size == 0)
	{
		return;
	}

	var arrayTemp = this.array;
	var found = -1;
	for (var i = 0; i < this.size; i ++){
		if (number == this.array[i]){
			found = i;
		}
	}		
	
	for (var i = found; i < arrayTemp.length -1; i ++) {
		this.array[i] = arrayTemp[i+1]; 
	}
	this.size -= 1;
}

mySet.prototype.hasSet = function(number){
	if(this.size == 0)
	{
		return;
	}
	for (var i = 0; i < this.size; i ++){
		if (number == this.array[i]){
			return true;	
		}
	}
	return false;
		
}

function test1(){
	var set = new mySet();

	set.addSet(9);

	set.addSet(2);

	set.addSet(3);

	if(set.hasSet(9) != true){
		console.log("Failed 1");
	}


	if(set.addSet(9) != 'The number already exists'){
		console.log("Failed 2");
	}

	set.deleteSet(3);

	if(set.hasSet(3) != false){
		console.log("Failed 3");
	}

}

test1();