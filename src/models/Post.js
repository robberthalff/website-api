const keystone = require('keystone')
const Types = keystone.Field.Types

const Post = new keystone.List('Post', {
  autokey: {
    from: 'name',
    path: 'key',
    unique: true
  }
})

Post.add({
  name: {
    type: String,
    required: true
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true
  },
  author: {
    type: Types.Relationship,
    ref: 'User',
    index: true
  },
  publishedDate: {
    type: Types.Date,
    index: true
  },
  image: {
    type: Types.CloudinaryImage
  },
  content: {
    brief: {
      type: Types.Markdown,
      wysiwyg: true,
      height: 150
    },
    extended: {
      type: Types.Markdown,
      wysiwyg: true,
      height: 400
    }
  },
  categories: {
    type: Types.Relationship,
    ref: 'PostCategory',
    many: true
  }
})

Post.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief
})

Post.schema.statics.defaultScope = {
  state: 'published'
}

Post.relationship({
  path: 'comments',
  ref: 'PostComment',
  refPath: 'post'
})

Post.track = true
Post.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%'
Post.register()
