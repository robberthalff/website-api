const keystone = require('keystone')
const favicon = require('express-favicon')
const express = require('express')
//const mongoose = require('mongoose')
//const app = express()

keystone.init({
  'name': 'RobbertHalff',
  'brand': 'RobbertHalff',

  'less': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'jade',

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'd5036b4c254f48eee0ac3779928ac9fc20836ad44ece8aa44d629a89b7798027dd61be91ecb00351ca8a7fefae6ce562be4c142ad889e34f5a3895acf4e7ffa6',
  'cloudinary config': 'cloudinary://631298377816735:LTDAYAIOtWav5xrfSfTJisL7a7A@rhalff'
})

keystone.import('models')

const app = keystone.get('app')
app.use(favicon(__dirname + '/favicon.ico'));

/*
keystone.set('app', app)
keystone.set('mongoose', mongoose)
*/

keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
})

keystone.set('cors allow origin', true);
keystone.set('routes', require('./routes'))
keystone.set('nav', {
  users: 'users',
  content: ['posts', 'post-categories', 'post-comments']
})

keystone.start()
