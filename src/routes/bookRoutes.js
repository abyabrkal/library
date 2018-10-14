const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
const bookRouter = express.Router();

function router(nav) {

    const books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false,
        },
        {
            title: 'Les Miserables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
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
                            title: 'Books',
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

            res.render(
                'bookView',
                {
                    nav,
                    title: 'Books',
                    book: books[id],
                }
            );
        });

    return bookRouter;
}

module.exports = router;
