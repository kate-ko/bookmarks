const Bookmark = require('../models/bookmark.model');

//For index
exports.index = function (req, res) {
    Bookmark.get(function (err, bookmark) {
        if (err)
            return res.json({
                status: "error",
                message: err
            });

        return res.json({
            status: "success",
            message: "Got Bookmark Successfully!",
            data: bookmark
        });
    });
};

//For creating new bookmark
exports.add = function (req, res) {
    const bookmark = new Bookmark();
    const { name, owner, description, html_url, id } = req.body

    bookmark.name = name;
    bookmark.org = owner ? owner.login : '';
    bookmark.description = description;
    bookmark.html_url = html_url;
    bookmark.id = id;

    //Save and check error
    bookmark.save(function (err) {
        if (err) return res.json(err);
        return res.json({
            message: "New Bookmark Added!",
            data: bookmark
        });
    });
};

// View Bookmark
exports.view = function (req, res) {
    Bookmark.findById(req.params.id, function (err, bookmark) {
        if (err)
            return res.send(err);
        return res.json({
            message: 'Bookmark Details',
            data: bookmark
        });
    });
};

// Update Bookmark
exports.update = function (req, res) {
    Bookmark.findById(req.params.id, function (err, bookmark) {
        if (err) res.send(err);

        const { name, org, description, html_url, id } = req.body

        bookmark.name = name;
        bookmark.org = org;
        bookmark.description = description;
        bookmark.html_url = html_url;
        bookmark._id = id;

        //save and check errors
        bookmark.save(function (err) {
            if (err)
                return res.json(err)
            return res.json({
                message: "Bookmark Updated Successfully",
                data: bookmark
            });
        });
    });
};

// Delete Bookmark
exports.delete = function (req, res) {
    Bookmark.deleteOne({
        _id: req.params.id
    }, function (err, contact) {
        if (err)
            return res.send(err)
        res.json({
            status: "success",
            message: 'Bookmark Deleted'
        })
    })
}