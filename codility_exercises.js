/*
Lesson 1: Iterations. 
Binary Gap - Find the longest sequence of zeros in binary representation of an integer.
https://codility.com/programmers/lessons/1-iterations/
*/

function solution(N) {
    var counter = 0, max = 0, bool = false;
    var binaryN = N.toString(2);
    var arrayN = binaryN.split("");
    for (var i=0; i < binaryN.length; i++){
        if (arrayN[i] == 1){
            if (counter > max){
                max = counter;
            }
            bool = true;
            counter = 0;
        }
        else if (bool){
        counter +=1;
        }
    }
    return max;
}
