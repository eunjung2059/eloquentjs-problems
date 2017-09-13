// Ch4. Data Structures: Objects and Arrays 

/// 1. The sum of a range 
// returns an array containing all the integer numbers from start up to (and including) end
function range (start, end) {
  var step = 1;
  if (arguments.length == 3) {
	step = arguments[2];
  }

  var result = [];
  
  if (step < 0) {
	for(var i = start; i >= end; i += step) {
	  result.push(i);
	}
  } else {
	for(var i = start; i <= end; i += step) {
	  result.push(i);
	}
  }

  return result;
}

// takes an array of numbers and returns the sum of these numbers.
function sum (numbers) {
  var result = 0;

  for (var i = 0; i < numbers.length; i++) {
	result = result + numbers[i];
  }
  return result;
}

// Test
console.log(range(1, 10));		// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));	// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));	// → 55

/// 2. Reversing an array
// return a copy of anArray in the reversed order
function reverseArray(anArray) {
  var reversed = [];
  var listLength = anArray.length;
  
  for (var i = 0; i < listLength; i++) {
	reversed[i] = anArray[listLength - 1 - i];
  }
  
  return reversed;
}

// modify anArray in the reversed order
function reverseArrayInPlace(anArray) {
  var temp = 0;
  var listLength = anArray.length;
  
  for (var i = 0; i < Math.floor(listLength / 2); i++) {
	temp = anArray[i];
	anArray[i] = anArray[listLength - 1 - i];
	anArray[listLength - 1 - i] = temp;
  }
}

// Test
console.log(reverseArray(["A", "B", "C"]));	// → ["C", "B", "A"];

var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);					// → [5, 4, 3, 2, 1]

/// 3. A list

// helper function for arrayToList
function prepend(element, aList){
  return { value: element, 
		   rest: aList };
}

// return a list converted from anArray
function arrayToList(anArray) {
  var aList = null;
  var arraySize = anArray.length;
	  
  for (var i = arraySize - 1; i >= 0; --i) {
	aList = prepend(anArray[i], aList);
  }
  
  return aList;
}

// returns the element at the given position in the list, or undefined when there is no such element.
function nth(aList, position) {
  if (aList == null) {
	return undefined;
  } else if (position == 0) {
	return aList.value;
  } else {
	return nth(aList.rest, --position);
  } 
}

// return an array converted from aList
function listToArray(aList) {
  var anArray = [];
  
  var i = 0;
  var value = nth(aList, i); 
  
  while (value != undefined) {
	anArray[i] = value;
	++i;
	value = nth(aList, i);
  }
  
  return anArray;
}

// Test
console.log(arrayToList([10, 20]));	// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));	// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));	// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));	// → 20

/// 4. Deep comparison

/* returns true only if they are the same value or are objects with the same 
properties whose values are also equal. */
function deepEqual(a, b) {
  if (a === b) {
	return true;
  }

  if (typeof a == "object" && a != null 
	  && 
	  typeof b == "object" && b != null) {
	
	// compare properties
	var countA = 0;
	var propertyA = [];
	var valueA = [];
	
	var countB = 0;
	var propertyB = [];
	var valueB = [];
	
	for (var property in a) {
	  ++countA;
	  propertyA.push(property);	
	  valueA.push(a[property]);
	}
	  
	for (var property in b) {
	  ++countB;
	  propertyB.push(property);	
	  valueB.push(b[property]);
	}
	
	// check if both have same number of properties
	if (countA != countB) {
	  return false;
	}
	
	// compare the property names
	for (var i = 0; i < countA; ++i) {
	  if (propertyA[i] != propertyB[i]) {
		return false;
	  }
	}
	
	// compare the property values
	for (var i = 0; i < countA; ++i) {
	  return deepEqual(valueA[i], valueB[i]);
	}
  } else {
	return false;
  }
  
}


var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));							// → true
console.log(deepEqual(obj, {here: 1, object: 2}));			// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));	// → true