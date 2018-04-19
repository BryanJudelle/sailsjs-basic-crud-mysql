/**
 * Users.js
 *
 * @description :: Users model for admin dashboard
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName: 'tbl_users',
  autoPK: false,
  attributes: {
    userId: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    role: {
      type: 'string',
      enum: ['ADMIN', 'USER']
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'DISABLED', 'REMOVED']
    }
  }
};