const request = require('superagent')

exports.index = function (req, res) {
    request
        .get(`https://api.github.com/orgs/${req.params.name}/repos`)
        .set({ 'user-agent': 'node.js' })
        .then(result => {
            res.json({
                status: 'success',
                data: result && result.body && result.body.map ? result.body.map(el => ({ name: el.name, description: el.description, html_url: el.html_url })) : []
            })
        })
        .catch(err => {
            res.json({
                status: 'error',
                message: err
            })

        })
};