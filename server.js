const path = require('path');
const express = require('express');
const instant = require('instant');

const app = express();

app.use(instant({root: __dirname}));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function() {
    console.log('listening on port 3000 and waiting for changes.');
});
