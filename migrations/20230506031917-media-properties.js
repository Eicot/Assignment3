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
  await  db.createTable('media_properties',{
      id: { type: 'int', unsigned: true, primaryKey:true, autoIncrement:true},
      name: { type: 'string', length:100, notNull: true},
      description: 'text',
  })
  await db.insert('media_properties',['name'],['Star Wars']);
  await db.insert('media_properties',['name'],['Marvel']);
  await db.insert('media_properties',['name'],['DC']);
};

exports.down = function(db) {
 return db.dropTable('media_properties')
};
exports._meta = {
  "version": 1
};
