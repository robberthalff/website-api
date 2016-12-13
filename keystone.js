require('dotenv').config();
const keystone = require('keystone')
const favicon = require('express-favicon')
const express = require('express')
//const handlebars = require('handlebars')
//const mongoose = require('mongoose')
//const app = express()

keystone.init({
  'name': 'RobbertHalff',
  'brand': 'RobbertHalff',

  'less': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  /*
  'views': 'templates/views',
  'view engine': 'hbs',

  'custom engine': handlebars.create({
    layoutsDir: 'templates/views/layouts',
    partialsDir: 'templates/views/partials',
    defaultLayout: 'default',
    helpers: new require('./templates/views/helpers')(),
    extname: '.hbs',
  }).engine,

  'emails': 'templates/emails',
  */

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'd5036b4c254f48eee0ac3779928ac9fc20836ad44ece8aa44d629a89b7798027dd61be91ecb00351ca8a7fefae6ce562be4c142ad889e34f5a3895acf4e7ffa6',
  'cloudinary config': 'cloudinary://631298377816735:LTDAYAIOtWav5xrfSfTJisL7a7A@rhalff'
})

keystone.import('models')

keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
})

/*
keystone.set('email locals', {
  logo_src: '/images/logo-email.gif',
  logo_width: 194,
  logo_height: 76,
  theme: {
    email_bg: '#f9f9f9',
    link_color: '#2697de',
    buttons: {
      color: '#fff',
      background_color: '#2697de',
      border_color: '#1a7cb7',
    },
  },
})

keystone.set('email tests', require('./routes/emails'))
*/

keystone.set('cors allow origin', true);
keystone.set('routes', require('./routes'))
keystone.set('nav', {
  users: 'users',
  content: ['posts', 'post-categories', 'post-comments']
})

keystone.start()
