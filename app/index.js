// import config from 'config'

import http from 'http'
import express from 'express'
import { Worker } from 'worker_threads'


let app = express()
let port = 8080 //config.port || 8080

/* add express middleware to app */
// app.use(bodyParser.urlencoded());    // bodyparser urlencoded
// app.use(bodyParser.json());          // bodyparser json
// app.use(morgan('dev'));              // morgan http-request-logger

function sleep(ms) {
  // return new Promise(resolve => setTimeout(resolve, ms));
  var date = new Date();
  var curDate = null;
  do { 
    curDate = new Date(); } while(curDate-date < ms);
}

let router = express.Router()
router.get('/', (req, res) => {
  run().catch(err => console.error(err))
  .then(data => {
    res.send(data)
  })
  // const { Worker, isMainThread, parentPort } = require('worker_threads')
  // const worker = new Worker(__filename);
  // let gWaitStatus = true
  // worker.once('message', (message) => {
  //   console.log(message);
  //   gWaitStatus = false
  // });
  // while (gWaitStatus) {
  //   sleep(1000)
  // }
})

app.use(router)

let server = http.createServer(app)
server.listen(port, () => {
  console.log('API Server is listening on port:', port)
})


// const errorHandler = require('errorhandler')
// const lusca = require('lusca')
// const dotenv = require('dotenv')

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./app/service.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

async function run() {
  console.log("preparing workers...");
  const workers = []
  for(let i of Array(10).keys()) {
    workers.push(runService({ message: 'world', index: i}))
  }
  // Promise.all(workers).then(result => {
    // console.log(result)
  // })
  console.log("workers started simultaneously")
  console.log("by checking server CPU load you could see how it gradually decreases as workers stop")
  console.log("not blocking now, but calculation runs")
  console.log("... and workers report about completion")
  const result = await Promise.all(workers)
  console.log(result)
}

