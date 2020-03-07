const functions = require('firebase-functions');

const express = require('express');
const app = express();

// FireBase Authentication (Not Facebook Authentication)
const FBAuth = require('./util/fbAuth');

const { 
    getAllScreams, 
    postOneScream, 
    getScream, 
    commentOnScream,
    likeScream,
    unlikeScream, 
    deleteScream
} = require('./handlers/screams');
const { 
    signup, 
    login, 
    uploadImage, 
    addUserDetails,
    getAuthenticatedUser, 
    getUserDetails,
    markNotificationsRead,
} = require('./handlers/users');


// Scream Routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', FBAuth, deleteScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

// Users Routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);