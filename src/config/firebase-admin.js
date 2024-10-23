import admin from "firebase-admin";

const serviceacc = require("./itskill-97671-firebase-adminsdk-n6eow-e896151908.json");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceacc),
    databaseURL: "https://itskill-97671.firebaseio.com",
    storageBucket: "itskill-97671.appspot.com", // No 'gs://' prefix needed
  });
}

// Export the Firebase Storage bucket
const bucket = admin.storage().bucket();
export { bucket };
