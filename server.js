var express = require('express');
var app = express();
const path = require('path');
var compression = require('compression');

app.use(express.static(path.join(__dirname)));
app.use(compression());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

let port = process.env.PORT;
if (port == null || port == '') {
    port = 8000;
}
app.listen(port);
