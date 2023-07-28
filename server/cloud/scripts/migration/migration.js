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
  admins: 'full,addField',
  'role:Special': 'create,update',
})
*/
async function upsertSCHEMA(_id, fieldsComplex={}, indexComplex=[], clpComplex={}, removeOldFields = false) {
  const fields = {}
  const fields_options = {}
  for (const [prop, val] of Object.entries(fieldsComplex)) {
    const options = []
    const parts = val instanceof Array ? val : [val]
    if (parts[1]) options.push(["required", true])
    if (parts.length==3) options.push(["defaultValue", parts[2]])

    fields[prop] = parts[0] // field type definition
    if (options.length)
      fields_options[prop] = Object.fromEntries(options)
  }

  const indexes = {"_id_": {"_id": 1 }}
  for (const indexObj of indexComplex) {
    const unique = indexObj.unique
    delete indexObj.unique
    const indexName = Object.keys(indexObj).join('_')

    // SCHEMA indexes
    indexes[indexName] = indexObj

    const mongoIndex = {}
    for (const [prop, val] of Object.entries(indexObj)) {
      const isPointer = (fields[prop]||'')[0] == '*'
      const fieldName = isPointer ? '_p_'+prop : prop
      mongoIndex[fieldName] = val
    }

    const indexOptions = { name: indexName, unique }
    const res = await db.createIndex(_id, mongoIndex, indexOptions)
    console.log('createIndex', _id+':', mongoIndex, indexOptions, ' => ', res)
  }

  const CLP = {}
  const allPerms = ['get', 'find', 'count', 'create', 'update', 'delete', 'addField']
  const specialPeople = ['all', 'users', 'admins'] // in order of most general
  const specialPeopleMap = {
    'all': '*',
    'users': 'requiresAuthentication',
    'admins': 'role:admin'
  }
}
