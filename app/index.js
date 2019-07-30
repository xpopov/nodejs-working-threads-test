import http from 'http'
import express from 'express'
import { Worker } from 'worker_threads'

import config from '../config'

let app = express()
console.log(config)
let port = config.port || 8080

let router = express.Router()
router.get('/', (req, res) => {
  run().catch(err => console.error(err))
  .then(data => {
    res.send(data)
  })
})

app.use(router)

let server = http.createServer(app)
server.listen(port, () => {
  console.log('API Server is listening on port:', port)
})


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
