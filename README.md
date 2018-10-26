**Inspiration**
While struggling to settle on a project idea, our team went on a walk and found ourselves at the Harvard Art Museum. It was here that we came up with the idea to create comical, inspired by this year's Bold Strokes theme. With comical, anyone can express themself creatively and make incredible comics in minutes, using nothing but their voice.

**What it does**
comical acts as a chatbot that prompts the user to tell a story using a Google Home (or any other Google Assistant powered device). comical converts user voice or text input into a relevant comic style image, complete with narrative text boxes and character speech bubbles. Machine Learning and Sentiment Analysis are applied to the input in order to extract key phrases and determine the tone. This information is used to find appropriate images to display in the comic.

The images are "cartoonified" to provide a comic book feel before comical applies facial recognition software to determine the appropriate location for speech bubbles and text boxes. Once this process is complete, the finalized image is added to a comic book panel display on a web application in real time so that the story is created in front of the user's eyes as they speak.

**How we built it**
Our team built this application using a Vue front-end and a Node.js back-end, using the following external services:

**Azure**

Sentiment Analysis to determine the tone/emotions of user input
Face API to map the location of faces within images
Key Phrase Extraction to break user input down into its critical components
Bing Image Search API to find images from extracted keywords
Google Cloud Platform

Firebase used to deploy Node.js functions
Session data storage in Firestore
Dialogflow used to create the conversation model
Actions-on-Google v2 Library for conversational fulfilment
Challenges we ran into
The biggest issue our team encountered was in the criteria and classification of the image being selected for our comics by the Bing Image Search API. For example, if the user enters "My sister was crying", the key phrase extraction would occasionally feel that the most relevant information was the word "sister"and would generate an image of a smiling woman. This was the reason our team implemented sentiment analysis, in order to understand the context of the input. Our team also lacked experience in many of the Azure/Google Cloud platform features we needed to implement.

**Accomplishments that we're proud of**
We're proud of having ideated, designed, developed and tested an ambitious idea in just 36 hours! Our team formed after the start of the Hackathon, and our members came from a variety of countries and backgrounds. We feel our biggest accomplishments are..:

Learning multiple new tools within a short period of time
Creating a project that communicates between multiple endpoints, API's and databases
Sleeping ~3 hours/person over a 3 day period
What we learned
We would struggle to fit everything we learned over the past 3 days onto one page, but we feel the biggest lessons were that...:

To always focus on the minimum viable product when time is limited
It's more fun to work on projects you're excited about
M.I.T is a further walk than it seems on a map
What's next for comical
Given more time, our team would have improved the training models for our ML products, and would have better utilized sentiment analysis. We also plan on creating better view control animations for our Vue front end, so that the screen zooms and shifts through the panels as the user speaks.