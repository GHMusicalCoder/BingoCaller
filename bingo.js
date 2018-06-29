// configure variables
var calledNumbers = [];
var calledBs = [];
var calledIs = [];
var calledNs = [];
var calledGs = [];
var calledOs = [];
var bingoCards = [];

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
    testForBingo(possibleNumber)
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
    for (i = 0; ++i < BingoCards.length;) {
        BingoCards[i]['calledNumbers']
    }
}

function getCalledHTML(numbers) {
    var $html = '';

}

function testForBingo(number) {

}

class BingoCard {
    constructor(number, cardNumbers) {
        this.number = number;
        this.cardNumbers = cardNumbers.splice(12, 0, 99);
        this.calledNumbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.isBingo = false;
    }
}

// card = {
//     number: 0,
//     cardNumbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     calledNumbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// }

bingoCards.push(new BingoCard(1, [4, 8, 3, 9, 11, 21, 18, 30, 25, 22, 33, 35, 31, 44, 55, 49, 52, 59, 48, 61, 67, 75, 69, 63]));
