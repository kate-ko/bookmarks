const mongoose = require('mongoose');

//schema
const bookmarkSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    org: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
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