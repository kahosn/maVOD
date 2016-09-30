const mongoose = require('mongoose')
const User = require('../../models/user.model')
const cfg = require('../config/mavodConfig.json')

module.exports.save = ((user)=> {
    user.save()
})