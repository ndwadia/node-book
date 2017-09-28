var counter = (function () {
    var count = 0;
    console.log('Count: ' + count);
    return function () {
        return count += 1;
    };
})();

console.log('Counter: ' + counter());
console.log('Counter: ' + counter());
console.log('Counter: ' + counter());