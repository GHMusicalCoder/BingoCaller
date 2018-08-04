// configure variables
var calledNumbers = [];
var calledBs = [];
var calledIs = [];
var calledNs = [];
var calledGs = [];
var calledOs = [];
var bingoCards = [];
var showRemaining = 6;


// classes
class BingoCard {
    constructor(number, cardValues) {
        this.number = number;
        this.cardNumbers = cardValues;
        this.cardNumbers.splice(12, 0, 99);
        this.calledNumbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.bingos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.hasBingo = false;
        this.hasDouble = false;
        this.hasCover = false;
        this.remaining = 24;
    }

    checkBingo() {
        this.hasBingo = this.bingos.reduce((a, b) => a + b) > 0;
        this.hasCover = this.bingos.reduce((a, b) => a + b) === 13;
        this.hasDouble = this.bingos.reduce((a, b) => a + b) > 1;
        this.remaining = 25 - this.calledNumbers.filter(function (x) { return x == 1}).length;
    }
}


// ready functions
$(document).ready(function () {
    resetBingo();
    validateCards();
    checkManual();
});


function getBingoNumber() {
    var bingo = generateBingoNumber();
    $('#calledNumber').html(bingo);
    displayBingoNumber()
    displayRemaining()
}

function displayBingoNumber() {
    $('#numbersB').html(calledBs.sort((a, b) => a - b).join(" : "));
    $('#numbersI').html(calledIs.sort((a, b) => a - b).join(" : "));
    $('#numbersN').html(calledNs.sort((a, b) => a - b).join(" : "));
    $('#numbersG').html(calledGs.sort((a, b) => a - b).join(" : "));
    $('#numbersO').html(calledOs.sort((a, b) => a - b).join(" : "));
}

function displayRemaining() {
    $('#remainB').html("(" + (15 - calledBs.length).toString() + ")");
    $('#remainI').html("(" + (15 - calledIs.length).toString() + ")");
    $('#remainN').html("(" + (15 - calledNs.length).toString() + ")");
    $('#remainG').html("(" + (15 - calledGs.length).toString() + ")");
    $('#remainO').html("(" + (15 - calledOs.length).toString() + ")");
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
    if ($('#chkManual').prop('checked'))
        possibleNumber = parseInt($('#txtManual').val());
    else {
        var possibleNumber = Math.floor(Math.random() * Math.floor(75)) + 1;
        while (calledNumbers.includes(possibleNumber)) {
            possibleNumber = Math.floor(Math.random() * Math.floor(75)) + 1;
        }
    }


    //we should now have an uncalled number
    calledNumbers.push(possibleNumber);
    if (calledNumbers.length === 75) {
        $('#btnNext').hide();
    }

    if (calledNumbers.length >= 4) testForBingo(possibleNumber)
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
    $('#divBingos').html("");
    $('#btnNext').show();
    displayRemaining()
    bingoCards.forEach(function (x) {
        x.calledNumbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        x.bingos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        x.hasBingo = false;
        x.hasDouble = false;
        x.hasCover = false;
    });
    showRemaining = 6;
    $('#chkManual').prop('checked', false);
    checkManual();
}


