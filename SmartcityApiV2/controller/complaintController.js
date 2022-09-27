const express = require('express'),
    complaintModel = require('../models/complaintModel'),
    moment = require('moment'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'complaintController';

var complaintController = {
    createComplaint: function (req, res) {
        var ComplaintRequest = req.body;
        var user_id = ComplaintRequest.user_id;
        var ward_id = ComplaintRequest.ward_id;
        var subject = ComplaintRequest.title;
        var complaint_cat_id = ComplaintRequest.complaint_cat_id;
        var complaint = ComplaintRequest.complaint;
        var latitude = ComplaintRequest.latitude;
        var longitude = ComplaintRequest.longitude;
        var address = ComplaintRequest.address;
        var incomingFile = []
        var thread_length = []

        complaintModel.createComplaintData(user_id, subject, complaint_cat_id, complaint, ward_id, latitude, longitude, address, function (err, ComplaintData) {
            if (err) {
                ErrorLogs.errorResponse(res, 'createComplaint', 'Internal server error', 500)
            } else {
                if (ComplaintData.rows.length > 0) {
                    var thread_id = ComplaintData.rows[0]['thread_id'];
                    var files_data = []
                    if (req.files) {
                        for (const [key] of Object.entries(req.files)) {
                            files_data.push(`${key}`);
                        }
                        for (var i = 0; i < files_data.length; i++) {
                            incomingFile.push(req.files[files_data[i]]);
                        }
                        var path = './public/assests/complaint/' + thread_id
                        mkdirp(path + "/", function (err) {
                            if (err) console.error(err)
                            else {
                                // console.log("Object.keys(req.files)", Object.keys(req.files));
                                for (var p = 0; p < Object.keys(req.files).length; p++) {
                                    // if ((incomingFile[p].mimetype == 'image/png') || (incomingFile[p].mimetype == 'image/jpeg') || (incomingFile[p].mimetype == 'image/jfif') || (incomingFile[p].mimetype == 'application/pdf') || (incomingFile[p].mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                                    var GUID = "assests/complaint/" + thread_id;
                                    var attachment_path = GUID + '/';
                                    var db_path = ("public/" + attachment_path + incomingFile[p].name);
                                    var path = './public/assests/complaint/' + thread_id
                                    complaintModel.insertComplaintMedia(thread_id, db_path, function (err, update_data) {
                                        if (err) {
                                            ErrorLogs.errorResponse(res, 'createComplaint', 'Internal server error', 500)
                                        } else {
                                            if (update_data.rows.length > 0) {
                                                for (var i = 0; i < Object.keys(req.files).length; i++) {
                                                    fs.writeFile(path + '/' + incomingFile[i].name, incomingFile[i].data, function (err, result) {
                                                        if (err) {
                                                            ErrorLogs.errorResponse(res, 'createComplaint', 'File not uploaded!!', 400)
                                                        } else {
                                                            thread_length.push(update_data.rows)
                                                            if (Object.keys(req.files).length == thread_length.length) {
                                                                res.status(201).send({
                                                                    status: true,
                                                                    message: "Complaint Registered Successful",
                                                                })
                                                            }
                                                        }
                                                    });
                                                }
                                            } else {
                                                ErrorLogs.errorResponse(res, 'createComplaint', 'Failed to register complaint', 400)
                                            }
                                        }
                                    });
                                    // } else {
                                    //     logErrorMessage(res, 'createComplaint', "Invalid file format", 404, {
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
                            message: "Complaint Registered Successful",
                        })
                    }
                } else {
                    ErrorLogs.errorResponse(res, 'createComplaint', 'Failed to register complaint', 400)
                }
            }
        });
    },

    getComplaint: function (req, res) {
        var ComplaintData = [];
        async function getComplaintData() {
            try {
                const result1 = await complaintModel.getComplaint();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        ComplaintData.push({
                            "complaint_subject": result1.rows[i]['subject'],
                            "full_name": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "submission_date": result1.rows[i]['submission_date'],
                            "complaint_type": result1.rows[i]['category_name'],
                            "status": result1.rows[i]['status_name'],
                            "complaint_id": result1.rows[i]['thread_id'],
                            "complaint_cat_id": result1.rows[i]['complaint_cat_id'],
                            "ward_id": result1.rows[i]['ward_id'],
                            "ward_name": result1.rows[i]['ward_name'],
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: ComplaintData
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getComplaint', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getComplaint', 'Internal server error', 500)
            }
        }
        getComplaintData()


    },

    getComplaintSummaryById: function (req, res) {
        var summary_data = req.body;
        var thread_id = summary_data.complaint_id;
        var offset = summary_data.offset;
        var is_admin = summary_data.is_admin;
        var db_name, ComplaintSummaryData = [], comments = [], comment_count = 0, complaint_media_data = [], account_type;

        async function GetComplaintSummaryByIdData() {
            try {
                const result1 = await complaintModel.getComplaintSummaryById(thread_id);
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['media_count'] == 0) complaint_media_data = []
                        else {
                            complaint_media_data.push({
                                "complaint_media_id": result1.rows[i]['complaint_media_id'],
                                "complaint_media_file": result1.rows[i]['file_name']
                            })
                        }
                    }
                    if (result1.rows[0]['comment_count'] == null) comment_count = 0
                    else comment_count = result1.rows[0]['comment_count']
                    const result2 = await complaintModel.getComments(thread_id, offset);
                    if (result2.rows.length > 0) {
                        for (var i = 0; i < result2.rows.length; i++) {
                            // console.log("result2.rows[i]['f_name'] result2.rows[i]['l_name']",result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name']);
                            // console.log("is_admin",is_admin);
                            if (result2.rows[i]['login_type'] == 'google' || result2.rows[i]['login_type'] == 'facebook') account_type = 'social'
                            else account_type = result2.rows[i]['login_type']
                            if (is_admin == false || is_admin == 'false'){
                                if(result2.rows[i]['is_admin']==false || result2.rows[i]['is_admin']=='false') db_name = result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name']
                                else db_name = "Admin"
                            }
                            else db_name = result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name']
                            comments.push({
                                "complaint_thread_id": result2.rows[i]['thread_id'],
                                "image_path": result2.rows[i]['image_path'],
                                "full_name": db_name,
                                "comments": result2.rows[i]['comments'],
                                "status_name": result2.rows[i]['status_name'],
                                "user_id": result2.rows[i]['user_id'],
                                "is_admin": result2.rows[i]['is_admin'],
                                "submission_date": moment(result2.rows[i]['submission_date'], 'YYYY.MM.DD').fromNow(),
                                "account_type": account_type
                            })
                        }
                        // console.log("comments",comments);
                    }
                    ComplaintSummaryData.push({
                        "image": result1.rows[0]['image_path'],
                        "user_id": result1.rows[0]['user_id'],
                        "full_name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "ComplaintTitle": result1.rows[0]['subject'],
                        "ComplaintDescription": result1.rows[0]['complaint'],
                        "complaint_id": result1.rows[0]['thread_id'],
                        "complaint_type": result1.rows[0]['category_name'],
                        "ComplaintPostedDate": moment(result1.rows[0]['submission_date'], 'YYYY.MM.DD').fromNow(),
                        "ComplaintStatus": result1.rows[0]['status_name'],
                        "ComplaintStatusId": result1.rows[0]['complaint_status_id'],
                        "ComplaintCategoryID": result1.rows[0]['complaint_cat_id'],
                        "ComplaintCategoryName": result1.rows[0]['category_name'],
                        "feedback_rating": result1.rows[0]['feedback_rating'],
                        "feedback_description": result1.rows[0]['feedback_description'],
                        "feedback_submit_flag": result1.rows[0]['feedback_submit'],
                        "WardId": result1.rows[0]['ward_id'],
                        "WardName": result1.rows[0]['ward_name'],
                        "is_admin": result1.rows[0]['is_admin'],
                        "address": result1.rows[0]['address'],
                        "latitude": result1.rows[0]['latitude'],
                        "longitude": result1.rows[0]['longitude'],
                        "comment_count": comment_count,
                        "complaint_media": complaint_media_data,
                        "comments": comments,
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: ComplaintSummaryData,
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'userMobileOTPVerify', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'userRegistration', 'Internal server error', 500)
            }
        }
        GetComplaintSummaryByIdData()
    },

    updateComplaintStatus: function (req, res) {
        var StatusData = req.body;
        var thread_id = StatusData.complaint_id;
        var complaint_status_id = StatusData.complaint_status_id;
        var is_admin = StatusData.is_admin;
        async function UpdateComplaintStatusData() {
            try {
                if (is_admin == true || is_admin == 'true') {
                    const result1 = await complaintModel.updateAdminComplaintStatus(thread_id, complaint_status_id);
                    if (result1.rows.length > 0) {
                        res.status(200).send({
                            status: true,
                            message: "Data Updated Successful",
                            data: result1.rows,
                        })
                    } else {
                        ErrorLogs.errorResponse(res, 'updateComplaintStatus', 'Failed to Update data', 403)
                    }
                } else {
                    const result2 = await complaintModel.getComplaintStatusDate(thread_id);
                    if (result2.rows.length > 0) {
                        var startDate = moment(result2.rows[0]['complaint_status_date'], 'MM-DD-YYYY HH:mm');
                        var endDate = moment().format(" MM-DD-YYYY HH:mm");
                        var dayDiff = endDate.diff(startDate, 'days');
                        if (dayDiff <= 7) {
                            const result3 = await complaintModel.updateAdminComplaintStatus(thread_id, complaint_status_id);
                            if (result3.rows.length > 0) {
                                res.status(200).send({
                                    status: true,
                                    message: "Data Updated Successful",
                                    data: result3.rows,
                                })
                            } else {
                                ErrorLogs.errorResponse(res, 'updateComplaintStatus', 'Failed to Update data', 400)
                            }
                        } else {
                            ErrorLogs.errorResponse(res, 'updateComplaintStatus', "7 days limit exceeded, you can't reopen now", 403)
                        }
                    } else {
                        ErrorLogs.errorResponse(res, 'updateComplaintStatus', 'Data Not Found', 404)
                    }
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'updateComplaintStatus', 'Internal server error', 500)
            }
        }
        UpdateComplaintStatusData()
    },

    deleteComplaint: function (req, res) {
        async function DeleteComplaintData() {
            try {
                const result1 = await complaintModel.deleteComplaint(req.body.complaint_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Complaint Deleted Successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteComplaint', 'Failed to delete complaint', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteComplaint', 'Internal server error', 500)
            }
        }
        DeleteComplaintData()
    },

    addComment: function (req, res) {
        var comment_data = req.body;
        var user_id = comment_data.user_id;
        var comments = comment_data.comments;
        var thread_id = comment_data.thread_id;
        async function AddCommentData() {
            try {
                const result1 = await complaintModel.addComment(user_id, comments, thread_id);
                if (result1.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: 'Comment Added Successful'
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'addComment', 'Failed to add comment', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'addComment', 'Internal server error', 500)
            }
        }
        AddCommentData()
    },

    deleteComment: function (req, res) {
        async function DeleteCommentData() {
            try {
                const result1 = await complaintModel.deleteComment(req.body.comment_thread_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Comment Deleted Successful"
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteComment', 'Failed to delete comment', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteComment', 'Internal server error', 500)
            }
        }
        DeleteCommentData()
    },

    getComplaintStatus: function (req, res) {
        var status_data = []
        async function GetComplaintStatusData() {
            try {
                const result1 = await complaintModel.getComplaintStatus();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        status_data.push({
                            "label": result1.rows[i]['status_name'],
                            "value": result1.rows[i]['complaint_status_id']
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: status_data
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getComplaintStatus', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getComplaintStatus', 'Internal server error', 500)
            }
        }
        GetComplaintStatusData()
    },

    searchComplaint: function (req, res) {
        var SearchData = req.body;
        var user_id = SearchData.user_id;
        var complaint_cat_id = SearchData.complaint_cat_id;
        var complaint_status_id = SearchData.complaint_status_id;
        var complaint_id = SearchData.thread_id;
        var ComplaintData = [];
        async function SearchComplaintData() {
            try {
                let complaintCatID, complaintStatusID, complaintID, subQuery, mainQuery, orderBy=" order by c.thread_id DESC";
                subQuery = "select w.ward_id,w.ward_name,c.subject,c.complaint,u.f_name,u.l_name,c.submission_date ,cc.category_name,c.complaint_cat_id, c.complaint_status_id,s.status_name,c.thread_id from complaints c inner join users u on c.user_id = u.user_id inner join complaint_category cc on c.complaint_cat_id= cc.complaint_cat_id inner join complaint_status s on s.complaint_status_id=c.complaint_status_id inner join ward w on w.ward_id=c.ward_id where u.user_id='"+user_id+"' and active_delete='active' and c.subject is not null "

                if (complaint_cat_id != null) {
                    complaintCatID=" and c.complaint_cat_id='"+complaint_cat_id+"'"
                } else complaintCatID=''

                if (complaint_id != null) {
                    complaintID=" and c.thread_id='"+complaint_id+"'"
                } else complaintID=''

                if (complaint_status_id != null ) {
                    complaintStatusID=" and c.complaint_status_id='"+complaint_status_id+"'"
                } else complaintStatusID=''

                mainQuery= subQuery +complaintCatID + complaintID +complaintStatusID+ orderBy;
                const result1 = await complaintModel.searchComplaint(mainQuery);
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        ComplaintData.push({
                            "complaint_subject": result1.rows[i]['subject'],
                            "full_name": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "submission_date": result1.rows[i]['submission_date'],
                            "complaint_type": result1.rows[i]['category_name'],
                            "status": result1.rows[i]['status_name'],
                            "complaint_id": result1.rows[i]['thread_id'],
                            "complaint_cat_id": result1.rows[i]['complaint_cat_id'],
                            "ward_id": result1.rows[i]['ward_id'],
                            "ward_name": result1.rows[i]['ward_name'],
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: ComplaintData
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'searchComplaint', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'searchComplaint', 'Internal server error', 500)
            }
        }
        SearchComplaintData()
    },

    myComplaintStatus: function (req, res) {
        async function MyComplaintStatusData() {
            try {
                const result1 = await complaintModel.myComplaintStatus(req.body.user_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'myComplaintStatus', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'myComplaintStatus', 'Internal server error', 500)
            }
        }
        MyComplaintStatusData()
    },

    getMyComplaintFeedback: function (req, res) {
        var FeedbackData = req.body;
        var thread_id = FeedbackData.thread_id;
        var feedback_rating = FeedbackData.feedback_rating;
        var feedback_description = FeedbackData.feedback_description;
        async function ComplaintFeedbackData() {
            try {
                const result1 = await complaintModel.myComplaintFeedback(thread_id, feedback_rating, feedback_description);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Feedback Updated Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getMyComplaintFeedback', 'Failed to update feedback', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getMyComplaintFeedback', 'Internal server error', 500)
            }
        }
        ComplaintFeedbackData()
    },

    getComplaintCategory: function (req, res) {
        async function CategoryData() {
            try {
                const result1 = await complaintModel.complaintCategory();
                if (result1.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getComplaintCategory', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getComplaintCategory', 'Internal server error', 500)
            }
        }
        CategoryData()
    },
};

module.exports = complaintController;