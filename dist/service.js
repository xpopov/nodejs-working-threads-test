"use strict";

var _require = require('worker_threads'),
    workerData = _require.workerData,
    parentPort = _require.parentPort; // Imitate heavy calculations
// They are not blocking each others, running async.
// First worker is the slowest, the last one is the fastest


var cpuLoadIndex = 14; // Approx. 10 for weak computers, 15 for i5-i7 2018-2019

var baseNumber = cpuLoadIndex - workerData.index;
var result = 0;

for (var i = Math.pow(baseNumber, 7); i >= 0; i--) {
  result += Math.atan(i) * Math.tan(i);
}

console.log("worker #" + workerData.index.toString() + " finished"); // setTimeout ( () => {

parentPort.postMessage({
  hello: workerData.message,
  result: result
}); // }, 3000)