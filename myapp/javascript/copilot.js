function calculateDaysBetweenDates(begin, end) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(begin);
    var secondDate = new Date(end);

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
}

//A function to write on file the fibonacci sequence
function writeFibonacciSequence(fileName, sequence) {
    var fs = require('fs');
    fs.writeFile(fileName, sequence, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

//Fibonnaci sequence
function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
writeFibonacciSequence('fibonacci.txt', fibonacci(10));