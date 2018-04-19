/**
 * 
 * UserServices.js
 * 
 * @author Bryan Judelle Ramos
 * @description User Services, do basic DB related query and passed to controller
 *              this contains all the DATA MODEL ABSTRACTION LAYER ONLY.
 * 
 * 
 */

module.exports = {

    isUserNameExist: function (userName, callback) {
        var params = { username: userName };
        Users.findOne(params).exec(function (err, userInfo) {
            if (err) {
                var opts = {
                    error: true,
                    origin: 'UserServices.isUserNameExist {ERROR on FINDING USERNAME INFO}',
                    message: Utils.parseError(err)
                };
                return callback(opts);
            }
            return callback(userInfo);
        });
    },

    findUser: function (id, callback) {
        var params = { userId: id };
        Users.findOne(params).exec(function (err, userInfo) {
            if (err) {
                var opts = {
                    error: true,
                    origin: 'UserServices.findUser {ERROR on FINDING USER INFO}',
                    message: Utils.parseError(err)
                };
                return callback(opts);
            }
            return callback(userInfo);
        });
    },

    findUserByQuery: function (query, callback) {
        Users.findOne(query).exec(function (err, userInfo) {
            if (err) {
                var opts = {
                    error: true,
                    origin: 'UserServices.findUser {ERROR on FINDING USER INFO}',
                    message: Utils.parseError(err)
                };
                return callback(opts);
            }
            return callback(userInfo);
        });
    },

    getAllUser: function (callback) {
        Users.find().exec(function (err, listUser) {
            if (err) {
                var opts = {
                    error: true,
                    origin: 'UserServices.getAllUser {ERROR on RETRIEVING USER LIST}',
                    message: Utils.parseError(err)
                };
                return callback(opts);
            }
            return callback(listUser);
        });
    },

    saveUserInfo: function (params, callback) {
        Users.create(params).exec(function (err, userInfo) {
            if (err) {
                var opts = {
                    error: true,
                    origin: 'UserServices.saveUserInfo {ERROR on SAVING USER INFO}',
                    message: Utils.parseError(err)
                };
                return callback(opts);
            }
            else
                return callback(userInfo);
        });


    },

    updateUserInfo: function (paramsId, paramsValue, callback) {
        Users.update(paramsId, paramsValue).exec(function (err, userInfo) {
            if (err) {
                var opts = {
                    error: true,
                    origin: 'UserServices.updateUserInfo {ERROR on UPDATING USER INFO}',
                    message: Utils.parseError(err)
                };
                return callback(opts);
            }
            return callback(userInfo);
        });
    },
};
