var $currentDay = $("#currentDay");



var currentDate = moment().format("dddd, MMMM Do");
console.log(currentDate);
var currentTime = moment().format("HH:mm:ss");
console.log(currentTime);

//Display date
$currentDay.text(currentDate);