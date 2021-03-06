require('babelify')
const keystone = require('keystone')
const camelcase = require('camelcase')
const _api = require('./api')

module.exports = function (app) {
  const mapi = keystone.middleware.api

  app.all('/api/*', keystone.middleware.cors)

  ;[
    'Post',
    'PostCategory',
    'PostCategory',
    'Gallery',
    'Thing',
    'Word',
    'WordCategory'
  ].forEach((modelName) => {
    const api = _api(modelName)
    const path = '/api/' + camelcase(modelName)
    app.get(path, mapi, api.list)
    app.all(`${path}/create`, mapi, api.create)
    app.get(`${path}/:id`, mapi, api.get)
    app.all(`${path}/:id/update`, mapi, api.update)
    app.get(`${path}/:id/remove`, mapi, api.remove)
  })

  app.use(function (req, res) {
    res.render('index')
  })
}
