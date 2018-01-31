"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.secretWord = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    if (request.method !== "POST") {
        response.send("err");
    }
    const guess = request.body;
    const query = yield admin.firestore().collection('meetups').limit(1).get();
    const data = query.docs[0].data();
    if (guess['secret'] === data['secret']) {
        response.send("OK!");
        return;
    }
    response.send("WRONG!");
}));
//# sourceMappingURL=index.js.map