function testForBingo(number) {
    var $html = "";
    bingoCards.forEach(function (x, i) {
       if (x.cardNumbers.indexOf(number) > -1) {
           //bingo card has number
           x.calledNumbers[x.cardNumbers.indexOf(number)] = 1;

           //test for bingo
           if (x.calledNumbers[0] && x.calledNumbers[1] && x.calledNumbers[2] && x.calledNumbers[3] && x.calledNumbers[4]) setBingo(i, 0);
           if (x.calledNumbers[5] && x.calledNumbers[6] && x.calledNumbers[7] && x.calledNumbers[8] && x.calledNumbers[9]) setBingo(i, 1);
           if (x.calledNumbers[10] && x.calledNumbers[11] && x.calledNumbers[12] && x.calledNumbers[13] && x.calledNumbers[14]) setBingo(i, 2);
           if (x.calledNumbers[15] && x.calledNumbers[16] && x.calledNumbers[17] && x.calledNumbers[18] && x.calledNumbers[19]) setBingo(i, 3);
           if (x.calledNumbers[20] && x.calledNumbers[21] && x.calledNumbers[22] && x.calledNumbers[23] && x.calledNumbers[24]) setBingo(i, 4);
           if (x.calledNumbers[0] && x.calledNumbers[5] && x.calledNumbers[10] && x.calledNumbers[15] && x.calledNumbers[20]) setBingo(i, 5);
           if (x.calledNumbers[1] && x.calledNumbers[6] && x.calledNumbers[11] && x.calledNumbers[16] && x.calledNumbers[21]) setBingo(i, 6);
           if (x.calledNumbers[2] && x.calledNumbers[7] && x.calledNumbers[12] && x.calledNumbers[17] && x.calledNumbers[22]) setBingo(i, 7);
           if (x.calledNumbers[3] && x.calledNumbers[8] && x.calledNumbers[13] && x.calledNumbers[18] && x.calledNumbers[23]) setBingo(i, 8);
           if (x.calledNumbers[4] && x.calledNumbers[9] && x.calledNumbers[14] && x.calledNumbers[19] && x.calledNumbers[24]) setBingo(i, 9);
           if (x.calledNumbers[0] && x.calledNumbers[6] && x.calledNumbers[12] && x.calledNumbers[18] && x.calledNumbers[24]) setBingo(i, 10);
           if (x.calledNumbers[20] && x.calledNumbers[16] && x.calledNumbers[12] && x.calledNumbers[8] && x.calledNumbers[4]) setBingo(i, 11);
           if (x.calledNumbers[0] && x.calledNumbers[4] && x.calledNumbers[20] && x.calledNumbers[24]) setBingo(i, 12);
       }
       if (x.hasBingo) {
           if ($('#chkCover').prop('checked')) {
               // we are only worried about a coverall
               if (x.hasCover) $html += `<span class="bingo">Card # ${x.number} has THE COVER ALL!<br /></span><br />`;
               else if (x.remaining < showRemaining) {
                   $html += `Card # ${x.number} only has ${x.remaining} spaces remaining...<br />`;
                   if (showRemaining === 6 && x.remaining === 3) showRemaining = 5;
                   if (showRemaining === 5 && x.remaining === 2) showRemaining = 4;
                   if (showRemaining === 4 && x.remaining === 1) showRemaining = 3;
               }
           } else if ($('#chkDouble').prop('checked')) {
               // we want both people at 1 bingo and both
               index = x.bingos.indexOf(1);
               if (x.hasDouble) $html += `<span class="bingo">Card # ${x.number} has DOUBLE BINGO at ${bingoLocation(index)} & ${bingoLocation(1, index+1)}!<br /></span>`;
               else $html += `Card # ${x.number} has a single bingo at ${bingoLocation(x.bingos.indexOf(1))}!<br />`;
           } else {
               // single bingos
               $html += `<span class="bingo">Card # ${x.number} has a BINGO at ${bingoLocation(x.bingos.indexOf(1))}!<br /></span>`;
           }
       }

    });

    if ($html === "") $html = "NO BINGOS YET!!!";

    $("#divBingos").html($html);
}


function setBingo(index, bingo) {
     bingoCards[index].bingos[bingo] = 1;
     bingoCards[index].checkBingo();
}


function bingoLocation(index) {
    switch (index) {
        case 0: return 'B Column';
        case 1: return 'I Column';
        case 2: return 'N Column';
        case 3: return 'G Column';
        case 4: return 'O Column';
        case 5: return 'Top Row';
        case 6: return 'Top-Mid Row';
        case 7: return 'Middle Row';
        case 8: return 'Mid-Bottom Row';
        case 9: return 'Bottom Row';
        case 10: return 'Diagonal from Top B to Bottom O';
        case 11: return 'Diagonal from Top O to Bottom B';
        case 12: return '4 Corners';
    }
}

function checkManual() {
    if ($('#chkManual').prop('checked'))
        $('#txtManual').show()
    else
        $('#txtManual').hide()
}

// Card Validation Functions
function validateCards() {
    // loop thru bingo cards and verify all is legit
    bingoCards.forEach(function (x) {
        if (x.cardNumbers.length !== 25) alert(`Card # ${x.number} does not have the correct number of cards`);

        if (!x.cardNumbers.slice(0,5).every(validateB)) alert(`Card # ${x.number} has an incorrect B value`);
        if (!x.cardNumbers.slice(5, 10).every(validateI)) alert(`Card # ${x.number} has an incorrect I value`);
        if (!x.cardNumbers.slice(10, 15).every(validateN)) alert(`Card # ${x.number} has an incorrect N value`);
        if (!x.cardNumbers.slice(15, 20).every(validateG)) alert(`Card # ${x.number} has an incorrect G value`);
        if (!x.cardNumbers.slice(20, 25).every(validateO)) alert(`Card # ${x.number} has an incorrect O value`);

        const counter = (prev, next) => Object.assign(prev, { [next] : (prev[next] || 0) + 1 });
        const singles = function(key) { return this[key] === 1 };
        const extras = function(key) { return this[key] > 1 };

        const counted = x.cardNumbers.reduce(counter, {});
        const duplicates = Object.keys(counted).filter(extras.bind(counted));

        if (duplicates.length > 0) alert(`Card # ${x.number} has an duplicate value`);
    })
}

