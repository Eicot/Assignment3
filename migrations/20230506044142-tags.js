'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable('tags', {
      id: { type: 'int', primaryKey:true, autoIncrement:true, unsigned:true},
      name: { type: 'string', length:100, notNull: true},
  })

  await db.insert('tags',['name'],['colorful']);
  await db.insert('tags',['name'],['simple']);
  await db.insert('tags',['name'],['chill']);
  await db.insert('tags',['name'],['fatasy']);
  await db.insert('tags',['name'],['fan posters']);
};

exports.down = function(db) {
  return db.dropTable('tags');
};

exports._meta = {
  "version": 1
};
