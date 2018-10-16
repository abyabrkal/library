const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router(){
    authRouter.route('/signUp')
        .post((req, res) => {
            const { username, password } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryName';

            (async function addUser(){
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected to server for user');

                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = { username, password };

                    // connectd to db and a new collection user and now insertOne
                    const results = await col.insertOne(user);
                    debug(results);

                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    })

                } catch(err) {
                    debug(err.stack);
                }
            }())
          
        });

    authRouter.route('/profile')
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
}

module.exports = router;