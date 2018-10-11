var express = require('express');
var chalk = require('chalk');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello from my Library');
});

app.listen(3000, () => {
    console.log(`listening on port ${chalk.magenta('3000')}`);
});