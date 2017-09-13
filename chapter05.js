/*
 * Add your solutions to the chapter 5 problems from the eloquentjs book.
 *    - DO NOT rename the functions below.
 *    - You may add other functions if you need them.
 *    - You may rename the parameters.
 *    - DO NOT modify the number of parameters for each function.
 */
const ancestry = require('./ancestry');

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

const byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});


// Problem 1: Flattening
function flatten(arrays) {
  var flattened = arrays.reduce(function(a, b) {
    return a.concat(b);}, []);
  return flattened;
}

// Problem 2: Mother-child age difference
/* This must return the average age difference instead of printing it */
function averageMomChildAgeDiff() {
	// filter out the record of a person whose mother is not in ancestry
	var inByName = ancestry.filter(function (person) {
	  return byName[person.mother] != undefined;});

	// get an array of age difference between mothers and children
	var ageDiff = inByName.map(function (person) {
	  return person.born - byName[person.mother].born;});

	// compute the average age difference between mothers and children
	// console.log(Math.round(average(ageDiff)*10)/10); // → 31.2
	return average(ageDiff);
}

// Problem 3: Historical life expectancy
/* This must return the object/map with centuries as keys and average age
    for the century as the value
 */
// average age of the people in the ancestry dataset per century. 
function averageAgeByCentury() {
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
	  //console.log(century + ": " + Math.round(agesPerCentury[century]*10)/10);
	}
	
	return agesPerCentury;
}


// Do not modify below here.
module.exports = { flatten, averageMomChildAgeDiff, averageAgeByCentury };

