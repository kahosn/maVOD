/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Node server script that saves User model to/from MongoDB database
*/
"use strict"
const mongoose = require('mongoose')
const User = require('../../models/user.model')
const cfg = require('../config/mavodConfig.json')

/**
 * @desc saves User model in MongoDB
 * @param model $user - the user model to save
 * @return Promise - success or failure
*/
module.exports.save = ((user)=> {
    return user.save()
})