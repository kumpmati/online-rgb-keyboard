const firebase = require('firebase/app');
require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const { setConfig, startApp, setBitmap } = require('./stuff/gs');
const config = require('./stuff/config');

async function start() {
    setConfig(config());
    await startApp();
    console.log('started');

    db.collection('keyboard-colors')
        .doc('current')
        .onSnapshot(function(doc) {
            setBitmap(doc.data().hex);
        });
}

start();