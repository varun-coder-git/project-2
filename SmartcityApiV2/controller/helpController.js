const express = require('express'),
    errorLogModel = require('../models/ErrorLogModel'),
    ErrorLogs = require('./errorController'),
    nodemailer = require('nodemailer');
errorLogModel.errorData.ControllerName = 'HelpController';

var helpController = {
    helpEmail: function(req, res) {
        var help_data = req.body;
        var user_id = help_data.user_id;
        var email = help_data.email;
        var name = help_data.name;
        var category = help_data.category;
        var description = help_data.description;
        
        var transporter = nodemailer.createTransport({
            from: 'no-reply@raceeye.us',
            host: 'raceeye.us', // hostname
            secureConnection: true, // use SSL
            port: 587, // port for secure SMTP
            transportMethod: 'SMTP',
            auth: {
                user: 'no-reply@raceeye.us',
                pass: 'Cu$t0mer@30201'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'no-reply@raceeye.us', // sender address 
            to: email,
            // list of receivers
            // bcc: 'varun.gupta@eqw.io',
            subject: 'Smart-City', // Subject line 
            // text: '', // html body 
            html: "Hi SmartCity </br><b>User_name</b> : <b> " + name + "</b>,</br> <b>Category</b> : <b> " + category + "</b></br>\u00A0\u00A0<b>Issue</b> : <b>" + description + "</b>",
        };

        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                // res.status(500).send({
                //     status: false,
                //     message: err.message
                // })
                ErrorLogs.errorResponse(res, 'helpEmail', 'Failed to send email', 400)
                // console.log("err ", err);
            } else {
                res.status(200).send({
                    status: true,
                    message: "Mail Sent Successful"
                })
                // console.log("Mail Send")
            }
        });
    }
};


module.exports = helpController;