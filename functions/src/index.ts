import * as functions from "firebase-functions";
import { updateTokenUseCase } from "./domain/usecases/AuthUseCase";
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-1126612155927744763.firebaseio.com"
});


export const updateUserToken = functions
.runWith({ secrets: ["hasura-secret"] })
.https.onRequest(async (request, response) => {
  try {
    if (request.headers && request.headers.authorization) {
        const success = await updateTokenUseCase(request.headers.authorization.split('Bearer ')[1]);
        response.send({ success })
      } else {
        response.status(401).send();
      }
  } catch (error) {
    functions.logger.error(error);
    response.status(500).send();
  }
});
