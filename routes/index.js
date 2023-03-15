var express = require('express');
const { home } = require('nodemon/lib/utils');
var router = express.Router();
var model = require('../model')

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('home')
});

router.get('/token', function(req, res, next) {
  model.consumer.tocken(req, (error, data)=>{
    if(error){
      if(err.message === 'not found') next()
      else next(err)
    }  else res.sendStatus('token', {result: data})
  })
});

router.get('/health', function(req, res, next) {
  model.consumer.health(req, (error, data)=>{
    if(error){
      if(error.message === 'not found') next()
      else next(error)
    }  else res.sendStatus(data)
  })
});

router.get('/annotabledoc', function(req, res, next) {
  model.consumer.annotableDoc(req, (error, data)=>{
    if(error){
      if(error.message === 'not found') next()
      else next(error)
    }  else res.send(data)
  })
});

router.get('/annotations', function(req, res, next) {
  model.consumer.annotations(req, (error, data)=>{
    if(error){
      if(error.message === 'not found') next()
      else next(error)
    }  else res.send(data)
  })
});

router.get('/findannotable', function(req, res, next) {
  model.consumer.findannotable(req, (error, data)=>{
    if(error){
      if(error.message === 'not found') next()
      else next(error)
    }  else res.send(data)
  })
});

router.get('/findmultiannotable', function(req, res, next) {
  model.consumer.findmultiannotable(req, (error, data)=>{
    if(error){
      if(error.message === 'not found') next()
      else next(error)
    }  else res.send(data)
  })
});

router.get('/findlistannotations', function(req, res, next) {
  model.consumer.findlistannotations(req, (error, data)=>{
    if(error){
      if(error.message === 'not found') next()
      else next(error)
    }  else res.send(data)
  })
});


module.exports = router;