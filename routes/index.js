'use strict'

const express = require('express'),
         uuid = require('uuid/v4'),
         path = require('path'),
         views = path.join(__dirname, "../public/");

const router = express.Router();

router.get('/', (req, res, next) => {
  var userId = uuid();
  let imageTestVariation = req.optimizely.client.isFeatureEnabled('bg_image', userId);
  let bgImageUrl = req.optimizely.client.getFeatureVariableString('bg_image', 'bgImage', userId);
  let enabled = req.optimizely.client.isFeatureEnabled('v2_homepage', userId);
  let width = req.optimizely.client.getFeatureVariableInteger('v2_homepage', 'width', userId);
  let background_color = req.optimizely.client.getFeatureVariableString('v2_homepage', 'background-color', userId);
  let opacity = req.optimizely.client.getFeatureVariableDouble('v2_homepage', 'opacity', userId);
  let height = req.optimizely.client.getFeatureVariableInteger('v2_homepage', 'height', userId);
  // Set user id as a cookie for us to retrieve clientside
  res.cookie('userId', userId);
  
  // Render handlebars template with datafile and feature vars
  res.render('home', {
  	layout: 'default', 
  	template: 'home-template', 
  	width: width, 
    bgColor: background_color,
    bgImage: bgImageUrl,
    opacity: opacity,
    height: height,
  	isEnabled:enabled, 
  	datafile:JSON.stringify(req.optimizely.datafile)
  });
});

router.get('/redirect', (req,res,next) => {
  var userId = uuid();
  var enabled = req.optimizely.client.isFeatureEnabled('redirect_test', userId);
  var html_file = req.optimizely.client.getFeatureVariableString('redirect_test', 'html_file', userId);
  let newPath = path.join(views, html_file);
  res.sendFile(newPath);
  //res.redirect(newPath)
});

router.post('/', (req, res, next) => {
  var userId = uuid();
  res.cookie('userId', userId);
});

router.get('/test', (req, res, next) => {
	res.send('Hello World')
});

module.exports = router