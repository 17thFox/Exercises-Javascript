function guessTheNumber(target, min, max){

	guess = Math.floor((min+max)/2);

	if(max < min){
		console.log("Not found");	
		return "Not found";
	}

	if (array[guess] == target){
		bigAndSmall(guess);
		console.log("You found it!");		
		return "You found it!";
	}

	if (array[guess] < target){
		min = guess + 1;
		console.log("Your min is now: " + min);
		guessTheNumber(target, min, max);
	}

	if (array[guess] > target){
		max = guess - 1;
		console.log("Your max is now: " + max);
		guessTheNumber(target, min, max);
	}

}


function bigAndSmall(guess){
	console.log("The smallest number bigger than your target is: " + array[guess + 1]);
	console.log("The biggest number smaller than your target is: " + array[guess - 1]);
}

let min = 0;
var array= [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89];
let max = array.length-1;
var target = 18;
var guess = undefined;

guessTheNumber(target, min, max);

