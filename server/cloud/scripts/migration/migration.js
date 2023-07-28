var db
const _ = require('lodash')
const { newObjectId } = require('parse-server/lib/cryptoUtils')
const MongoClient = require('mongodb').MongoClient
ready.dev = cb => ready(cb, 'development')

/*
// FULL INPUT EXAMPLE (boilerplate):
upsertSCHEMA('ClassName', { // FIELDS
  field: 'boolean|number|string|date|object|array|file|*_User|*Class',
  requiredField: ['string', 'required'],
  fieldWithDefault: ['string',, 'value'],
  requiredWithDefault: ['string', 'required', 'value'],
}, [ // INDEXES
  {field: 1},
  {user: 1, friend: 1, unique: true}
], { // CLP (higher orders overrides lower)
  //PEOPLE=all|users|admins|role:Role Name
  //PERM=full|read|write|get|find|count|create|update|delete|addField
  //    full=read,write
  //    read=get,find,count
  //    write=create,update,delete
  'PEOPLE': 'PERM[,PERM[,...]]'
  all: 'read',
  users: 'write',
  admins: 'full',
  admins: 'full',
  'role:Special': 'create,update',
})
*/
