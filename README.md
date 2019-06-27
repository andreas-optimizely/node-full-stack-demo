# Full Stack v3.2.0 Feature Flag demo w/ Express

This demo provides a basic implementation of the Node SDK 3.2.0 using Express to show case the new datafile manager, feature flags, and feature variables.

## How to use

Follow the steps below to try out this demo for yourself.

1. Clone this repo
2. Run `npm install`
3. Replace `< YOUR SDK KEY >` in line 16 of `index.js` with your own Optimziely SDK key
4. In Optimizely create a feature named `v2_home` with at least 2 variables, `copy` and `image`. Additionally, create an event named `track_clicks` (this is used when you click 'Track conversions').
5. To start the app, run `npm start` and go to [http://localhost:8080](http://localhost:8080)

## Under the hood
This demo uses the new [Optimizely Expresss middleware](https://www.npmjs.com/package/@optimizely/express) and version 3.2.0 of the SDK.

The SDK is intialized in the root `index.js` file, and the client is passed in the `req` object of every endpoint in the express app.

The actual logic for using the feature flag can be found in the main route in the `routes/index.js` file. 

The state of the feature flag and feature variables are passed at the time of rendering the response, such that they can be used by the handlebars template.

You can see how the actual variables and feature flag are used in `views/home.hbs` and `views/partials/heroPartial.hbs`.

Additionally, this demo also passes the datafile from the server to the client and uses the JS SDK for tracking client side.


For questions reach out to @andreas!

