'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

// routing
const express = require('express');
var app = express();

var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 3000;

const bp = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//***************** part for Prometheus monitoring ***************** //
const client = require('prom-client')
// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'example-nodejs-app'
})
// Enable the collection of default metrics
client.collectDefaultMetrics({ register })
// Create a histogram metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})
// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds)


app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(register.metrics())
});


// connect to mongo_db
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db', {
}).then(()=>{
  console.log('Mongodb connected');
});

const History = require('./models/history.model.js');
app.all('/*', function(req, res, next) {
  console.log('svaing to mongodb...', req.params);
  const history = new History({
    query: JSON.stringify(req.params),
  })
  history.save()
  .then(result=>{
    // console.log(result);
  })
  .catch(err => {
    console.log(err.message);
  })
  next();
})


// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};



// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });
});

app.get("/", (req, res) => {
res.send({"version" : "1.0.0", "date:": Math.floor(+new Date() / 1000)})
});
