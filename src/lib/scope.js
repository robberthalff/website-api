function scope (Model, query) {
  const _query = query || {}

  if (Model.defaultScope) {
    for (let s in Model.defaultScope) {
      _query[s] = Model.defaultScope[s]
    }
  }

  return _query
}

module.exports = {
  scope: scope
}
