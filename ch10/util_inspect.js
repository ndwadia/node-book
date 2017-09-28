var util = require('util');
var obj = { first:'Neville', last:'Wadia' };
obj.inspect = function (depth) {
    return '{ name: "' + this.first + " " + this.last + '" }';
};
console.log(util.inspect(obj));