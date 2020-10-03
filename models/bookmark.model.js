const mongoose = require('mongoose');

//schema
const bookmarkSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    html_url: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Bookmark = module.exports = mongoose.model('bookmark', bookmarkSchema);

module.exports.get = function (callback, limit) {
    Bookmark.find(callback).limit(limit); 
}