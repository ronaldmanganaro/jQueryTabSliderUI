/*
Ronald Manganaro(c) copyright 2016
Email: ronald_manganaro@student.uml.edu
COMP 3010 - 201 GUI Programming I
Assignment 8
Ronald Manganaro, Umass Lowell Computer Science
Date: November 22, 2016

Description: Added slider/tabs to the older assignment.
At the time of writing this the jquery validator is not working
for some reason, but everything else is. The slider work allowing
for a min and max value. I also added the feature that makes the
slider move when the +/- buttons on the input are clicked. The tabs
have check marks that can be used to select which tabs to delete and 
which to keep. The x's will delete the current tabs.
*/

// Find the button used to make the table,set onclick listener, validate input
var createBtn = document.getElementById("createBtn");
createBtn.onclick = (validate);

// inputfields are the form fields used to change style etc on bad/good input
var Inputfield = document.getElementsByTagName("input");

$(document).ready(function () {

    // Moves the slider if the user clicks +/- buttons
    $("input[name=firstInput]").bind('keyup input', function () {
        var tmp = parseInt($(this).val());
        console.log(tmp);
        $("div#sliderMinX").slider('option', 'value', tmp);
    });

    $("input[name=secondInput]").bind('keyup input', function () {
        var tmp = parseInt($(this).val());
        console.log(tmp);
        $("div#sliderMaxX").slider('option', 'value', tmp);
    });

    $("input[name=thirdInput]").bind('keyup input', function () {
        var tmp = parseInt($(this).val());
        console.log(tmp);
        $("div#sliderMinY").slider('option', 'value', tmp);
    });

    $("input[name=fourthInput]").bind('keyup input', function () {
        var tmp = parseInt($(this).val());
        console.log(tmp);
        $("div#sliderMaxY").slider('option', 'value', tmp);
    });

    // resets values back to reasonable input on refresh
    $("#firstInput").val(1);
    $("#secondInput").val(2);
    $("#thirdInput").val(3);
    $("#fourthInput").val(4);

    //sets up the sliders and awaits the slide event
    $(function () {
        $("div#sliderMinX").slider({
            min: 0,
            max: 100,
            slide: function (event, ui) {
                $("#firstInput").val(ui.value);
            }
        });
    });

    $(function () {
        $("div#sliderMaxX").slider({
            min: 0,
            max: 100,
            slide: function (event, ui) {
                $("#secondInput").val(ui.value);
            }
        });
    });

    $(function () {
        $("div#sliderMinY").slider({
            min: 0,
            max: 100,
            slide: function (event, ui) {
                $("#thirdInput").val(ui.value);
            }
        });
    });

    $(function () {
        $("div#sliderMaxY").slider({
            min: 0,
            max: 100,
            slide: function (event, ui) {
                $("#fourthInput").val(ui.value);
            }
        });
    });

    //checks to see if min is greater than max
    $.validator.addMethod('isGreater', function (value, element, param) {
        return this.optional(element) || value >= parseInt($(param).val());
    }, "The min value cannot be larger than the max value");

    //validates information on the fly
    $("#myForm").validate({
        rules: {
            firstInput: {
                required: true,
            },
            secondInput: {
                required: true,
                isGreater: firstInput
            },
            thirdInput: {
                required: true,
            },
            fourthInput: {
                required: true,
                isGreater: thirdInput
            }
        },
        messages: {
            firstInput: {
                required: "Can't be empty",
            },
            secondInput: {
                required: "Can't be empty",
                isGreater: "The min value can't be larger than the max value"
            },
            thirdInput: {
                required: "Can't be empty",
            },
            fourthInput: {
                required: "Can't be empty",
                isGreater: "The min value can't be larger than the max value"
            }
        },
    });
});

