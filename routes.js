const router = require('express').Router();
const path = require('path');
const DBConnector = require(path.join(__dirname, 'db-connector.js')).DBConnector;

router.get('/:_id', async function (req, res) {
    const {_id} = req.params;

    let db;
    try {
        db = await DBConnector.getInstance().getDB();
    } catch (e) {
        console.error('Could not connect to the database:', e);
        return;
    }

    await res.json(await db.findOne({_id}));
});

module.exports = router;