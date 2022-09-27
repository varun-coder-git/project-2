const express = require('express'),
    incidentModel = require('../models/incidentModel'),
    errorLogModel = require('../models/ErrorLogModel'),
    moment = require('moment'),
    mkdirp = require('mkdirp'),
    ErrorLogs = require('./errorController'),
    fs = require('fs');
errorLogModel.errorData.ControllerName = 'incidentController';

var incidentController = {
    getIncident: function (req, res) {
        var IncidentData = [], ward_name;
        async function GetIncidentData() {
            try {
                const result1 = await incidentModel.getIncidentDetails();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['user_id'] == 'null' || result1.rows[i]['user_id'] == null || result1.rows[i]['user_id'] == undefined) {
                            ward_name = 'Anonymous'
                        } else {
                            ward_name = result1.rows[i]['ward_name']
                        }
                        IncidentData.push({
                            "incident_title": result1.rows[i]['title'],
                            "incident_description": result1.rows[i]['description'],
                            "incident_id": result1.rows[i]['incident_id'],
                            "incident_type": result1.rows[i]['incident_cat_type'],
                            "submission_date": result1.rows[i]['reported_date'],
                            "status": result1.rows[i]['incident_status_type'],
                            "ward": ward_name,
                            "user_id": result1.rows[i]['user_id']
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: IncidentData
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getIncident', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getIncident', 'Internal server error', 500)
            }
        }
        GetIncidentData()
    },

    getIncidentDetailsById: function (req, res) {
        var IncidentData = req.body;
        var incident_id = IncidentData.incident_id;
        var offset = IncidentData.offset;
        var is_admin = IncidentData.is_admin;
        var db_name, IncidentDetails = [], comments = [], A_Full_name, A_ward_name, A_is_admin, IncidentMedia = [], account_type;

        async function GetIncidentDetailsByIdData() {
            try {
                const result1 = await incidentModel.getIncidentDetailsById(incident_id);
                // console.log(result1);
                if (result1.rows.length > 0) {
                    if (result1.rows[0]['user_id'] == null || result1.rows[0]['user_id'] == 'null' || result1.rows[0]['user_id'] == undefined) {
                        A_Full_name = 'Anonymous'
                        A_ward_name = 'Anonymous'
                        A_is_admin = 'Anonymous'
                    } else {
                        A_Full_name = result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name']
                        A_ward_name = result1.rows[0]['ward_name']
                        A_is_admin = result1.rows[0]['is_admin']
                    }
                    if (result1.rows[0]['comment_count'] == null) comment_count_db = 0
                    else comment_count_db = result1.rows[0]['comment_count']
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['media_count'] == 0) {
                            IncidentMedia = []
                        } else {
                            IncidentMedia.push({
                                "IncidentMedia_file": result1.rows[i]['media_path'],
                                "media_id": result1.rows[i]['IncidentMedia_id']
                            })
                        }
                    }
                    const result2 = await incidentModel.getIncidentComments(incident_id, offset);
                    if (result2.rows.length > 0) {
                        for (var i = 0; i < result2.rows.length; i++) {
                            if (result2.rows[i]['login_type'] == 'google' || result2.rows[i]['login_type'] == 'facebook') {
                                account_type = 'social'
                            }
                            else {
                                account_type = result2.rows[i]['login_type']
                            }
                            // if ((result2.rows[i]['is_admin'] == true || result2.rows[i]['is_admin'] == 'true') && (result1.rows[0]['is_admin'] == false || result1.rows[0]['is_admin'] == 'false')) {
                            //     db_name = "Admin"
                            // } else {
                            //     db_name = result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name']
                            // }
                            if (is_admin == false || is_admin == 'false'){
                                if(result2.rows[i]['is_admin']==false || result2.rows[i]['is_admin']=='false') db_name = result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name']
                                else db_name = "Admin"
                            }
                            else db_name = result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name']
                            comments.push({
                                "comment_incident_id": result2.rows[i]['incident_id'],
                                "image_path": result2.rows[i]['image_path'],
                                "full_name": db_name,
                                "comments": result2.rows[i]['comment'],
                                "status_name": result2.rows[i]['incident_status_type'],
                                "user_id": result2.rows[i]['user_id'],
                                "is_admin": result2.rows[i]['is_admin'],
                                "submission_date": moment(result2.rows[i]['reported_date'], 'YYYY.MM.DD').fromNow(),
                                "account_type": account_type
                            })
                        }
                    }
                    IncidentDetails.push({
                        "Image": result1.rows[0]['image_path'],
                        "User_id": result1.rows[0]['user_id'],
                        "Full_name": A_Full_name,
                        "Incident_Title": result1.rows[0]['title'],
                        "Incident_Description": result1.rows[0]['description'],
                        "Incident_Id": result1.rows[0]['incident_id'],
                        "Incident_Type": result1.rows[0]['incident_cat_type'],
                        "Incident_PostedDate": moment(result1.rows[0]['reported_date'], 'YYYY.MM.DD').fromNow(),
                        "Incident_Status": result1.rows[0]['incident_status_type'],
                        "Incident_StatusId": result1.rows[0]['incident_status_id'],
                        "Incident_CategoryID": result1.rows[0]['incident_cat_id'],
                        "Incident_CategoryName": result1.rows[0]['incident_cat_type'],
                        "feedback_rating": result1.rows[0]['feedback_rating'],
                        "feedback_description": result1.rows[0]['feedback_description'],
                        "feedback_submit_flag": result1.rows[0]['feedback_submit'],
                        "address": result1.rows[0]['address'],
                        "latitude": result1.rows[0]['latitude'],
                        "longitude": result1.rows[0]['longitude'],
                        "Ward_Name": A_ward_name,
                        "Image": result1.rows[0]['image_path'],
                        "is_admin": A_is_admin,
                        "comment_count": comment_count_db,
                        "IncidentMedia": IncidentMedia,
                        "comments": comments,
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: IncidentDetails,
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getIncidentDetailsById', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getIncidentDetailsById', 'Internal server error', 500)
            }
        }
        GetIncidentDetailsByIdData()
    },

    getIncidentCategory: function (req, res) {
        async function GetIncidentCategoryData() {
            try {
                const result1 = await incidentModel.getIncidentCategory();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getIncidentCategory', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getIncidentCategory', 'Internal server error', 500)
            }
        }
        GetIncidentCategoryData()
    },

    getIncidentStatusCategory: function (req, res) {
        async function GetIncidentStatusCategoryData() {
            try {
                const result1 = await incidentModel.getIncidentStatusCategory();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getIncidentStatusCategory', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getIncidentStatusCategory', 'Internal server error', 500)
            }
        }
        GetIncidentStatusCategoryData()
    },

    deleteIncident: function (req, res) {
        async function DeleteIncidentData() {
            try {
                const result1 = await incidentModel.deleteIncident(req.body.incident_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Incident Deleted Successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteIncident', 'Failed to delete incident', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteIncident', 'Internal server error', 500)
            }
        }
        DeleteIncidentData()
    },

    updateIncidentStatus: function (req, res) {
        var IncidentData = req.body;
        var incident_id = IncidentData.incident_id;
        var incident_status_id = IncidentData.incident_status_id;
        async function UpdateIncidentStatusData() {
            try {
                const result1 = await incidentModel.updateIncidentStatus(incident_id, incident_status_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Updated successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'updateIncidentStatus', 'Failed to update data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'updateIncidentStatus', 'Internal server error', 500)
            }
        }
        UpdateIncidentStatusData()
    },

    addIncidentComment: function (req, res) {
        var CommentData = req.body;
        var user_id = CommentData.user_id;
        var comment = CommentData.comment;
        var incident_id = CommentData.incident_id;
        async function AddIncidentCommentData() {
            try {
                const result1 = await incidentModel.addIncidentComment(user_id, comment, incident_id);
                if (result1.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: "Comment Added Successful"
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'addIncidentComment', 'Failed to add comment', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'addIncidentComment', 'Internal server error', 500)
            }
        }
        AddIncidentCommentData()
    },

    deleteIncidentComment: function (req, res) {
        async function DeleteIncidentCommentData() {
            try {
                const result1 = await incidentModel.deleteIncidentComment(req.body.incident_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Comment deleted successful"
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteIncidentComment', 'Failed to delete comment', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteIncidentComment', 'Internal server error', 500)
            }
        }
        DeleteIncidentCommentData()
    },

    // OCM API

    createIncident: function (req, res) {
        var Incident_Data = req.body;
        var user_id = Incident_Data.user_id;
        var token = Incident_Data.token;
        var title = Incident_Data.title;
        var incident_cat_id = Incident_Data.incident_cat_id;
        var description = Incident_Data.description;
        var is_anonymous = Incident_Data.is_anonymous;
        var latitude = Incident_Data.latitude;
        var longitude = Incident_Data.longitude;
        var address = Incident_Data.address;
        var incomingFile = []
        var thread_length = []
        incidentModel.createIncident(user_id, is_anonymous, title, incident_cat_id, description, latitude, longitude, address, function (err, Incident_Data) {
            if (err) {
                ErrorLogs.errorResponse(res, 'createIncident', 'Internal server error', 500)
            } else {
                var incident_id = Incident_Data.rows[0]['incident_id'];
                var files_data = []
                if (req.files) {
                    for (const [key] of Object.entries(req.files)) {
                        files_data.push(`${key}`);
                    }
                    for (var i = 0; i < files_data.length; i++) {
                        incomingFile.push(req.files[files_data[i]]);
                    }
                    var path = './public/assests/incident/' + incident_id
                    mkdirp(path + "/", function (err) {
                        if (err) console.error(err)
                        else {
                            for (var p = 0; p < Object.keys(req.files).length; p++) {
                                // if ((incomingFile[p].mimetype == 'image/png') || (incomingFile[p].mimetype == 'image/jpeg') || (incomingFile[p].mimetype == 'image/jfif') || (incomingFile[p].mimetype == 'application/pdf') || (incomingFile[p].mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                                var GUID = "assests/incident/" + incident_id;
                                var attachment_path = GUID + '/';
                                var db_path = ("public/" + attachment_path + incomingFile[p].name);
                                var path = './public/assests/incident/' + incident_id;
                                incidentModel.insertIncidentMedia(incident_id, db_path, function (err, update_data) {
                                    if (err) {
                                        ErrorLogs.errorResponse(res, 'createIncident', 'Internal server error', 500)
                                    } else {
                                        if (update_data.rows.length > 0) {
                                            for (var i = 0; i < Object.keys(req.files).length; i++) {
                                                fs.writeFile(path + '/' + incomingFile[i].name, incomingFile[i].data, function (err, result) {
                                                    if (err) {
                                                        ErrorLogs.errorResponse(res, 'createIncident', 'File not uploaded!!', 403)
                                                    } else {
                                                        thread_length.push(update_data.rows)
                                                        if (Object.keys(req.files).length == thread_length.length) {
                                                            res.status(201).send({
                                                                status: true,
                                                                message: "Incident Added Successful",
                                                            })
                                                        }
                                                    }
                                                });
                                            }
                                        } else {
                                            ErrorLogs.errorResponse(res, 'createIncident', 'Failed to register incident', 400)
                                        }
                                    }
                                });
                                // } else {
                                //     logErrorMessage(res, 'createIncident', "Invalid file format", 404, {
                                //         status: false,
                                //         message: "Invalid file format"
                                //     });
                                // }
                            }

                        }
                    });
                } else {
                    res.status(201).send({
                        status: true,
                        message: "Incident Added Successful",
                    })
                }
            }
        });

    },

    searchIncident: function (req, res) {
        var SearchData = req.body;
        var user_id = SearchData.user_id;
        var incident_cat_id = SearchData.incident_cat_id;
        var incident_status_id = SearchData.incident_status_id;
        var incident_id = SearchData.incident_id;
        var SearchIncident = [];
        async function SearchIncidentData() {
            try {
                let incidentCatID, incidentStatusID, incidentID, subQuery, mainQuery, orderBy = ' order by i.incident_id DESC';
                subQuery = "select i.incident_id,i.user_id,i.title,i.description,ic.incident_cat_type ,is2.incident_status_type from incident i inner join incident_category ic on i.incident_cat_id =ic.incident_cat_id inner join incident_status is2 on is2.incident_status_id =i.incident_status_id where i.user_id='" + user_id + "' and i.title is not null and i.incident_comment ='incident' and i.incident_active_delete='active'"

                if (incident_cat_id != null) {
                    incidentCatID = " and i.incident_cat_id='" + incident_cat_id + "'"
                } else incidentCatID = ''

                if (incident_status_id != null) {
                    incidentStatusID = " and i.incident_status_id='" + incident_status_id + "'"
                } else incidentStatusID = ''

                if (incident_id != null) {
                    incidentID = " and i.incident_id='" + incident_id + "'"
                } else incidentID = ''

                mainQuery = subQuery + incidentCatID + incidentStatusID + incidentID + orderBy;
                const result1 = await incidentModel.searchIncident(mainQuery);
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        SearchIncident.push({
                            "incident_title": result1.rows[i]['title'],
                            "incident_description": result1.rows[i]['description'],
                            "reported_date": result1.rows[i]['reported_date'],
                            "incident_cat_type": result1.rows[i]['incident_cat_type'],
                            "incident_status_type": result1.rows[i]['incident_status_type'],
                            "incident_id": result1.rows[i]['incident_id'],
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: SearchIncident
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'searchIncident', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'searchIncident', 'Internal server error', 500)
            }
        }
        SearchIncidentData()
    },

    myIncidentStatus: function (req, res) {
        async function MyIncidentStatusData() {
            try {
                const result1 = await incidentModel.myIncidentStatus(req.body.user_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'myIncidentStatus', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'myIncidentStatus', 'Internal server error', 500)
            }
        }
        MyIncidentStatusData()
    },

    getMyIncidentFeedback: function (req, res) {
        var FeedbackData = req.body;
        var incident_id = FeedbackData.incident_id;
        var feedback_rating = FeedbackData.feedback_rating;
        var feedback_description = FeedbackData.feedback_description;

        async function GetMyIncidentFeedbackData() {
            try {
                const result1 = await incidentModel.myIncidentFeedback(incident_id, feedback_rating, feedback_description);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Feedback Updated Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getMyIncidentFeedback', 'Failed to update data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getMyIncidentFeedback', 'Internal server error', 500)
            }
        }
        GetMyIncidentFeedbackData()
    },

};
module.exports = incidentController;