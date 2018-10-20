
var serviceAccount = require("./key.json");
//var admin = require("firebase-admin");
const axios = require("axios");
const firebase = require("firebase");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://storytime-a688b.firebaseio.com"
// });

// let db = admin.firestore();
// db.settings({ timestampsInSnapshots: true });

let firestore = require('firebase/firestore');

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyChNQbbV5Li5FU2sOjEWTY-hIBoy9R9ZSg',
  authDomain: 'storytime-a688b.firebaseapp.com',
  databaseURL: 'https://storytime-a688b.firebaseio.com',
  projectId: 'storytime-a688b',
  storageBucket: 'storytime-a688b.appspot.com',
  messagingSenderId: '669392027502',
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
let db = firebaseApp.firestore();

const functions = require('firebase-functions'); 
const { dialogflow } = require('actions-on-google');
const app = dialogflow();
const request2 = require('request');

var prompts = ['Tell me more.', 'Continue please.', 'Please continue.', 'Please tell me more.', 'Tell me some more.', 'Tell me more please.'];
var fallbacks = ['Sorry, I didn\'t quite catch that.', 'Say that again?', 'I don\'t understand.', 'I didn\'t catch that.'];

app.intent('Default Welcome Intent', conv => {
    conv.data.session = {}
    let session = conv.data.session;
    conv.ask('Welcome to Comical! Please begin telling your story.');
});

app.intent('storyInput', (conv, params) => {
    let storyInput = params.storyInput;
    console.log('storyInput param: ' + storyInput);

    let said = '';
    let saidIndex = storyInput.indexOf('said');

    if( saidIndex != -1 ) {
        said = storyInput.substring(saidIndex + 5, storyInput.length);
        console.log('said substring: ' + said);
    }
    
    var options = {
        method: 'GET',
        url: 'http://40.117.32.177:8080/api?text='+storyInput
    };

    return axios.get('http://40.117.32.177:8080/api?text=${storyInput}').then((response) => {
        console.log("Got data:", response.data);

        return db.collection("users").doc("test2").update({
            comics: firebase.firestore.FieldValue.arrayUnion({url: response.data[1], storyInput, said})
        }).then(() => {
            console.log('big success')
            var output = prompts[Math.floor(Math.random() * prompts.length)];
            conv.ask(output);
        }).catch(err => {
            console.log('big error', err)
            conv.ask('ERROR', err);
        });

    }).catch((err) => {
        console.log('ERROR: ', err);
        conv.ask("Error");
    });
});

exports.main = functions.https.onRequest(app);

exports.test = functions.https.onCall((data, context) => {
    console.log('inside function')
    return {test: true};
  });