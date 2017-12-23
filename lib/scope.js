function scope (Model, query) {
  const _query = query || {}
  console.log(Model.defaultScope)
  if (Model.defaultScope) {
    for (var s in Model.defaultScope) {
      _query[s] = Model.defaultScope[s]
    }
  }
  return _query
}

module.exports = {
  scope: scope
}
