function scope(Model){
  if (Model.defaultScope) {
    for (var s in Model.defaultScope){
      query[s] = defaultScope[s]
    }
  }
  return query
}

module.exports = {
  scope: scope
}
