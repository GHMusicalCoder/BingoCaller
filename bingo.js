// configure variables
var calledNumbers = [];
var calledBs = [];
var calledIs = [];
var calledNs = [];
var calledGs = [];
var calledOs = [];

$(document).ready(function () {
    resetBingo();
});


function getBingoNumber() {
    var bingo = generateBingoNumber();
    $('#numbersB').html(calledBs.sort((a, b) => a - b).join(" : "));
    $('#numbersI').html(calledIs.sort((a, b) => a - b).join(" : "));
    $('#numbersN').html(calledNs.sort((a, b) => a - b).join(" : "));
    $('#numbersG').html(calledGs.sort((a, b) => a - b).join(" : "));
    $('#numbersO').html(calledOs.sort((a, b) => a - b).join(" : "));
    $('#calledNumber').html(bingo);
}

function getBingoValue(number) {
    if (number < 16) {
        calledBs.push(number);
        return "B " + number;
    } else if (number < 31) {
        calledIs.push(number);
        return "I " + number;
    } else if (number < 46) {
        calledNs.push(number);
        return "N " + number;
    } else if (number < 61) {
        calledGs.push(number);
        return "G " + number;
    } else {
        calledOs.push(number);
        return "O " + number;
    }
}

function generateBingoNumber() {
    var possibleNumber = Math.floor(Math.random() * Math.floor(75)) + 1;
    while (calledNumbers.includes(possibleNumber)) {
        possibleNumber = Math.floor(Math.random() * Math.floor(75)) + 1;
    }

    //we should now have an uncalled number
    calledNumbers.push(possibleNumber);
    if (calledNumbers.length === 75) {
        $('#btnNext').hide();
    }
    return getBingoValue(possibleNumber);
}


function resetBingo() {
    calledNumbers = [];
    calledBs = [];
    calledIs = [];
    calledNs = [];
    calledGs = [];
    calledOs = [];
    $('#numbersB').html("");
    $('#numbersI').html("");
    $('#numbersN').html("");
    $('#numbersG').html("");
    $('#numbersO').html("");
    $('#calledNumber').html("Waiting...");
    $('#btnNext').show();
}

function getCalledHTML(numbers) {
    var $html = '';

}