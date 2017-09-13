/*
 * Add your solutions to the chapter 4 problems from the eloquentjs book.
 *    - DO NOT rename the functions below.
 *    - You may add other functions if you need them.
 *    - You may rename the parameters.
 *    - DO NOT modify the number of parameters for each function.
 */


// Problem 1: The sum of a range
function range(start, end, step=1) {
  // var step = 1;
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

function sum(array) {
  var result = 0;

  for (var i = 0; i < array.length; i++) {
	result = result + array[i];
  }
  return result;
}

// Problem 2: Reversing an Array
function reverseArray(array) {
  var reversed = [];
  var listLength = array.length;
  
  for (var i = 0; i < listLength; i++) {
	reversed[i] = array[listLength - 1 - i];
  }
  
  return reversed;
}

function reverseArrayInPlace(array) {
  var temp = 0;
  var listLength = array.length;
  
  for (var i = 0; i < Math.floor(listLength / 2); i++) {
	temp = array[i];
	array[i] = array[listLength - 1 - i];
	array[listLength - 1 - i] = temp;
  }
}

// Problem 3: A List
function arrayToList(array) {
  var list = null;
  var arraySize = array.length;
	  
  for (var i = arraySize - 1; i >= 0; --i) {
	list = prepend(array[i], list);
  }
  
  return list;
}

function listToArray(list) {
  var array = [];
  
  var i = 0;
  var value = nth(list, i); 
  
  while (value != undefined) {
	array[i] = value;
	++i;
	value = nth(list, i);
  }
  
  return array;
}

function nth(list, position) {
  if (list == null) {
	return undefined;
  } else if (position == 0) {
	return list.value;
  } else {
	return nth(list.rest, --position);
  } 
}

function prepend(element, list) {
  return { value: element, 
		   rest: list };
}

// Problem 4: Deep comparison
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
	return true;
  }

  if (typeof obj1 == "object" && obj1 != null 
	  && 
	  typeof obj2 == "object" && obj2 != null) {
	
	// compare properties
	var countA = 0;
	var propertyA = [];
	var valueA = [];
	
	var countB = 0;
	var propertyB = [];
	var valueB = [];
	
	for (var property in obj1) {
	  ++countA;
	  propertyA.push(property);	
	  valueA.push(obj1[property]);
	}
	  
	for (var property in obj2) {
	  ++countB;
	  propertyB.push(property);	
	  valueB.push(obj2[property]);
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


// Do not modify below here.
module.exports = {
  range, sum, reverseArray, reverseArrayInPlace,
  arrayToList, listToArray, nth, prepend, deepEqual
};
