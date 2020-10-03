const router = require('express').Router();

//set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to Bookmarks API'
    });
});

const bookmarkCtrl = require('./controllers/bookmark.controller');
const searchCtrl = require('./controllers/search.git.controller');

router.route('/bookmarks')
    .get(bookmarkCtrl.index)
    .post(bookmarkCtrl.add);

router.route('/bookmarks/:id')
    .get(bookmarkCtrl.view)
    .patch(bookmarkCtrl.update)
    .put(bookmarkCtrl.update)
    .delete(bookmarkCtrl.delete);

router.route('/search/:name')
    .get(searchCtrl.index)

module.exports = router;