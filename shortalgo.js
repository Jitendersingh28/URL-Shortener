const getRandomCode = function () {
    let randCode =
        // 2 digit number with 6 zeros
        (((Math.random() * 100) << 0) * 1000000)
        +
        //current milliseconds (cutting off last 2 digits), 6-digit
        (((new Date().getTime() / 100) << 0) % 1000000);
    return randCode;

};

module.exports.getRandomCode=getRandomCode;
