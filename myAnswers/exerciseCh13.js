// Ch13. The Document Object Model

/// 1. Build a table
<style>
  /* Defines a cleaner look for tables */
  table  { border-collapse: collapse; }
  td, th { border: 1px solid black; padding: 3px 8px; }
  th     { text-align: left; }
</style>

<script>
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
  
  document.body.appendChild(buildTable(MOUNTAINS));
</script>

/// 2. Elements by tag name
<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
  
  function byTagName(node, tagName) {
    var tags = [];
    
    function recurOn(n, tN) {
      if (n.nodeType == document.ELEMENT_NODE) {
        
        // found the tag on this node
        if(n.tagName.toLowerCase() == tN) {
          tags.push(n);
        }

        // find the tag on the child nodes recursively
        for(var i = 0; i < n.childNodes.length; i++) {
          tags.concat(recurOn(n.childNodes[i], tN));
        }
      }

      return tags;
    }
    
    return recurOn(node, tagName);  
  }

  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  var para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>

/// 3. The cat's hat
<img src="img/cat.png" id="cat" style="position: absolute">
<img src="img/hat.png" id="hat" style="position: absolute">

<script>
  var cat = document.querySelector("#cat");
  var hat = document.querySelector("#hat");
  // Your code here.
  var angle = 0, lastTime = null;
  function animate(time) {
    if (lastTime != null)
      angle += (time - lastTime) * 0.001;
    lastTime = time;
    // cat floats around an ellipse
    cat.style.top = 120 + (Math.sin(angle) * 20) + "px";
    cat.style.left = 280 + (Math.cos(angle) * 200) + "px";
    // hat orbits on the cat
    hat.style.top = 120 + (Math.sin(angle) * 20) + (Math.sin(angle) * 100) + "px";
    hat.style.left = 280 + (Math.cos(angle) * 200) + (Math.cos(angle) * 80) + "px";
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
</script>