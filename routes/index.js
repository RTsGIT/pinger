var express = require('express');
var request = require('request');
var router = express.Router();

var endpoints = require('../data/endpoints');


router.get('/pinger', function(req, res, next) {
  var data1 = [];
  endpoints.forEach(function(endpoint,i){
    var start = new Date().getTime();
    var options={};
    options.url = endpoint.url;
    options.method=endpoint.method;
    if(endpoint.headers)
      options.headers = endpoint.headers;
    if(endpoint.search)
      options.search=endpoint.search;
    if(endpoint.body)
      options.body=endpoint.body;
      request(options,function(err,data){
        data1.push({
          "index":i,
          "time":(new Date().getTime() - start)
        });
      });
  });
  res.send(data1);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
});





module.exports = router;
