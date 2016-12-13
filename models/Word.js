const keystone = require('keystone')
const Types = keystone.Field.Types

const Word = new keystone.List('Word', {
  autokey: {
    from: 'EN',
    path: 'key',
    unique: true
  }
})

Word.add({
  EN: {
    type: String
  },
  ID: {
    type: String
  },
  NL: {
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
    default: 'normal',
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
  return [this.EN, this.ID, this.NL]
})

Word.schema.statics.defaultScope = {
  state: 'tolearn'
}

Word.track = true
Word.defaultColumns = 'ID, EN, NL'
Word.register()
