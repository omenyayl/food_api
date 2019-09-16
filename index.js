const express = require('express');
const path = require('path');
const routes = require(path.join(__dirname, 'routes.js'));
const app = express();

function setupExpress (port) {
    app.use('/', routes);
    app.listen(port, function() {
        console.log(`Server started on port ${port}`);
    });
}

(async function main() {
    setupExpress(5050);
})().catch(e => console.error(e));

