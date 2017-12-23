const keystone = require('keystone')
const Types = keystone.Field.Types

const Word = new keystone.List('Word', {
  map: { name: 'en_EN' },
  singular: 'Word',
  plural: 'Words',
  autokey: {
    from: 'en_EN',
    path: 'key',
    unique: true
  }
})

Word.add({
  en_EN: {
    label: 'English',
    type: String
  },
  id_ID: {
    label: 'Bahasa',
    type: String
  },
  nl_NL: {
    label: 'Dutch',
    type: String
  },
  priority: {
    type: Types.Select,
    options: 'high, normal, low',
    default: 'normal',
    index: true
  },
  level: {
    type: Types.Select,
    options: 'difficult, hard, easy',
    default: 'easy',
    index: true
  },
  status: {
    type: Types.Select,
    options: 'tolearn, learning, learned',
    default: 'tolearn',
    index: true
  },
  publishedDate: {
    type: Types.Date,
    index: true
  },
  categories: {
    type: Types.Relationship,
    ref: 'WordCategory',
    many: true
  }
})

Word.schema.virtual('words').get(function () {
  return [this.en_EN, this.id_ID, this.nl_NL]
})

Word.track = true
Word.defaultColumns = 'id_ID, en_EN, nl_NL, categories'
Word.register()
