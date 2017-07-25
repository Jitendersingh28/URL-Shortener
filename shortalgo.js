// const getRandomCode = function () {
//     let randCode =
//         // 2 digit number with 6 zeros
//         (((Math.random() * 100) << 0) * 1000000)
//         +
//         //current milliseconds (cutting off last 2 digits), 6-digit
//         (((new Date().getTime() / 100) << 0) % 1000000);
//     return randCode;

// };

// module.exports.getRandomCode=getRandomCode;
var obj = {}

var getRandomCode = function () {

    let randCode =

        // 2 digit number with 6 zeros

        (((Math.random() * 100) << 0) * 1000000)

        +

        //current milliseconds (cutting off last 2 digits), 6-digit

        (((new Date().getTime() / 100) << 0) % 1000000);

    return randCode;

 

};

var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

function encode(num){
  var encoded = '';
  while (num){
    var remainder= num % base;
    num= Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  console.log("i am encoded",encoded)
  return encoded;
}
function decode(str){
  var decoded = 0;
  while (str){
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}
obj['encode'] = encode
obj['decode'] = decode
obj['getRandomCode'] = getRandomCode

module.exports = obj;