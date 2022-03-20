'use strict'

module.exports = (app) => {
    const passport = require('passport')
    const usersController = require('../Controller/UsersController.js')



  
    app
        .route('/send/feedback')
        .post(usersController.sendFeedback)
    app
        .route('/send/master')
        .post(usersController.sendMasterClass)

}