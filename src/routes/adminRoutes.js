const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();


const books = [
    {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    boodId: 656,
    read: false,
    },
    {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false,
    },
    {
    title: 'Da Vinci Code',
    genre: 'Suspense Thriller',
    author: 'Dan Brown',
    read: false,
    },
    {
    title: 'Angels and Demons',
    genre: 'Suspense Thriller',
    author: 'Dan Brown',
    read: false,
    },
    {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false,
    },
    {
    title: 'A Journey into the Centre of the Earth',
    genre: 'Suspense Fiction',
    author: 'Jules Verne',
    read: false,
    },
];


function router(nav){
    adminRouter.route('/')
        .get((req, res) => {

            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo(){
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected to server: success');

                    const db = client.db(dbName);

                    const response = await db.collection('books').insertMany(books)
                    res.json(response);
                } catch(err) {
                    debug(err.stack);
                }

                client.close();
            }())
            //res.send('Inserting books');
        });

    return adminRouter;
}


module.exports = router;