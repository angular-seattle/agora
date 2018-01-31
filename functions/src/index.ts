import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const secretWord = functions.https.onRequest(async (request, response) => {
  if (request.method !== "POST") {
      response.send("err");
  }
  const guess = request.body;
  const query = await admin.firestore().collection('meetups').limit(1).get();
  const data = query.docs[0].data();
  if (guess['secret'] === data['secret']) {
    response.send("OK!")
    return;
  }
  response.send("WRONG!")
});
