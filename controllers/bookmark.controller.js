const Bookmark = require('../models/bookmark.model');

//For index
exports.index = function (req, res) {
    Bookmark.get(function (err, bookmark) {
        if (err)
            res.json({
                status: "error",
                message: err
            });

        res.json({
            status: "success",
            message: "Got Bookmark Successfully!",
            data: bookmark
        });
    });
};

//For creating new bookmark
exports.add = function (req, res) {
    var bookmark = new Bookmark();
    bookmark.name = req.body.name ? req.body.name : bookmark.name;
    bookmark.organization = req.body.organization;
    bookmark.downloads = req.body.downloads;

    //Save and check error
    bookmark.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: "New Bookmark Added!",
            data: bookmark
        });
    });
};

// View Bookmark
exports.view = function (req, res) {
    Bookmark.findById(req.params.bookmark_id, function (err, bookmark) {
        if (err)
            res.send(err);
        res.json({
            message: 'Bookmark Details',
            data: bookmark
        });
    });
};

// Update Bookmark
exports.update = function (req, res) {
    Bookmark.findById(req.params.bookmark_id, function (err, bookmark) {
        if (err)
            res.send(err);
        bookmark.name = req.body.name ? req.body.name : bookmark.name;
        bookmark.organization = req.body.organization;
        bookmark.downloads = req.body.downloads;

        //save and check errors
        bookmark.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Bookmark Updated Successfully",
                data: bookmark
            });
        });
    });
};

// Delete Bookmark
exports.delete = function (req, res) {
    Bookmark.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Bookmark Deleted'
        })
    })
}