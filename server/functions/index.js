const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
const serviceAccount = require("./permissions.json");

const vision = require('@google-cloud/vision');

const VERY_UNLIKELY = 'VERY_UNLIKELY';
const BLURRED_FOLDER = 'blurred';


exports.blurOffensiveImages = functions.storage.object().onFinalize(async (object) => {

  const visionClient = new vision.ImageAnnotatorClient();
  const data = await visionClient.safeSearchDetection(
    `gs://${object.bucket}/${object.name}`
  );

  const safeSearch = data[0].safeSearchAnnotation;
  console.log('SafeSearch results on image', safeSearch);


if (
    safeSearch.adult !== VERY_UNLIKELY ||
    safeSearch.spoof !== VERY_UNLIKELY ||
    safeSearch.medical !== VERY_UNLIKELY ||
    safeSearch.violence !== VERY_UNLIKELY ||
    safeSearch.racy !== VERY_UNLIKELY
  ) {

    var defaultStorage = admin.storage();
    const bucket = defaultStorage.bucket(object.bucket);
    const file = bucket.file(object.name);
    return file.delete();
  }
  return null;
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trash-2b5de.firebaseio.com"
});

const db = admin.firestore();

app.use(cors({ origin: true }));

app.post('/api/locations', (req, res) => {
    (async () => {
        try {
          await db.collection('locations').doc('/' + req.body.id + '/')
              .create({
                  id: req.body.id,
                  lat: req.body.lat,
                  long: req.body.long,
                  completed: req.body.completed,
                  uri: req.body.uri,
                  user: req.body.user
            });
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

app.get('/api/locations', (req, res) => {
    (async () => {
        try {
            let query = db.collection('locations');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    lat: doc.data().lat,
                    long: doc.data().long,
                    completed: doc.data().completed,
                    uri: doc.data().uri,
                    user: doc.data().user
                };
                response.push(selectedItem);
            }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

    app.put('/api/locations/:location_id', (req, res) => {
        (async () => {
            try {
                const document = db.collection('locations').doc('/' + req.body.id + '/');
                await document.update({
                    completed: req.body.completed
                });
                return res.status(200).send();
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
            })();
        });

        app.put('/api/users/:user', (req, res) => {
            (async () => {
                try {
                    const document = db.collection('users').doc('/' + req.params.user + '/');
                    await document.update({
                        karmaPoints: req.body.karmaPoints
                    });
                    return res.status(200).send();
                } catch (error) {
                    console.log(error);
                    return res.status(500).send(error);
                }
                })();
            });

    app.post('/api/users', (req, res) => {
      (async () => {
          try {
              await db.collection('users').doc('/' + req.body.username + '/')
              .create({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                karmaPoints: req.body.karmaPoints,
                password: req.body.password,
          });
              return res.status(200).send();
          } catch (error) {
              console.log(error);
              return res.status(500).send(error);
          }
          })();
      });

      app.get('/api/users', (req, res) => {
        (async () => {
            try {
                let query = db.collection('users');
                let response = [];
                await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedUsers = {
                        email: doc.data().email,
                        firstName: doc.data().firstName,
                        karmaPoints: doc.data().karmaPoints,
                        lastName: doc.data().lastName,
                        username: doc.data().username,
                    };
                    response.push(selectedUsers);
                }
                });
                return res.status(200).send(response);
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
            })();
        });

      app.get('/api/users/:id', (req, res) => {
        (async () => {
            try {
                let query = db.collection('users').doc(req.params.id);
                let response = [];
                await query.get().then(querySnapshot => {
                let doc = querySnapshot.data();
                    const selectedUser = {
                        username: doc.username,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        email: doc.email,
                        karmaPoints: doc.karmaPoints,
                        password: doc.password
                    };
                    response.push(selectedUser);
                
                });
                return res.status(200).send(response);
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
            })();
        });
      

exports.app = functions.https.onRequest(app);