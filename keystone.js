const keystone = require('keystone')
const routes = require('./src/routes')
const _ = require('lodash')

const {
  COOKIE_SECRET = 'change_me',
  CLOUDINARY_CONFIG = 'change_me_too'
} = process.env;

keystone.init({
  'name': 'RobbertHalff',
  'brand': 'RobbertHalff',
  'less': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': COOKIE_SECRET,
  'cloudinary config': CLOUDINARY_CONFIG
})

keystone.import('./src/models')

keystone.set('locals', {
  _,
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
})

keystone.set('cors allow origin', true)
keystone.set('routes', routes)
keystone.set('nav', {
  users: 'users',
  content: ['posts', 'post-categories', 'post-comments']
})

keystone.start()
