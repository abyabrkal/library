const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();
const sql = require('mssql');
//const debug = require('debug')('app:bookRoutes');

function router(nav) {

    bookRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected to server: success');

                    const db = client.db(dbName);

                    const col = await db.collection('books');

                    const books = await col.find().toArray();

                    res.render(
                        'bookListView',
                        {
                            nav,
                            title: 'Library',
                            books,
                        }
                    );
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });


    bookRouter.route('/:id')
        .get((req, res) => {
            // const id = req.params.id;
            const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo(){
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected to server: success');

                    const db = client.db(dbName);

                    const col = await db.collection('books');

                    //We cant use _id:id, as _id is not a string id. Its a Mongo ObjectID.
                    //So, import ObjectID and create a new ObjectID for id
                    const book = await col.findOne({ _id: new ObjectID(id) })

                    res.render(
                        'bookView',
                        {
                            nav,
                            title: 'Library',
                            book
                        }
                    );


                } catch(err) {
                    debug(err.stack);
                }
            }());

            
        });

    return bookRouter;
}

module.exports = router;
