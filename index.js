'use strict'

// Libraries
const optimizelySDK = require('@optimizely/optimizely-sdk'),
      defaultLogger = require('@optimizely/optimizely-sdk/lib/plugins/logger'),
          LOG_LEVEL = require("@optimizely/optimizely-sdk/lib/utils/enums").LOG_LEVEL,
            express = require('express'),
               uuid = require('uuid/v4'),
               path = require("path"),
                 rp = require('request-promise');

// URLs & project to get datafile
const PROJECT_ID = '14083450237';
const DATAFILE_URL = `https://cdn.optimizely.com/json/${PROJECT_ID}.json`;
const REST_URL = `https://www.optimizelyapis.com/experiment/v1/projects/${PROJECT_ID}/json`

// Options to use REST api
let restOptions = 
    {
      uri: REST_URL,
      headers: {
        'Authorization': 'Bearer ' + process.env.OPTLY_TOKEN
      },
      json: true
    }

let optimizelyClient;

let getDatafile = async () => {
  await rp(restOptions)
      .then( (datafile)=>{
        optimizelyClient = optimizelySDK.createInstance({
          datafile,
          logger: defaultLogger.createLogger({
            logLevel: LOG_LEVEL.INFO
          })
        })
      }
    )
  };

getDatafile();

const views = path.join(__dirname, "./public/views");
const app = express();

app.use(express.static(__dirname + '/public'));
// app.set('view engine', 'pug')

// Render homepage function
let homePageRequest = (req, res) => {
  
  // Attributes to use for
  let attributes = {
    planType: 'free'
  }

  let userId = uuid();
  let homePath = path.join(views, "homepage.html");
  
  let enabled = optimizelyClient.isFeatureEnabled('v2_homepage_redesign', userId);

  // let redirectPath = optimizelyClient.getFeatureVariableString('v2_homepage_redesign', 'redirectPath', userId, attributes);
  
  res.cookie('userId', userId);

  if(enabled){
  	let newPath = path.join(views, "homepage_v2.html");
    return res.sendFile(newPath);
  }
  
  return res.sendFile(homePath);
}

// Helper to handle webhook POST from Optimizely
let webookHandler = (req, res) => {
  console.log('INCOMING WEBHOOK FROM OPTIMIZELY');
  // Get the latest datafile and resinstantiate the Optimizely Client
  getDatafile();
  res.sendStatus('204');
}

// Homepage (root) endpoint
app.get('/', homePageRequest);

// New Redirected homepage
// app.get('/new-home', newHome);

// POST endpoint for Optimizely Webhook
app.post('/webhook', webookHandler);

// Starting server
app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
})