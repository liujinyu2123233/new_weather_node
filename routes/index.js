var express = require('express');
var router = express.Router();
var fs = require('fs');


var fo15d = null;
var fo24h = null
fs.readFile('./data/fo15d.json',function(err,cont){
  if(err) {
    console.log("read fo15.json is fail!");
    return;
  }
  fo15d = JSON.parse(cont+'')

})
fs.readFile('./data/fo24h.json',function(err,cont){
  if(err) {
    console.log("read fo24h.json is fail!");
    return;
  }
  fo15d = JSON.parse(cont+'')

})

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('./data/fo15d.json',function(err,cont){
    //console.log(cont)
  })

  res.render('index', { title: 'Express' });
});

module.exports = router;
