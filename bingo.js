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

bingoCards.push(new BingoCard(1, [8, 2, 4, 11, 5, 17, 30, 19, 21, 26, 41, 45, 32, 43, 60, 57, 55, 48, 54, 75, 63, 61, 67, 73]));
bingoCards.push(new BingoCard(2, [7, 12, 2, 13, 3, 26, 24, 27, 30, 21, 41, 34, 32, 43, 58, 52, 56, 60, 46, 69, 75, 70, 72, 62])); 
bingoCards.push(new BingoCard(3, [13, 4, 8, 9, 10, 29, 24, 30, 21, 16, 44, 41, 40, 39, 58, 48, 49, 52, 55, 73, 62, 66, 68, 65])); 
bingoCards.push(new BingoCard(4, [13, 15, 6, 9, 12, 28, 24, 21, 16, 18, 42, 43, 34, 38, 48, 56, 51, 60, 58, 72, 62, 73, 74, 69])); 
bingoCards.push(new BingoCard(5, [1, 4, 10, 11, 13, 18, 22, 23, 25, 29, 34, 41, 40, 35, 48, 59, 60, 53, 55, 64, 68, 70, 72, 61])); 
bingoCards.push(new BingoCard(6, [2, 13, 15, 9, 6, 25, 28, 16, 20 ,23, 35, 33, 40, 39, 58, 48, 55, 59, 49, 75, 68, 64, 73, 74])); 
bingoCards.push(new BingoCard(7, [9, 13, 14, 2, 1, 16, 17, 24, 29, 28, 45, 40, 39, 33, 58, 54, 59, 46, 47, 74, 69, 73, 62, 61])); 
bingoCards.push(new BingoCard(8, [1, 8, 10, 12, 6, 23, 25, 27, 21, 16, 41, 31, 43, 42, 55, 53, 57, 51, 46, 61, 70, 68, 72, 66])); 
bingoCards.push(new BingoCard(9, [1, 4, 13, 10, 8, 23, 17, 16, 28, 26, 38, 31, 44, 40, 46, 50, 54, 58, 59, 61, 71, 68, 74, 64])); 
bingoCards.push(new BingoCard(10, [7, 8, 15, 10, 5, 19, 27, 30, 17, 20, 31, 44, 39, 37, 54, 49, 50, 47, 57, 61, 70, 63, 73, 65])); 
bingoCards.push(new BingoCard(11, [12, 2, 15, 1, 7, 22, 27, 30, 17, 16, 41, 42, 34, 36, 52, 46, 57, 47, 60, 62, 75, 72, 67, 61])); 
bingoCards.push(new BingoCard(12, [5, 10, 15, 12, 13, 25, 24, 21 ,27, 22, 42, 41, 45, 31, 50, 57, 52, 56, 60, 65, 71, 69, 62, 75])); 
bingoCards.push(new BingoCard(13, [8, 2, 15, 3, 4, 22, 25, 21, 24, 20, 44, 40, 39, 38, 49, 60, 53, 59, 51, 75, 67, 61, 65, 64])); 
bingoCards.push(new BingoCard(14, [10, 1, 14, 5, 7, 20 ,16, 29, 21, 22, 38, 44, 34, 35, 57, 50, 53, 48, 51, 71, 67, 73, 66, 72])); 
bingoCards.push(new BingoCard(15, [13, 3, 2, 10, 5, 23, 28, 17, 18, 19, 35, 40, 34, 43, 49, 58, 46, 50, 47, 73, 67, 74, 69, 61])); 
bingoCards.push(new BingoCard(16, [9, 2, 4, 7, 11, 17, 19, 22, 24, 26, 39, 35, 33, 32, 54, 47, 49, 56, 52, 71, 69, 62, 64, 67])); 
bingoCards.push(new BingoCard(17, [14, 3, 8, 9, 11, 16, 20, 23, 25, 21, 33, 35, 36, 39, 59, 49, 50, 53, 56, 75, 64, 68, 73, 74])); 
bingoCards.push(new BingoCard(18, [10, 12, 13, 7, 9, 23, 29, 26, 30, 22, 43, 44, 33, 42, 53, 56, 46, 50, 59, 64, 69, 73, 71, 70])); 
bingoCards.push(new BingoCard(19, [2, 6, 11, 15, 1, 24, 21, 19, 27, 28, 40, 43, 34, 45, 53, 60, 58, 47, 51, 62, 63, 64, 69, 73])); 
bingoCards.push(new BingoCard(20, [8, 12, 10, 3, 11, 27, 25, 26, 23, 18, 36, 32, 45, 38, 57, 55, 53, 56, 48, 68, 71, 69, 63, 72])); 
bingoCards.push(new BingoCard(21, [4, 6, 11, 10, 14, 21, 29, 28, 30, 16, 38, 37, 32, 43, 53, 54, 46, 48, 50, 68, 66, 65, 62, 75])); 
bingoCards.push(new BingoCard(22, [2, 4, 1, 12, 5, 17, 28, 27, 20, 23, 32, 35, 39, 40, 53, 54, 48, 57, 56, 64, 68, 67, 75, 73])); 
bingoCards.push(new BingoCard(23, [12, 15, 10, 9, 8, 24, 23, 25, 30, 27, 42, 34, 35, 36, 60, 57, 54, 53, 55, 75, 70, 72, 68, 69])); 
bingoCards.push(new BingoCard(24, [3, 1, 4, 13, 8, 16, 19, 18, 28, 23, 42, 40, 34, 33, 46, 49, 48, 53, 58, 63, 64, 61, 73, 68])); 
bingoCards.push(new BingoCard(25, [6, 8, 12, 14, 4, 22, 28, 18, 19, 24, 40, 43, 34, 38, 55, 59, 56, 47, 48, 70, 64, 71, 62, 73])); 
bingoCards.push(new BingoCard(26, [7, 6, 10, 5, 11, 22, 25, 30, 23, 16, 33, 45, 44, 38, 54, 52,49, 57, 59, 62, 66, 73, 67, 70])); 
bingoCards.push(new BingoCard(27, [3, 6, 14, 12, 2, 16, 22, 21, 24, 30, 33, 36, 40, 45, 47, 52, 51, 55, 58, 63, 64, 65, 67, 74)); 
bingoCards.push(new BingoCard(28, [4, 9, 7, 8, 14, 29, 19, 22, 24, 23, 33, 34, 41, 43, 59, 53, 49, 54, 52, 69, 67, 64, 74, 68])); 
bingoCards.push(new BingoCard(29, [12, 10, 13, 7, 2, 25, 28, 27, 22, 17, 36, 34, 43, 42, 55, 58, 57, 47, 52, 72, 73, 70 ,67, 62])); 
bingoCards.push(new BingoCard(30, [14, 11, 3, 6, 13, 22, 29, 24, 28, 18, 33, 40, 38, 39, 46, 59, 60, 48, 47, 66, 61, 67, 70, 72])); 
bingoCards.push(new BingoCard(31, [14, 4, 10, 11, 13, 30, 26, 24, 25, 28, 32, 36, 42, 39, 59, 50, 53, 52, 58, 71, 74, 68, 62, 72])); 
bingoCards.push(new BingoCard(32, [1, 2, 11, 12, 15, 17, 26, 27, 30, 16, 31, 36, 34, 33, 60, 57, 56, 46, 47, 62, 61, 71, 75, 72])); 
bingoCards.push(new BingoCard(33, [7, 14, 4, 3, 5, 28, 27, 17, 21, 30, 35, 44, 43, 37, 58, 49, 57, 53, 52, 61, 66, 68, 73, 75])); 
bingoCards.push(new BingoCard(34, [8, 9, 6, 12, 13, 20, 23, 30, 19, 24, 39, 42, 35, 45, 53, 51, 58, 49, 46, 67, 7, 63, 68, 64])); 
bingoCards.push(new BingoCard(35, [6, 9, 14, 4, 10, 24, 29, 19, 25, 21, 40, 44, 32, 36, 51, 54, 59, 49, 55, 69, 74, 70 ,64, 66])); 
bingoCards.push(new BingoCard(36, [7, 5, 14, 4, 11, 20, 27, 22, 28, 19, 41, 34, 38, 37, 56, 58, 52,57, 54, 63, 67, 64, 71, 74])); 
bingoCards.push(new BingoCard(37, [4, 10, 6, 5, 15, 21, 22, 28, 18, 19, 37, 38 ,40, 34, 54, 56, 46, 47, 49, 73, 64, 66, 75, 68])); 
bingoCards.push(new BingoCard(38, [2, 9, 13, 3, 10, 20, 25, 22, 28, 19, 39, 38, 42, 43, 58, 47, 51, 50 ,49, 69, 72, 65, 63, 66])); 
bingoCards.push(new BingoCard(39, [10, 1, 6, 9, 8, 28, 19, 21, 23, 24, 43, 45, 33, 34, 56, 60, 46, 48, 51, 72, 75, 62, 64, 68])); 
bingoCards.push(new BingoCard(40, [12, 15, 5, 10, 1, 30, 20, 25, 16, 27, 31, 35, 38, 42, 57, 60, 50, 55, 46, 75, 65, 61, 70, 72])); 
bingoCards.push(new BingoCard(41, [14, 2, 12, 11, 10, 26, 25, 27, 17, 29, 44, 36, 37, 38, 47, 59, 56, 55, 57, 62, 72, 74, 70, 71])); 
bingoCards.push(new BingoCard(42, [7, 12, 5, 2, 15, 27, 22, 23, 29, 24, 41, 43, 32, 33, 52, 56, 54, 58, 47, 67, 73, 71, 65, 61])); 
bingoCards.push(new BingoCard(43, [13, 1, 7, 8, 10, 30, 19, 20, 22, 26, 31, 38, 37, 32, 60, 56, 57, 50, 52, 61, 65, 67, 69, 73])); 
bingoCards.push(new BingoCard(44, [8, 14, 15, 4, 6, 19, 16, 17, 25, 27, 45, 39, 35, 33, 47, 46, 58, 51, 53, 72, 73, 75, 65, 66])); 
bingoCards.push(new BingoCard(45, [7, 13, 2, 1, 4, 23, 18, 24, 30, 25, 38, 35, 34, 33, 52, 57, 58, 46, 49, 67, 71, 75, 62, 74])); 
bingoCards.push(new BingoCard(46, [11, 1, 9, 6, 4, 16, 26, 27, 18, 28, 45, 32, 36, 37, 56, 60, 58, 47, 51, 71, 62, 75, 69, 65])); 
bingoCards.push(new BingoCard(47, [3, 10, 12, 14, 8, 25, 27, 29, 23, 18, 43, 33, 45, 44, 57, 55, 59, 53, 48, 63, 72, 70, 74, 68])); 
bingoCards.push(new BingoCard(48, [7, 10, 14, 1, 4, 23, 30, 17, 18, 21, 37, 44, 35, 32, 52, 55, 46, 47, 51, 64, 67, 61, 71, 66])); 
bingoCards.push(new BingoCard(49, [8, 11, 13, 12, 10, 20, 19, 18, 23, 27, 37, 33, 39, 38, 55, 53, 58, 48, 47, 73, 71, 75, 61, 68])); 
bingoCards.push(new BingoCard(50, [5, 2, 9, 6, 8, 18, 28, 27, 16, 23, 43, 45, 37, 38, 47, 56, 52, 55, 49, 68, 66, 69, 61, 72])); 
bingoCards.push(new BingoCard(51, [10, 11, 15, 1, 3, 26, 19, 20, 23, 25, 40, 43, 36, 42, 55, 51, 48, 58, 46, 74, 71, 65, 70, 73])); 
bingoCards.push(new BingoCard(52, [1, 2, 7, 8, 9, 17, 30, 16, 28, 18, 33, 42, 40, 37, 60, 56, 54, 50, 49, 64, 70 , 71, 67, 66])); 
bingoCards.push(new BingoCard(53, [10, 11, 13, 1, 3, 26, 25, 30, 17, 19, 42, 45, 35, 39, 58, 56, 55, 50, 51, 73, 74, 64, 66, 67])); 
bingoCards.push(new BingoCard(54, [12, 14, 4, 13, 5, 24, 17, 21, 29, 16, 32, 43, 35, 38, 47, 52, 57, 58, 48, 68, 64, 71, 73, 69])); 
bingoCards.push(new BingoCard(55, [15, 13, 1, 10, 5, 28, 16, 30, 25, 20 ,39, 37, 31, 45, 58, 46, 60, 50, 55, 75, 61, 73, 70, 65])); 
bingoCards.push(new BingoCard(56, [1, 4, 3, 9, 13, 16, 25, 19, 18, 24, 34, 36, 42, 44, 49, 46, 56, 52, 58, 61, 70, 65, 67, 73])); 
bingoCards.push(new BingoCard(57, [15, 3, 11, 9, 14, 28, 19, 18, 21, 27, 45, 33, 37, 42, 59, 49, 48, 52, 55, 75, 61, 62, 64, 71])); 
bingoCards.push(new BingoCard(58, [15, 4, 14, 2, 10, 24, 26, 18, 19, 29, 45, 33, 36, 41, 55, 60, 58, 57, 56, 68, 65, 71, 63, 70])); 
bingoCards.push(new BingoCard(59, [3, 6, 5, 13, 12, 21, 20, 28, 27, 18, 42, 43, 33, 40, 50, 58, 57, 48, 51, 66, 65, 63, 72, 73])); 
bingoCards.push(new BingoCard(60, [7, 8, 13, 14, 15, 23, 21, 22, 19, 24, 39, 33, 31, 43, 51, 47, 60, 56, 55, 70, 61, 62, 73, 72]));
bingoCards.push(new BingoCard(61, [11, 2, 13, 12, 7, 28, 29, 20, 25, 26, 44, 45, 32, 41, 46, 48, 53, 54, 56, 65, 71, 73, 67, 75])); 
bingoCards.push(new BingoCard(62, [10, 9, 7, 4, 6, 25, 20, 17, 26, 21, 34, 45, 41, 43, 47, 57, 54, 59, 50, 70, 65, 72, 68, 66])); 
bingoCards.push(new BingoCard(63, [2, 4, 13, 14, 15, 30, 29, 28, 19, 17, 45, 35, 34, 32, 49, 47, 59, 60, 58, 75, 74, 62, 73, 64])); 
bingoCards.push(new BingoCard(64, [8, 9, 14, 15, 1, 24, 22, 23, 20, 25, 40, 34, 32, 44, 52, 48, 46, 57, 56, 71, 62, 63, 74, 73])); 
bingoCards.push(new BingoCard(65, [1, 15, 13, 10, 2, 19, 16, 24, 26, 25, 31, 39, 40, 38, 50, 59, 47, 46, 60, 71, 69, 68, 64, 61])); 
bingoCards.push(new BingoCard(66, [1, 7, 8, 11, 9, 22, 19, 24, 16, 28, 36, 43, 45, 35, 50, 54, 51, 57, 55, 61, 64, 67, 68, 70])); 
bingoCards.push(new BingoCard(67, [1, 5, 11, 12, 10, 20, 24, 23, 30, 28, 41, 44, 37, 42, 47, 52, 54, 60, 58, 62, 64, 74, 71, 67])); 
bingoCards.push(new BingoCard(68, [5, 12, 14, 1, 3, 17, 23, 26, 29, 20, 35, 41, 34, 32, 59, 50, 60, 49, 46, 72, 69, 65, 62, 74])); 
bingoCards.push(new BingoCard(69, [12, 3, 14, 13, 8, 29, 30, 21, 26, 27, 45, 31, 33, 42, 47, 49, 54, 55, 57, 66, 72, 74, 68, 61])); 
bingoCards.push(new BingoCard(70, [11, 4, 6, 8, 10, 16, 17, 21, 22, 23, 33, 140, 36, 35, 53, 58, 56, 48, 50, 62, 63, 65, 68, 70])); 
bingoCards.push(new BingoCard(71, [12, 13, 6, 4, 5, 25, 21, 18, 29, 30, 32, 45, 31, 34, 46, 55, 56, 57, 59,72, 69, 66, 64, 75])); 
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
// bingoCards.push(new BingoCard(, []));
