'use strict';

const functions = require('firebase-functions'); 
const { dialogflow } = require('actions-on-google');
const app = dialogflow();
const request2 = require('request');

var prompts = ['Tell me more.', 'Continue please.', 'Please continue.', 'Please tell me more.', 'Tell me some more.', 'Tell me more please.'];
var fallbacks = ['Sorry, I didn\'t quite catch that.', 'Say that again?', 'I don\'t understand.', 'I didn\'t catch that.'];

app.intent('Default Welcome Intent', conv => {
    conv.data.session = {}
    let session = conv.data.session;
    conv.ask('Welcome to Once Upon a Time! Please begin telling your story.');
});

app.intent('storyInput', (conv, params) => {
    let storyInput = params.storyInput;
    console.log('storyInput string: ' + storyInput);
    
    var options = {
        method: 'GET',
        url: 'http://40.117.32.177:8080/api?text='+storyInput
    };
    
    request2(options, function (error, response2, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response2 && response2.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
    
    var output = prompts[Math.floor(Math.random() * prompts.length)];
    conv.ask(output);
});

exports.main = functions.https.onRequest(app);

exports.test = functions.https.onCall((data, context) => {
    console.log('inside function')
    return {test: true};
  });