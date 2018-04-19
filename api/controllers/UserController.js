/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {

    saveUserInfo: function (req, res) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});

        Utils.userNameCheck(params.userName, function (r) {

            if (r !== undefined && r.username && r.username.toString().toUpperCase() === params.userName.toUpperCase())
                res.serverError('USERNAME is already exist');
            else {
                var paramObj = {
                    fullname: params.userFullname,
                    username: params.userName,
                    password: Utils.encryptPassword(params.userPassword),
                    role: (params.userRole === 'on') ? 'ADMIN' : 'USER',
                };

                UserServices.saveUserInfo(paramObj, function (err, user) {
                    if (err.error)
                        return res.serverError(err.message, err.origin);
                    return res.json(user);
                });
            }
        });
    },

    updateUserInfo: function (req, res) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});

        var paramId = { userId: params.id };

        var paramObj = {
            fullname: params.editUserFullname,
            username: params.editUserName,
            password: Utils.encryptPassword(params.editUserPassword),
            status: (params.editUserStatus === 'on') ? 'ACTIVE' : 'DISABLED',
            role: (params.editUserRole === 'on') ? 'ADMIN' : 'USER',
        };

        var response = UserServices.updateUserInfo(paramId, paramObj, function (err, user) {
            if (err) return err;
            return user;
        });

        return res.json(response);
    },

    deleteUserInfo: function (req, res) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});

        var paramId = { userId: params.id },
            paramObj = { status: params.userStatus };

        console.log(JSON.stringify(paramId));
        console.log(JSON.stringify(paramObj));
        var response = UserServices.updateUserInfo(paramId, paramObj, function (err, user) {
            console.log(err);
            if (err) return err;
            return user;
        });

        return res.json(response);
    },

    getAllUsers: function (req, res) {
        var response = UserServices.getAllUser(function (user) {
            return res.json(user);
        });
    },

    getUserById: function (req, res) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});

        var response = UserServices.findUser(params.id, function (user) {
            return res.json(user);
        });
    },
};

