'use strict'

const express = require('express'),
         uuid = require('uuid/v4');

const router = express.Router();

router.get('/', (req, res, next) => {
  let userId = uuid();
  let enabled = req.optimizely.client.isFeatureEnabled('v2_homepage', userId);
  let copy = req.optimizely.client.getFeatureVariableString('v2_homepage', 'copy', userId);
  let image = req.optimizely.client.getFeatureVariableString('v2_homepage', 'image', userId);
  
  // Set user id as a cookie for us to retrieve clientside
  res.cookie('userId', userId);
  
  // Render handlebars template with datafile and feature vars
  res.render('home', {
  	layout: 'default', 
  	template: 'home-template', 
  	copy: copy, 
  	image: image, 
  	isEnabled:enabled, 
  	datafile:JSON.stringify(req.optimizely.datafile)
  });

});


router.get('/test', (req, res, next) => {
	res.send('Hello World')
});

module.exports = router