function validateB(value) {
    return value < 16;
}

function validateI(value) {
    return value > 15 && value < 31;
}

function validateN(value) {
    return (value > 30 && value < 46) || value === 99;
}

function validateG(value) {
    return value > 45 && value < 61;
}

function validateO(value) {
    return value > 60 && value < 76;
}



// Bingo Cards
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
bingoCards.push(new BingoCard(27, [3, 6, 14, 12, 2, 16, 22, 21, 24, 30, 33, 36, 40, 45, 47, 52, 51, 55, 58, 63, 64, 65, 67, 74]));
bingoCards.push(new BingoCard(28, [4, 9, 7, 8, 14, 29, 19, 22, 24, 23, 33, 34, 41, 43, 59, 53, 49, 54, 52, 69, 67, 64, 74, 68])); 
bingoCards.push(new BingoCard(29, [12, 10, 13, 7, 2, 25, 28, 27, 22, 17, 36, 34, 43, 42, 55, 58, 57, 47, 52, 72, 73, 70 ,67, 62])); 
bingoCards.push(new BingoCard(30, [14, 11, 3, 6, 13, 22, 29, 24, 28, 18, 33, 40, 38, 39, 46, 59, 60, 48, 47, 66, 61, 67, 70, 72])); 
bingoCards.push(new BingoCard(31, [14, 4, 10, 11, 13, 30, 26, 24, 25, 28, 32, 36, 42, 39, 59, 50, 53, 52, 58, 71, 74, 68, 62, 72])); 
bingoCards.push(new BingoCard(32, [1, 2, 11, 12, 15, 17, 26, 27, 30, 16, 31, 36, 34, 33, 60, 57, 56, 46, 47, 62, 61, 71, 75, 72])); 
bingoCards.push(new BingoCard(33, [7, 14, 4, 3, 5, 28, 27, 17, 21, 30, 35, 44, 43, 37, 58, 49, 57, 53, 52, 61, 66, 68, 73, 75])); 
bingoCards.push(new BingoCard(34, [8, 9, 6, 12, 13, 20, 23, 30, 19, 24, 39, 42, 35, 45, 53, 51, 58, 49, 46, 67, 72, 63, 68, 64]));
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
bingoCards.push(new BingoCard(70, [11, 4, 6, 8, 10, 16, 17, 21, 22, 23, 33, 40, 36, 35, 53, 58, 56, 48, 50, 62, 63, 65, 68, 70]));
bingoCards.push(new BingoCard(71, [12, 13, 6, 4, 5, 25, 21, 18, 29, 30, 32, 45, 31, 34, 46, 55, 56, 57, 59,72, 69, 66, 64, 75])); 
bingoCards.push(new BingoCard(72, [3, 8, 6, 7, 13, 28, 18, 21, 23, 22, 32, 33, 40, 42, 58, 52, 48, 53, 51, 68, 66, 63, 73, 67]));
bingoCards.push(new BingoCard(73, [6, 12, 8, 7, 2, 23, 24, 30, 20, 21, 39, 40, 42, 36, 56, 58, 48, 49, 51, 75, 66, 68, 62, 70]));
bingoCards.push(new BingoCard(74, [5, 14, 7, 15, 1, 19, 20, 18, 21, 17, 43, 37, 36, 35, 46, 54, 50, 56, 48, 72, 64, 73, 63, 62]));
bingoCards.push(new BingoCard(75, [2, 7, 10, 14, 1, 23, 19, 29, 25, 30, 44, 32, 34, 42, 49, 50, 57, 59, 46, 63, 66, 67, 72, 75]));
bingoCards.push(new BingoCard(76, [12, 7, 8, 2, 3, 18, 17, 23, 22, 27, 42, 37, 35, 36, 53, 48, 47, 57, 52, 68, 72, 67, 63, 62]));
bingoCards.push(new BingoCard(77, [1, 12, 10, 8, 14, 16, 25, 27, 29, 23, 31, 32, 35, 40, 57, 55, 46, 59, 53, 61, 70, 68, 72, 74]));
bingoCards.push(new BingoCard(78, [11, 4, 13, 6, 7, 25, 26, 24, 27, 23, 34, 43, 42, 41, 52, 60, 56, 47, 54, 63, 70, 64, 69, 68]));
bingoCards.push(new BingoCard(79, [2, 1, 11, 9, 7, 17, 21, 16, 25, 20, 34, 42, 32, 40, 47, 53, 59, 49, 57, 74, 62, 68, 63, 71]));
bingoCards.push(new BingoCard(80, [3, 2, 12, 10, 8, 18, 22, 17, 26, 21, 35, 43, 33, 41, 48, 54, 60, 50, 58, 75, 63, 69, 64, 72]));
bingoCards.push(new BingoCard(81, [9, 7, 10, 4, 11, 19, 25, 27, 18, 20, 33, 36, 37, 42, 55, 51, 58, 54, 48, 64, 73, 62, 69, 75]));
bingoCards.push(new BingoCard(82, [1, 3, 7, 8, 12, 16, 19, 20, 23, 29, 32, 38, 44, 37, 47, 48, 50, 51, 55, 62, 66, 68, 70, 74]));
bingoCards.push(new BingoCard(83, [1, 6, 8, 9, 11, 21, 23, 24, 26, 16, 40, 42, 31, 38, 53, 54, 56, 46, 51, 61, 66, 68, 69, 71]));
bingoCards.push(new BingoCard(84, [13, 7, 8, 15, 14, 19, 27, 23, 20, 26, 36, 33, 34, 44, 54, 51, 46, 59, 49, 72, 67, 68, 69, 75]));
bingoCards.push(new BingoCard(85, [6, 10, 15, 12, 13, 26, 25, 22, 28, 23, 42, 41, 45, 31, 50, 57, 53, 58, 46, 66, 72, 70, 63, 61]));
bingoCards.push(new BingoCard(86, [4, 6, 10, 11, 15, 19, 22, 23, 26, 17, 35, 41, 32, 40, 50, 51, 53, 54, 58, 65, 69, 71, 73, 62]));
bingoCards.push(new BingoCard(87, [10, 1, 12, 13, 6, 21, 28, 27, 16, 25, 43, 40, 45, 31, 58, 46, 55, 57, 51, 66, 70, 61, 72, 73]));
bingoCards.push(new BingoCard(88, [9, 14, 1, 2, 8, 22, 21, 30, 28, 27, 40, 42, 43, 45, 58, 50, 53, 54, 56, 69, 66, 63, 75, 70]));
bingoCards.push(new BingoCard(89, [5, 11, 7, 6, 1, 22, 23, 29, 19, 20, 38, 39, 41, 35, 55, 57, 47, 48, 50, 74, 65, 67, 61, 69]));
bingoCards.push(new BingoCard(90, [7, 9, 13, 14, 3, 22, 25, 26, 29, 20, 38, 44, 35, 43, 53, 54, 56, 57, 46, 68, 72, 74, 61, 65]));
bingoCards.push(new BingoCard(91, [1, 4, 14, 13, 12, 28, 27, 29, 19, 16, 31, 38, 39, 40, 49, 46, 58, 57, 59, 64, 74, 61, 72, 73]));
bingoCards.push(new BingoCard(92, [14, 15, 5, 6, 7, 30, 28, 29, 26, 16, 31, 40, 38, 35, 58, 54, 52, 48, 47, 62, 68, 69, 65, 64]));
bingoCards.push(new BingoCard(93, [7, 6, 4, 1, 8, 25, 22, 30, 17, 16, 37, 45, 31, 44, 56, 50, 53, 52, 51, 62, 75, 74, 70, 67]));
bingoCards.push(new BingoCard(94, [8, 5, 13, 3, 12, 23, 22, 18, 24, 27, 34, 37, 45, 39, 52, 59, 51, 48, 47, 68, 62, 65, 70, 75]));
bingoCards.push(new BingoCard(95, [3, 4, 6, 9, 11, 19, 18, 23, 25, 27, 35, 38, 43, 32, 51, 49, 48, 58, 59, 66, 67, 72, 74, 75]));
bingoCards.push(new BingoCard(96, [6, 9, 2, 15, 5, 19, 25, 24, 27, 18, 36, 39, 43, 33, 50, 55, 54, 58, 46, 66, 67, 68, 70, 62]));
bingoCards.push(new BingoCard(97, [2, 4, 12, 15, 10, 27, 20, 29, 17, 16, 43, 32, 33, 45, 50, 46, 47, 53, 52, 73, 75, 71, 63, 62]));
bingoCards.push(new BingoCard(98, [1, 9, 10, 2, 7, 24, 23, 30, 29, 25, 35, 41, 40, 42, 55, 60, 50, 56, 57, 73, 64, 74, 63, 70]));
bingoCards.push(new BingoCard(99, [14, 2, 8, 9, 11, 16, 20, 21, 23, 27, 32, 39, 38, 33, 46, 57, 58, 51, 53, 62, 66, 68, 70, 74]));
bingoCards.push(new BingoCard(100, [8, 12, 11, 14, 3, 23, 26, 30, 28, 17, 31, 38, 42, 40, 53, 57, 54, 49, 51, 68, 62, 72, 63, 64]));
