var keystone = require('keystone')
// var Types = keystone.Field.Types

var WordCategory = new keystone.List('WordCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
  label: 'Categories'
})

WordCategory.add({
  name: { type: String, required: true }
})

WordCategory.relationship({ ref: 'Word', refPath: 'categories' })

WordCategory.track = true
WordCategory.register()
