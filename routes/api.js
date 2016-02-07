// api
// See: https://gist.github.com/JedWatson/9741171
const keystone = require('keystone')
const scope = require('../lib/scope').scope

/**
 *
 * TODO: integrate these into the API:
 *
 * https://github.com/keystonejs/keystone-demo/blob/master/routes/views/blog.js
 *
 * So pagination and filtering for all.
 *
 * @param modelName
 * @returns {{list: list, get: get, create: create, update: update, remove: remove}}
 */

module.exports = function (modelName) {
  const Model = keystone.list(modelName).model

  /**
   * List
   */
  function list (req, res) {
    Model.find(scope(Model), function (err, items) {
      if (err) return res.apiError('database error', err)
      res.apiResponse(items)
    })
  }

  /**
   * Get by ID
   */
  function get (req, res) {
    Model.findById(req.params.id).exec(function (err, item) {
      if (err) return res.apiError('database error', err)
      if (!item) return res.apiError('not found')

      res.apiResponse(item)
    })
  }

  /**
   * Create
   */
  function create (req, res) {
    var item = new Model()
    var data = (req.method === 'POST') ? req.body : req.query

    item.getUpdateHandler(req).process(data, function (err) {
      if (err) return res.apiError('error', err)

      res.apiResponse(item)
    })
  }

  /**
   * Get by ID
   */
  function update (req, res) {
    Model.findById(req.params.id).exec(function (err, item) {
      if (err) return res.apiError('database error', err)
      if (!item) return res.apiError('not found')

      var data = (req.method === 'POST') ? req.body : req.query

      item.getUpdateHandler(req).process(data, function (err) {
        if (err) return res.apiError('create error', err)

        res.apiResponse(item)
      })
    })
  }

  /**
   * Delete by ID
   */
  function remove (req, res) {
    Model.findById(req.params.id).exec(function (err, item) {
      if (err) return res.apiError('database error', err)
      if (!item) return res.apiError('not found')

      item.remove(function (err) {
        if (err) return res.apiError('database error', err)

        return res.apiResponse({
          success: true
        })
      })
    })
  }

  return {
    list: list,
    get: get,
    create: create,
    update: update,
    remove: remove
  }
}
