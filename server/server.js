// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");

var validator = require('validate-image-url');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {

    var options = {
        method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
        headers:
        {
            'postman-token': 'c5c887d3-932f-4905-5933-6585bd3781ab',
            'cache-control': 'no-cache',
            'ocp-apim-subscription-key': 'dd2e13dafe9b4cd79a739e485c6f8a1e',
            'content-type': 'application/json'
        },
        body:
        {
            documents:
                [{
                    language: 'en',
                    id: '1',
                    text: req.query.text
                }]
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var qStr = "";
        console.log(body.documents[0].keyPhrases);
        if (body.documents[0].keyPhrases.length == 0) {
            qStr = req.query.text;
        }
        else {
            qStr = body.documents[0].keyPhrases.join();
        }
        console.log(qStr);

        var feelingOptions = {
            method: 'POST',
            url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
            headers: {
                'content-type': 'application/json',
                'ocp-apim-subscription-key': 'dd2e13dafe9b4cd79a739e485c6f8a1e'
            },
            body: {
                documents: [{
                    language: 'en',
                    id: 'string',
                    text: qStr
                }]
            },
            json: true
        };

        var feelingScore = 0;

        request(feelingOptions, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            feelingScore = body.documents[0].score;

            if (feelingScore < 0.4) {
                qStr = qStr + " sad";
            }
            else if (feelingScore > 0.7){
                qStr = qStr + " happy";
            }

            var optionsImg = {
                method: 'GET',
                url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search',
                qs: {
                    aspect: 'wide',
                    maxFileSize: '520192',
                    q: qStr
                },
                headers: {
                    'postman-token': '37f2fd13-4353-8101-15c7-8db4ad48f35f',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json',
                    'ocp-apim-subscription-key': '4f5a247648e449679e1ac58c04386def'
                }
            };

            request(optionsImg, function (error, response, body) {
                if (error) throw new Error(error);
                bodyJson = JSON.parse(body);

                var imgList = [];
                var temp_key = "";
                for (var i = 0; i < 35; i++) {
                    if (bodyJson != 'undefined') {
                        //https://www.kaggle.com/cenkbircanoglu/comic-books-classification
                        // var classOptions = {
                        //     method: 'POST',
                        //     url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/4986dfb4-fcce-4b8e-8927-cae52c83c99b/url',
                        //     qs: {
                        //         iterationId: 'ed466a33-4e2d-4dc0-a4d1-8329b1b170bb'
                        //     },
                        //     headers: {
                        //         'postman-token': '9877b983-17c4-0ad2-cc1d-462e57b782fb',
                        //         'cache-control': 'no-cache',
                        //         'content-type': 'application/json',
                        //         'prediction-key': '94b9c943b68e45d48f2c1c71dd79819a'
                        //     },
                        //     body: {
                        //         Url: bodyJson.value[i].contentUrl
                        //     },
                        //     json: true
                        // };
                        // request(classOptions, function (error, response, body) {
                        //     if (error) throw new Error(error);
                        //     console.log(body.predictions[0].tagName);
                        //     if (body.predictions[0].tagName == 'comic') {
                        imgList.push(bodyJson.value[i].contentUrl);
                        //     }
                        // });
                    }
                }
                // var randomPic = imgList[Math.floor(Math.random() * imgList.length)];
                var randomPic = imgList[0];

                var returnList = [qStr, randomPic];

                var faceOptions = {
                    method: 'POST',
                    url: 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect',
                    qs: {
                        returnFaceId: 'false',
                        returnFaceLandmarks: 'false'
                    },
                    headers: {
                        'postman-token': 'dd6392b8-5411-6347-c8c3-927a10856dbb',
                        'cache-control': 'no-cache',
                        'content-type': 'application/json',
                        'ocp-apim-subscription-key': '51d8556812ef4b1bbfaa2bf30df649c5'
                    },
                    body: {
                        url: randomPic
                    },
                    json: true
                };

                request(randomPic, function (error, response, body) {
                    if (error) {
                        console.log("deadlink", randomPic);
                        res.json("dead link");
                    }
                    else {
                        request(faceOptions, function (error, response, body) {
                            console.log('eeeeee', error);
                            if (error) {
                                res.json("dead link");
                            } else {
                                console.log('173', body);
                                console.log('174', body.length);
                                if (body.length != 0) {
                                    returnList.push(body[0].faceRectangle.top);
                                    returnList.push(body[0].faceRectangle.top + body[0].faceRectangle.height);
                                    returnList.push(body[0].faceRectangle.left);
                                    returnList.push(body[0].faceRectangle.left + body[0].faceRectangle.width);
                                } else {
                                    returnList.push(-1);
                                    returnList.push(-1);
                                    returnList.push(-1);
                                    returnList.push(-1);
                                }
                                returnList.push(feelingScore);
                                console.log('188', returnList);
                                res.json(returnList);
                            }
                        });
                    }
                });
            });
        });
    });
});


app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);