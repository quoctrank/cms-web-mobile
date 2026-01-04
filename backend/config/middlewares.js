
'use strict';

module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: { enabled: true, headers: '*', origin: ['http://localhost:8000'] },
  },
  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
