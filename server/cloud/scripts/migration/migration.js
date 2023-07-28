var db
const _ = require('lodash')
const { newObjectId } = require('parse-server/lib/cryptoUtils')
const MongoClient = require('mongodb').MongoClient

function ready (cb, environment = 'development') {
  process.env.NODE_ENV = environment
  for (let i=0; i<5; i++) {
    const { parsed } = require('dotenv-flow').config({path: './' + '../'.repeat(i)})
    if (parsed.DATABASE_URI) break;
  }
  console.log(`Env = ${environment}, App = ${process.env.APP_NAME}`)
  return new Promise((resolve, reject) => {
    const mongoClient = new MongoClient(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false })
    mongoClient.connect(async function (err) {
      if (err) return reject(err)
      db = mongoClient.db()
      console.log('Connected to DB: ' + db.databaseName)
      resolve(db)
    })
  }).then(cb)
    .catch((err) => {
      console.log('MIGRATION ERROR', err)
      process.exit(1)
    })
}

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

  const allOtherPeople = Object.keys(_.omit(clpComplex, specialPeople))
  clpComplex = _.mapValues(clpComplex,
    perms => perms
      .replace('full', 'read,write')
      .replace('read', 'get,find,count')
      .replace('write', 'create,update,delete')
      .split(',')
      .map(p=>p.trim())
      .filter(p=>allPerms.includes(p))
    )

  allPerms.forEach(perm => {
    CLP[perm] = {} // by default, set no perm for anyone
    const hasThePerm = people => clpComplex[people] && clpComplex[people].includes(perm)

    // first in specialPeople is the most general, and all others specialPeople will inherit the perm
    for (const people of specialPeople) {
      if (hasThePerm(people)) {
        CLP[perm][specialPeopleMap[people]] = true
        break
      }
    }

    allOtherPeople.forEach(people => {
      if (hasThePerm(people))
        CLP[perm][people] = true
    })
  })

  const schema_$set_doc = {
    _id,
    ...(_.mapKeys(fields_options, (val, key) => `_metadata.fields_options.${key}`)),
    ...(_.mapKeys(indexes, (val, key) => `_metadata.indexes.${key}`)),
    '_metadata.class_permissions': {
      ...CLP,
      "protectedFields": {"*": []}
    },
    objectId: "string",
    updatedAt: "date",
    createdAt: "date",
    ...fields,
  }
  if (removeOldFields) await db.collection("_SCHEMA").deleteOne({_id})
  await upsertOneAndLog(db.collection("_SCHEMA"), {_id}, schema_$set_doc)
}

async function upsertOneAndLog(Collection, criteria, $setDoc) {
  if (Collection && typeof Collection == "string") {
    Collection = db.collection(Collection)
  }
  if (criteria && typeof criteria == "string") {
    criteria = {[criteria]: $setDoc[criteria]}
  }
  try {
    const result = await Collection.updateOne(criteria, {$set: $setDoc}, {upsert: true})
    const {modifiedCount, upsertedCount, upsertedId, matchedCount} = result
    console.log('UpSert into', Collection.collectionName, JSON.stringify($setDoc,null,2), {modifiedCount, upsertedCount, upsertedId, matchedCount})
  } catch(e) {
    const new$SetDoc = _.omit($setDoc, ["_id", "_created_at"])
    if ((typeof e == "object") && (e.constructor.name.includes("Mongo")) && e.message && e.message.includes('immutable') && e.message.includes('_id')) {
      const result = await Collection.updateOne(criteria, {$set: new$SetDoc}, {upsert: true})
      const {modifiedCount, upsertedCount, upsertedId, matchedCount} = result
      console.log('UpSert into', Collection.collectionName, "without the new id:", new$SetDoc, {modifiedCount, upsertedCount, upsertedId, matchedCount})
    } else
      console.log('ERROR: UpSert into', Collection.collectionName, new$SetDoc, typeof e == "object" ? e.message || e : e)
  }
  console.log('')
}

async function patchManyAndLog(collection, find, $set, pilot) {
  if (typeof collection == 'string') collection = db.collection(collection)
  console.log('Updating all records of:', collection.collectionName, pilot ? '(Pilot Mode)' : '')
  console.log('  Change:', find, '  =>  ', $set)
  if (pilot) {
    const matchedCount = await collection.find(find).count()
    console.log('  Result:', {matchedCount, modifiedCount: 0})
  } else {
    const {matchedCount, modifiedCount} = await collection.updateMany(find, {$set})
    console.log('  Result:', {matchedCount, modifiedCount})
  }
  console.log()
}

var processStart;
var progressTotal;
var progressDate;
var progressed;
const initProgress = (total) => {
  processStart = Date.now()
  progressTotal = total;
  progressDate = processStart
  progressed = 0
}
const progress = index => {
  progressed = index
  const now = Date.now()
  if (now-progressDate>1000) {
    const rate = progressed/progressTotal
    const spent = (now-processStart)/1000
    const left = (spent / rate) - spent
    process.stdout.write(`\r`+
      `Time Spent: ${Math.floor(spent/60)}m ${Math.floor(spent%60)}s    `+
      `ETA: ${Math.floor(left/60)}m ${Math.floor(left%60)}s    `+
      `${Math.floor(100*rate) }%              `
    )
    progressDate = now
  }
}

module.exports = {
  ready,

  upsertSCHEMA,
  upsertOneAndLog,
  patchManyAndLog,

  newObjectId,
  initProgress,
  progress,
}
