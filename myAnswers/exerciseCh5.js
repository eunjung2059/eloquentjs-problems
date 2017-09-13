// Ch5. Higher-Order Functions

/// 1. flattening
// “flatten” an array of arrays into a single array
var arrays = [[1, 2, 3], [4, 5], [6]];

function flatten(anArray) {
  var flattened = anArray.reduce(function(a, b) {
    return a.concat(b);}, []);
  return flattened;
}

console.log(flatten(arrays));	// → [1, 2, 3, 4, 5, 6]

/// 2. mother-child age difference
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// filter out the record of a person whose mother is not in ancestry
var inByName = ancestry.filter(function (person) {
  return byName[person.mother] != undefined;});

// get an array of age difference between mothers and children
var ageDiff = inByName.map(function (person) {
  return person.born - byName[person.mother].born;});

// compute the average age difference between mothers and children
console.log(Math.round(average(ageDiff)*10)/10);	// → 31.2

/// 3. historical life expectancy
// compute and output the average age of the people in the ancestry data set per century. 
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// store the lists of ages for each century
var agesPerCentury = {};

// categorize the ages in the ancestry data for each century
ancestry.forEach(function (person) {
  if (agesPerCentury[Math.ceil(person.died/100)]) {
    agesPerCentury[Math.ceil(person.died/100)].push(person.died - person.born);
  } else {
    agesPerCentury[Math.ceil(person.died/100)] = [person.died - person.born];
  }
});

// compute and display the average age for each century
for (var century in agesPerCentury) {
  agesPerCentury[century] = average(agesPerCentury[century]);
  
  // display by rounding up to the first position after the decimal point
  console.log(century + ": " + Math.round(agesPerCentury[century]*10)/10);
}
	
// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94

/// 4. every and then some
// Take a predicate function 'f' that, when called with an 'array' element as argument, returns true or false. 

// every returns true only when the predicate returns true for all elements of the array.
function every(array, f) {
  for (var i = 0; i < array.length; i++) {
    if (!f(array[i])) {
      return false;
    }
  }
  return true;
}

// some returns true as soon as the predicate returns true for any of the elements.
function some(array, f) {
  for (var i = 0; i < array.length; i++) {
    if (f(array[i])) {
      return true;
    }
  }
  return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false