// Function check the four input fields for correctness
function validate() {
    var noneEmpty = 1; // used to make sure none of the inputs were blank

    // these store values that were entered into the forms
    var xMin = parseInt(document.forms["numbersForm"]["firstInput"].value)
    var xMax = parseInt(document.forms["numbersForm"]["secondInput"].value);
    var yMin = parseInt(document.forms["numbersForm"]["thirdInput"].value);
    var yMax = parseInt(document.forms["numbersForm"]["fourthInput"].value);

    if (xMax - xMin > 200 || yMax - yMin > 200) {
        alert("Cannot enter ranges with more than 200 elements");
    } else {
        // Checks to make sure not empty or value is too big/small
        if (xMin == null || xMin == "" || xMin >= xMax) {
            // Red means data entered in this field is incorrect
            Inputfield[0].style.borderColor = "red";
            noneEmpty = 0;
        } else {
            // If valid field will turn green
            Inputfield[0].style.borderColor = "green";
        }

        if (xMax == null || xMax == "") {
            Inputfield[1].style.borderColor = "red";
            noneEmpty = 0;
        } else {
            Inputfield[1].style.borderColor = "green";
        }

        if (yMin == null || yMin == "" || yMin >= yMax) {
            Inputfield[2].style.borderColor = "red";
            noneEmpty = 0;
        } else {
            Inputfield[2].style.borderColor = "green";
        }

        if (yMax == null || yMax == "") {
            Inputfield[3].style.borderColor = "red";
            noneEmpty = 0;
        } else {
            Inputfield[3].style.borderColor = "green";
        }

        // noneEmpty would be true if any of the fields were blank/incorrect
        if (noneEmpty) {
            console.log("Form 1's value is:" + xMin);
            console.log("Form 2's value is:" + xMax);
            console.log("Form 3's value is:" + yMin);
            console.log("Form 4's value is:" + yMax);
            // Create the table if no issues
            createTable(xMin, xMax, yMin, yMax);
        } else {
            // Sends a message to the user why no table was generated
            console.log("Form 1's value is:" + xMin);
            console.log("Form 2's value is:" + xMax);
            console.log("Form 3's value is:" + yMin);
            console.log("Form 4's value is:" + yMax);
            alert("Red Inputfield's were not filled in correctly!");
        }
    }
}

// Deletes the old table if it exists
function deleteTable() {
    if ((document.getElementById("theTable")) != null) {
        var table = document.getElementById("theTable"); // the old table

        // If the tables has any rows then must have created one already
        if (table.rows.length > 0) {
            var tableDiv = document.getElementById('tableDiv');
            tableDiv.removeChild(table);

            // recreate the empty table and add it back to the div
            var newTable = document.createElement("table");
            newTable.id = "theTable";
            tableDiv.appendChild(newTable);
        }
    } else
        console.log("There was no table!");
}

var tabcount = 1;

// Creates the table with Horizontal/Vertical ranges
function createTable(xMin, xMax, yMin, yMax) {
    //delete table if one already exists
    //deleteTable();
    //addTab();
    var x, y; // used to count cells
    x = y = 0;
    var cell; // used to change text of cells
    var row; // used to keep track of tmp rows 

    //creates tables as tabs are added
    var table = document.createElement("table");
    var tableid = "table" + tabcount;

    //var table = document.getElementById("theTable"); //the dyn table

    // for loop for creating the rows and columns
    for (i = yMin - 1; i <= yMax; i++) {
        row = table.insertRow(x);
        for (j = xMin - 1; j <= xMax; j++) {
            cell = row.insertCell(y);
            // case for first cell to make it blank
            if (y == 0 && x == 0)
                cell.innerHTML = " ";
            else if (x == 0) {
                cell.innerHTML = j;
            }
            else if (y == 0) {
                cell.innerHTML = i;
            }
            else {
                cell.innerHTML = i * j;
            }
            y++;
        }
        y = 0;
        x++;
    }

    //when done making the table adds the tab
    addTab(xMin, xMax, yMin, yMax, table);
}

var tabsdiv = $("#tabs");
var tabslist = tabsdiv.find("ul");

//param xMin, xMax, yMin, yMax display the table
//param table is the new table to add to the tab 
function addTab(xMin, xMax, yMin, yMax, table) {
    var tabname = "(" + xMin + ',' + xMax + ',' + yMin + ',' + yMax + ")";
    var tablink = 'href="#tab-"';

    //creates the tags for the tabslist
    tabslist.append('<li><a href="#tab-' + tabcount + '">' + 
    tabname + '</a> <input name="check" type="checkbox" id="checkbox' + 
    tabcount + '"><span id="tabspan' + 
    tabcount + '" class="ui-icon ui-icon-circle-close"></span></li>');
    
    // add content to the new tab 
    tabsdiv.append('<div id="tab-' + tabcount + '"><\/div>')
    $('#tab-' + tabcount).append(table);

    // refresh tabs and add to the number of them 
    $('#tabs').tabs("refresh");
    tabcount++;

}

// When close span clicked, it will close the closest tab
$("div#tabs").tabs().delegate("span.ui-icon-circle-close", "click", function () {
    var panelId = $(this).closest("li").remove().attr(
        "aria-controls");
    $("#" + panelId).remove();
    $("div#tabs").tabs("refresh");
});

$('#deleteTabs').click(function () {
    //loops through checkboxes that are checked
    $('input:checkbox:checked').each(function () {
        var panelId = $(this).closest("li").remove().attr(
            "aria-controls");
        $("#" + panelId).remove();
        $("div#tabs").tabs("refresh");
    });

    $('div#tabs').tabs("refresh");
});
