/*
 * Add your solution to the chapter 13 problem from the eloquentjs book.
 *    - DO NOT rename the functions below.
 *    - You may add other functions if you need them.
 *    - You may rename the parameters.
 *    - DO NOT modify the number of parameters for each function.
 */


// Problem 1: Build table
function buildTable(data) {
	// create a table
	var table = document.createElement("table");

	// add heading
	var headRow = appendRow();
	var headings = Object.keys(data[0]);
	addLine("th", headings, headRow);

	// add data rows
	for (var i = 0; i < data.length; i++) {
	  var line = Object.values(data[i]);
	  var dataRow = appendRow();
	  addLine("td", line, dataRow);
	}

	// add a row structure on the table, then return the row
	function appendRow() {
	  var row = document.createElement("tr");
	  table.appendChild(row);
	  return row;
	}

	// taking a line of data, create a cell and append the cell to parent
	function addLine(cellType, line, parent) {
	  for (var i = 0; i < line.length; i++) {
		var cell = document.createElement(cellType);       
		cell.appendChild(document.createTextNode(line[i]));
		
		// right-align cells containing numbers
		if (typeof line[i] == "number") {
		  cell.style.textAlign = "right";
		}
		  
		parent.appendChild(cell);
	  }
	}

	return table;
}


// Do not modify below here.
module.exports = { buildTable };
