
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

var prompts = ['Tell me more.', 'Please continue.', 'Go on...', 'Please tell me some more.', 'Ooo! More please.', 'Wow, please go on.', 'Nice! Keep it up.', 'What happens next?', 'Then what happens?', 'I can\'t stand the suspense! What next?', 'What next?', 'Then what?', 'And then...', 'Epic! What happens after that?', 'And then what?'];
var greatStory = ['Great story! ', 'Awesome story! ', 'Cool story! ', 'Epic story! ', 'Wild story! ', 'Groovy story! '];
var endings = ['I look forward to creating with you again soon. ', 'I look forward to creating another comic with you soon. ', 'I look forward to creating another comic with you next time. ', 'Looking forward to creating together again soon. ', 'I hope to build another comic with you soon. '];
var seeYa = ['Have a bright day!', 'Until then, keep smiling!', 'Have a great day!', 'See you later!', 'Bye for now!', 'Catch you later!'];

app.intent('Default Welcome Intent', conv => {
    conv.data.session = {}
    let session = conv.data.session;
    session.numLines = 0;
    conv.ask('Welcome to Comical! Please start telling your story.');
});

app.intent('storyInput', (conv, params) => {
    let session = conv.data.session;
    session.numLines++;

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

    return axios.get(`http://40.117.32.177:8080/api?text=${storyInput}`).then((response) => {
        console.log("Got data:", response.data);

        return db.collection("users").doc("test2").update({
            comics: firebase.firestore.FieldValue.arrayUnion({url: response.data[1], storyInput, said,top:response.data[2],bottom:response.data[3],left:response.data[4],right:response.data[5]})
        }).then(() => {
            console.log('big success')

            if(session.numLines == 9) {
                let output = greatStory[Math.floor(Math.random() * greatStory.length)];
                output += endings[Math.floor(Math.random() * endings.length)];
                output += seeYa[Math.floor(Math.random() * seeYa.length)];
                conv.close(output);
            } else {
                let output = prompts[Math.floor(Math.random() * prompts.length)];
                conv.ask(output);
            }

        }).catch(err => {
            console.log('big error', err)
            conv.ask('Sorry, Comicaly has hit an error. Please try again later!', err);
        });

    }).catch((err) => {
        console.log('ERROR: ', err);
        conv.ask("We're sorry, Comicaly has encountered an error. Please try again in a few minutes!");
    });
});

exports.main = functions.https.onRequest(app);

exports.test = functions.https.onCall((data, context) => {
    console.log('inside function')
    return {test: true};
});