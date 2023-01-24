var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//each object has a hour property and a text property

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//if we don't have any todos set up, let's set up the array of objects
function initializeSchedule() {

    //for each time block
    $timeBlocks.each(function () {
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        var todoObj = {
            hour: thisBlockHr,
            //get text ready to accept string input
            text: "",
        }
        //add this todo object to todoitems array
        toDoItems.push(todoObj);
    });


    // localStorage.setItem("todos", JSON.stringify(toDoItems));
    localStorage.setItem("todos", JSON.stringify(toDoItems))

}

//format timeblock colors depending on time
function setUpTimeBlocks() {
    $timeBlocks.each(function () {
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        //add style to time blocks to show where we are in the day
        if (thisBlockHr == currentHour) {
            $thisBlock.addClass("present").removeClass("past future");
        }
        if (thisBlockHr < currentHour) {
            $thisBlock.addClass("past").removeClass("present future");
        }
        if (thisBlockHr > currentHour) {
            $thisBlock.addClass("future").removeClass("past present");
        }
    });
}

function renderSchedule() {

    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);

    //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
    for (var i = 0; i < toDoItems.length; i++) {
        var itemHour = toDoItems[i].hour;
        var itemText = toDoItems[i].text;

        $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }

    console.log(toDoItems);
}

function saveHandler() {
    var $thisBlock = $(this).parent();

    var hourToUpdate = $(this).parent().attr("data-hour");
    var itemToAdd = (($(this).parent()).children("textarea")).val();

    //see which item we need to update based on the hour of the button clicked matching
    for (var j = 0; j < toDoItems.length; j++) {
        if (toDoItems[j].hour == hourToUpdate) {
            //set its text to what was added to textarea
            toDoItems[j].text = itemToAdd;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
}

// when the document loads
$(document).ready(function () {

    //format the timeblocks depending on time
    setUpTimeBlocks();
    //if there's nothing for the todos in local storage
    if (!localStorage.getItem("todos")) {
        //initialize the array of objects
        initializeSchedule();
    } //otherwise dont bother bc we get it from local storage

    //display current date
    $currentDay.text(currentDate);

    //render schedule from local storage
    renderSchedule();
    $scheduleArea.on("click", "button", saveHandler);

});