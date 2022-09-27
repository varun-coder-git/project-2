const express = require('express'),
    notificationModel = require('../models/notificationModel'),
    errorLogModel = require('../models/ErrorLogModel'),
    ErrorLogs = require('./errorController');
errorLogModel.errorData.ControllerName = 'NotificationController';

var NotificationController = {
    getNotificationDetails: function (req, res) {
        var notificationData = [], db_subject, ID,type_data;

        async function GetNotificationDetails() {
            try {
                const result1 = await notificationModel.getTableDetails(req.body.user_id);
                if (result1.rows.length > 0) {
                    if (result1.rows.length < 5) {
                        for (var i = 0; i < result1.rows.length; i++) {
                            if (result1.rows[i]['type'] == 'poll' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New Poll : Vote for ' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='poll'
                            }
                            else if (result1.rows[i]['type'] == 'idea' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New Idea : ' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='idea'
                            }
                            else if (result1.rows[i]['type'] == 'idea_comment' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New comment on idea : ' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='idea';
                            }
                            else if (result1.rows[i]['type'] == 'incident_comment' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New comment on incident : ' + result1.rows[i]['subject']
                                ID = result1.rows[i]['id'];
                                type_data='incident';
                            }
                            else if (result1.rows[i]['type'] == 'incident_status' && result1.rows[i]['status'] != 'NA') {
                                db_subject = 'Status update of incident ID : ' + result1.rows[i]['id'] + ' is ' + result1.rows[i]['status'] + ' now';
                                ID = result1.rows[i]['id'];
                                type_data='incident';
                            }
                            else if (result1.rows[i]['type'] == 'volunteer' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New Volunteer : ' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='volunteer';
                            }
                            else if (result1.rows[i]['type'] == 'volunteer_comment' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New comment on volunteer : ' + result1.rows[i]['subject']
                                ID = result1.rows[i]['id'];
                                type_data='volunteer';
                            }
                            else if (result1.rows[i]['type'] == 'volunteer_status' && result1.rows[i]['status'] != 'NA') {
                                db_subject = 'Status update of volunteer ID : ' + result1.rows[i]['id'] + ' is ' + result1.rows[i]['status'] + ' now';
                                ID = result1.rows[i]['id'];
                                type_data='volunteer';
                            }
                            else if (result1.rows[i]['type'] == 'complaint_comment' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New comment on complaint :' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='complaint';
                            }
                            else if (result1.rows[i]['type'] == 'complaint_status' && result1.rows[i]['status'] != 'NA') {
                                db_subject = 'Status update of complaint ID :' + result1.rows[i]['id'] + ' is ' + result1.rows[i]['status'] + ' now';
                                ID = result1.rows[i]['id'];
                                type_data='complaint';
                            }
                            else {
                                db_subject = 'No Notification'
                            }
                            notificationData.push({
                                "subject": db_subject,
                                "ID":ID,
                                "type_data":type_data
                            })
                        }
                        res.status(200).send({
                            status: true,
                            message: "Data Found Successful",
                            data: notificationData,
                        });
                    } else {
                        for (var i = 0; i < 5; i++) {
                            if (result1.rows[i]['type'] == 'poll' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New Poll : Vote for ' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='poll'
                            }
                            else if (result1.rows[i]['type'] == 'idea' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New Idea : ' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='idea'
                            }
                            else if (result1.rows[i]['type'] == 'idea_comment' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New comment on idea : ' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='idea';
                            }
                            else if (result1.rows[i]['type'] == 'incident_comment' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New comment on incident : ' + result1.rows[i]['subject']
                                ID = result1.rows[i]['id'];
                                type_data='incident';
                            }
                            else if (result1.rows[i]['type'] == 'incident_status' && result1.rows[i]['status'] != 'NA') {
                                db_subject = 'Status update of incident ID : ' + result1.rows[i]['id'] + ' is ' + result1.rows[i]['status'] + ' now';
                                ID = result1.rows[i]['id'];
                                type_data='incident';
                            }
                            else if (result1.rows[i]['type'] == 'volunteer' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New Volunteer : ' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='volunteer';
                            }
                            else if (result1.rows[i]['type'] == 'volunteer_comment' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New comment on volunteer : ' + result1.rows[i]['subject']
                                ID = result1.rows[i]['id'];
                                type_data='volunteer';
                            }
                            else if (result1.rows[i]['type'] == 'volunteer_status' && result1.rows[i]['status'] != 'NA') {
                                db_subject = 'Status update of volunteer ID : ' + result1.rows[i]['id'] + ' is ' + result1.rows[i]['status'] + ' now';
                                ID = result1.rows[i]['id'];
                                type_data='volunteer';
                            }
                            else if (result1.rows[i]['type'] == 'complaint_comment' && result1.rows[i]['status'] == 'NA') {
                                db_subject = 'New comment on complaint :' + result1.rows[i]['subject'];
                                ID = result1.rows[i]['id'];
                                type_data='complaint';
                            }
                            else if (result1.rows[i]['type'] == 'complaint_status' && result1.rows[i]['status'] != 'NA') {
                                db_subject = 'Status update of complaint ID :' + result1.rows[i]['id'] + ' is ' + result1.rows[i]['status'] + ' now';
                                ID = result1.rows[i]['id'];
                                type_data='complaint';
                            }else if (result1.rows[i]['type'] == 'breaking-news' || result1.rows[i]['type'] == 'news') {
                                if(result1.rows[i]['type'] == 'breaking-news'){
                                db_subject = 'New breaking news is published :' + result1.rows[i]['subject'];
                                }else{
                                    db_subject = 'New news is published :' + result1.rows[i]['subject']; 
                                }
                                ID = result1.rows[i]['id'];
                                type_data='news';
                            }
                            else {
                                db_subject = 'No Notification'
                            }
                            notificationData.push({
                                "subject": db_subject,
                                "ID":ID,
                                "type_data":type_data
                            })
                        }
                        res.status(200).send({
                            status: true,
                            message: "Data Found Successful",
                            data: notificationData,
                        });
                    }
                } else {
                    ErrorLogs.errorResponse(res, 'getNotificationDetails', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getNotificationDetails', 'Internal server error', 500)
            }
        }
        GetNotificationDetails()
    },
};

module.exports = NotificationController;