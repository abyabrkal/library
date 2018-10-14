const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
//const debug = require('debug')('app:bookRoutes');

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
            (async function query() {
                const request = new sql.Request();

                const { recordset } = await request.query('select * from books');
                
                //debug(result);
                res.render(
                    'bookListView',
                    { 
                        nav,
                        title: 'Books' ,
                        books: recordset,
                    }
                )
            }())




        
        });


    bookRouter.route('/:id')
        .all((req, res, next) => {
            (async function query(){
                // const id = req.params.id;
                const { id } = req.params;

                const request = new sql.Request();
                const { recordset } = await request
                                        .input('id', sql.Int, id)
                                        .query('select * from books where id = @id');
                //[req.book] = recordset;
                req.book = recordset[0];
                next();
            }());
        })
        .get((req, res) => {
            //debug(result);
            res.render(
                'bookView',
                {
                    nav,
                    title: 'Books' ,
                    book: req.book,
                }
            );
        });

    return bookRouter;
}

module.exports = router;
