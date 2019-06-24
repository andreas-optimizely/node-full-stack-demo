'use strict'

const express = require('express'),
         uuid = require('uuid/v4');

const router = express.Router();

router.get('/', (req, res, next) => {
  let userId = uuid();
  let enabled = req.optimizely.client.isFeatureEnabled('v2_homepage', userId);
  let h1_copy = req.optimizely.client.getFeatureVariableString('v2_homepage', 'h1_copy', userId);
  let image = req.optimizely.client.getFeatureVariableString('v2_homepage', 'image', userId);
  res.render('home', {layout: 'default', template: 'home-template', 'h1_copy': h1_copy, image: image});
});


router.get('/test', (req, res, next) => {
	res.send('Hello World')
  // res.render('home', {layout: 'default', template: 'home-template'});
});

module.exports = router