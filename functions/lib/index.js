"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const express = require("express");
const firebaseOptions = functions.config().firebase;
firebaseOptions['uid'] = 'service-account';
admin.initializeApp(firebaseOptions);
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: true,
    preflightContinue: false
};
const app = express();
app.use(cors(options));
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//
app.post('/guess', (request, response) => {
    if (request.method !== "POST") {
        response.send("err");
    }
    const guess = request.body;
    if (guess['secret'] === 'coffee') {
        response.send({ success: true });
    }
    response.send({ success: false });
    return 200;
    /*
    // last minute firestore functions issue - can't make authed requests
    return admin.firestore().collection('meetups').limit(1).get().then((query) => {
      const data = query.docs[0].data();
      if (guess['secret'] === data['secret']) {
        response.send("OK!")
        return;
      }
      response.send("WRONG!")
    }).catch((e) => {
      response.send(`Error!: ${e}`);
    })
    */
});
exports.secretWord = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map