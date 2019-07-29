"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _worker_threads = require("worker_threads");

// import config from 'config'
var app = (0, _express["default"])();
var port = 8080; //config.port || 8080

/* add express middleware to app */
// app.use(bodyParser.urlencoded());    // bodyparser urlencoded
// app.use(bodyParser.json());          // bodyparser json
// app.use(morgan('dev'));              // morgan http-request-logger

function sleep(ms) {
  // return new Promise(resolve => setTimeout(resolve, ms));
  var date = new Date();
  var curDate = null;

  do {
    curDate = new Date();
  } while (curDate - date < ms);
}

var router = _express["default"].Router();

router.get('/', function (req, res) {
  run()["catch"](function (err) {
    return console.error(err);
  }).then(function (data) {
    res.end(data);
  }); // const { Worker, isMainThread, parentPort } = require('worker_threads')
  // const worker = new Worker(__filename);
  // let gWaitStatus = true
  // worker.once('message', (message) => {
  //   console.log(message);
  //   gWaitStatus = false
  // });
  // while (gWaitStatus) {
  //   sleep(1000)
  // }
});
app.use(router);

var server = _http["default"].createServer(app);

server.listen(port, function () {
  console.log('API Server is listening on port:', port);
}); // const errorHandler = require('errorhandler')
// const lusca = require('lusca')
// const dotenv = require('dotenv')

function runService(workerData) {
  return new Promise(function (resolve, reject) {
    var worker = new _worker_threads.Worker('./app/service.js', {
      workerData: workerData
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', function (code) {
      if (code !== 0) reject(new Error("Worker stopped with exit code ".concat(code)));
    });
  });
}

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var workers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, result;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("preparing workers...");
            workers = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;

            for (_iterator = Array(10).keys()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              i = _step.value;
              workers.push(runService({
                message: 'world',
                index: i
              }));
            } // Promise.all(workers).then(result => {
            // console.log(result)
            // })


            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 13:
            _context.prev = 13;
            _context.prev = 14;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 16:
            _context.prev = 16;

            if (!_didIteratorError) {
              _context.next = 19;
              break;
            }

            throw _iteratorError;

          case 19:
            return _context.finish(16);

          case 20:
            return _context.finish(13);

          case 21:
            console.log("workers started simultaneously");
            console.log("by checking server CPU load you could see how it gradually decreases as workers stop");
            console.log("not blocking now, but calculation runs");
            console.log("... and workers report about completion");
            _context.next = 27;
            return Promise.all(workers);

          case 27:
            result = _context.sent;
            console.log(result);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 9, 13, 21], [14,, 16, 20]]);
  }));
  return _run.apply(this, arguments);
}