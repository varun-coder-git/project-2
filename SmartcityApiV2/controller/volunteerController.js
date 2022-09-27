const express = require('express'),
    volunteerModel = require('../models/volunteerModel'),
    moment = require('moment'),
    errorLogModel = require('../models/ErrorLogModel'),
    fs = require('fs'),
    ErrorLogs = require('./errorController'),
    mkdirp = require('mkdirp');
errorLogModel.errorData.ControllerName = 'volunteerController';

var volunteerController = {
    showVolunteerForm: function (req, res) {
        var VolunteerData = req.body;
        var user_id = VolunteerData.user_id;
        async function VolunteerForm() {
            try {
                const result1 = await getVolunteerForm.getVolunteerForm(user_id);
                if (result1.rows.length > 0) {
                    var db_form = {
                        "full_name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "email": result1.rows[0]['email'],
                        "phone_number": result1.rows[0]['phone_number'],
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: db_form
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'showVolunteerForm', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'showVolunteerForm', 'Internal server error', 500)
            }
        }
        VolunteerForm()
    },

    addVolunteer: function (req, res) {
        var VolunteerData = req.body;
        var user_id = VolunteerData.user_id;
        var title = VolunteerData.title;
        var start_date = VolunteerData.start_date;
        var end_date = VolunteerData.end_date;
        var category = VolunteerData.category;
        var description = VolunteerData.description;
        var latitude = VolunteerData.latitude;
        var longitude = VolunteerData.longitude;
        var address = VolunteerData.address;
        var share_location_flag = VolunteerData.share_location_flag;
        var incomingFile = []
        var volunteer_length = []

        if (category == null || category == undefined || category == 'undefined') {
            ErrorLogs.errorResponse(res, 'addVolunteer', 'Please select category', 403)
        } else {
            if (start_date > end_date) {
                ErrorLogs.errorResponse(res, 'addVolunteer', 'start_date cannot be greater than end_date', 403)
            } else if (start_date < moment().format('YYYY-MM-DD')) {
                ErrorLogs.errorResponse(res, 'addVolunteer', 'start_date cannot be less than end_date', 403)
            } else {
                volunteerModel.addVolunteer(user_id, title, start_date, end_date, category, description, latitude, longitude, address, share_location_flag, function (err, data) {
                    if (err) {
                        ErrorLogs.errorResponse(res, 'addVolunteer', 'Something went wrong', 400)
                    } else {
                        var volunteer_id = data.rows[0]['volunteer_id'];
                        var files_data = []
                        if (req.files) {
                            for (const [key] of Object.entries(req.files)) {
                                files_data.push(`${key}`);
                            }
                            for (var i = 0; i < files_data.length; i++) {
                                incomingFile.push(req.files[files_data[i]]);
                            }

                            var path = './public/assests/volunteer/' + volunteer_id
                            mkdirp(path + "/", function (err) {
                                if (err) console.error(err)
                                else {
                                    for (var p = 0; p < Object.keys(req.files).length; p++) {
                                        // if ((incomingFile[p].mimetype == 'image/png') || (incomingFile[p].mimetype == 'image/jpeg') || (incomingFile[p].mimetype == 'image/jfif') || (incomingFile[p].mimetype == 'application/pdf') || (incomingFile[p].mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                                        var GUID = "assests/volunteer/" + volunteer_id;
                                        var attachment_path = GUID + '/';
                                        var db_path = ("public/" + attachment_path + incomingFile[p].name);
                                        var path = './public/assests/volunteer/' + volunteer_id
                                        volunteerModel.insertVolunteerMedia(volunteer_id, db_path, function (err, update_data) {
                                            if (err) {
                                                ErrorLogs.errorResponse(res, 'addVolunteer', 'Something went wrong', 400)
                                            } else {
                                                if (update_data.rows.length > 0) {
                                                    for (var i = 0; i < Object.keys(req.files).length; i++) {
                                                        fs.writeFile(path + '/' + incomingFile[i].name, incomingFile[i].data, function (err, result) {
                                                            if (err) {
                                                                ErrorLogs.errorResponse(res, 'addVolunteer', 'File not uploaded!!', 402)
                                                            } else {
                                                                volunteer_length.push(update_data.rows)
                                                                if (Object.keys(req.files).length == volunteer_length.length) {
                                                                    res.status(201).send({
                                                                        status: true,
                                                                        message: "Volunteer Registered Successful",
                                                                    })
                                                                }
                                                            }
                                                        });
                                                    }
                                                } else {
                                                    ErrorLogs.errorResponse(res, 'addVolunteer', 'Something went wrong', 404)
                                                }
                                            }
                                        });
                                        // } else {
                                        //     logErrorMessage(res, 'addVolunteer', "Invalid file format", 404, {
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
                                message: "Volunteer Registered Successful",
                            })
                        }
                    }
                });
            }
        }

    },

    checkVolunteerStatus: function (req, res) {
        var VolunteerData = req.body;
        var user_id = VolunteerData.user_id;
        async function VolunteerStatus() {
            try {
                const result1 = await volunteerModel.VolunteerStatus(user_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'checkVolunteerStatus', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'checkVolunteerStatus', 'Internal server error', 500)
            }
        }
        VolunteerStatus()
    },

    cancelVolunteer: function (req, res) {
        var VolunteerData = req.body;
        var volunteer_id = VolunteerData.volunteer_id;
        async function cancelVolunteerStatus() {
            try {
                const result1 = await volunteerModel.cancelVolunteerStatus(volunteer_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Status Cancel Successful",
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'cancelVolunteer', 'Failed to cancel status', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'cancelVolunteer', 'Internal server error', 500)
            }
        }
        cancelVolunteerStatus()
    },

    deleteVolunteer: function (req, res) {
        var VolunteerData = req.body;
        var volunteer_id = VolunteerData.volunteer_id;
        async function deleteVolunteerData() {
            try {
                const result1 = await volunteerModel.deleteVolunteer(volunteer_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Successful",
                        data: result1.rows[0]['volunteer_id']
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteVolunteer', 'Failed to delete data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteVolunteer', 'Internal server error', 500)
            }
        }
        deleteVolunteerData()
    },

    getAllVolunteer: function (req, res) {
        const VolunteerData = req.body;
        const offset = VolunteerData.offset;
        var volunteerData = []
        var comments;
        async function getAllVolunteerData() {
            try {
                const result1 = await volunteerModel.getAllVolunteer(offset);
                // console.log();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['comments'] == null) {
                            comments = 0
                        } else {
                            comments = result1.rows[i]['comments']
                        }
                        volunteerData.push({
                            "user_id": result1.rows[i]['user_id'],
                            "volunteer_id": result1.rows[i]['volunteer_id'],
                            "volunteer_status": result1.rows[i]['volunteer_status'],
                            "category_name": result1.rows[i]['category_name'],
                            "volunteer_cat_id": result1.rows[i]['volunteer_cat_id'],
                            "f_name": result1.rows[i]['f_name'],
                            "l_name": result1.rows[i]['l_name'],
                            "category_status": result1.rows[i]['category_status'],
                            "cardType": result1.rows[i]['category_name'],
                            "cardTitle": result1.rows[i]['title'],
                            "cardDescription": result1.rows[i]['description'],
                            "cardStartOn": moment(result1.rows[i]['start_date']).format('DD MMM YYYY h:mm A'),
                            "cardEndOn": moment(result1.rows[i]['end_date']).format('DD MMM YYYY h:mm A'),
                            "cardPostedOn": moment(result1.rows[i]['registration_date'], 'YYYY.MM.DD').fromNow(),
                            "cardPostedBy": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "cardProfileImage": result1.rows[i]['image_path'],
                            "status": result1.rows[i]['volunteer_account'],
                            "cardUserId": result1.rows[i]['user_id'],
                            "comments": comments,
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        total_rows: result1.rows[0]['total_rows'],
                        data: volunteerData,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getAllVolunteer', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getAllVolunteer', 'Internal server error', 500)
            }
        }
        getAllVolunteerData()
    },

    updateVolunteerStatus: function (req, res) {
        var VolunteerData = req.body;
        var user_id = VolunteerData.user_id;
        var volunteer_id = VolunteerData.volunteer_id;
        var volunteer_status = VolunteerData.volunteer_status;
        async function updateVolunteerStatusData() {
            try {
                const result1 = await volunteerModel.updateVolunteerStatus(volunteer_id, volunteer_status, user_id,);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Status Updated Successful",
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'updateVolunteerStatus', 'Failed to update status', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'updateVolunteerStatus', 'Internal server error', 500)
            }
        }
        updateVolunteerStatusData()
    },

    // updateVolunteerInfo: function (req, res) {
    //     var VolunteerData = req.body;
    //     var token = VolunteerData.token;
    //     var user_id = VolunteerData.user_id;
    //     var volunteer_id = VolunteerData.volunteer_id;
    //     var about_text = VolunteerData.about_text;
    //     jwt.verify(token, secret_key, function (err, decoded) {
    //         if (err) {
    //             logErrorMessage(res, 'updateVolunteerInfo', 'Failed to authenticate token.', 403, {
    //                 status: false,
    //                 message: 'Failed to authenticate token.'
    //             });

    //         } else {
    //             if (decoded.id != user_id) {
    //                 logErrorMessage(res, 'updateVolunteerInfo', "Invalid Token/token doesnot match with id", 401, {
    //                     status: false,
    //                     message: "Invalid Token/token  doesn't match with id",
    //                 });

    //             } else {
    //                 volunteerModel.updateVolunteerInfo(volunteer_id, about_text, function (err, data) {
    //                     if (err) {
    //                         logErrorMessage(res, 'updateVolunteerInfo', err.message, 500, {
    //                             status: false,
    //                             message: err.message
    //                         });
    //                     } else {
    //                         if (data.rows.length > 0) {
    //                             res.status(200).send({
    //                                 status: true,
    //                                 message: "Volunteer data updated successfully",
    //                             })
    //                         } else {
    //                             logErrorMessage(res, 'updateVolunteerInfo', "Data Not Found", 404, {
    //                                 status: false,
    //                                 message: "Data Not Found"
    //                             });
    //                         }
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // },


    addVolunteerCategory: function (req, res) {
        var VolunteerData = req.body;
        var category_name = VolunteerData.category_name;
        async function addVolunteerCategoryData() {
            try {
                const result1 = await volunteerModel.addVolunteerCategory(category_name);
                if (result1.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: "Data Inserted successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'addVolunteerCategory', 'Failed to insert data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'addVolunteerCategory', 'Internal server error', 500)
            }
        }
        addVolunteerCategoryData()
    },

    getVolunteerCategory: function (req, res) {
        async function getVolunteerCategoryData() {
            try {
                const result1 = await volunteerModel.getVolunteerCategory();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getVolunteerCategory', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getVolunteerCategory', 'Internal server error', 500)
            }
        }
        getVolunteerCategoryData()
    },

    updateVolunteerCategory: function (req, res) {
        var VolunteerData = req.body;
        var volunteer_cat_id = VolunteerData.volunteer_cat_id;
        var category_name = VolunteerData.category_name;
        async function updateVolunteerCategoryData() {
            try {
                const result1 = await volunteerModel.updateVolunteerCategory(volunteer_cat_id, category_name);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Updated Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'updateVolunteerCategory', 'Failed to update data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'updateVolunteerCategory', 'Internal server error', 500)
            }
        }
        updateVolunteerCategoryData()
    },

    deleteVolunteerCategory: function (req, res) {
        var VolunteerData = req.body;
        var volunteer_cat_id = VolunteerData.volunteer_cat_id;
        async function deleteVolunteerCategoryData() {
            try {
                const result1 = await volunteerModel.deleteVolunteerCategory(volunteer_cat_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteVolunteerCategory', 'Failed to delete data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteVolunteerCategory', 'Internal server error', 500)
            }
        }
        deleteVolunteerCategoryData()
    },

    mostTrendingVolunteer: function (req, res) {
        var VolunteerData = req.body;
        var offset = VolunteerData.offset;
        var MostTrending = [];
        var comments;

        async function mostTrendingVolunteerData() {
            try {
                const result1 = await volunteerModel.mostTrendingVolunteer(offset);
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['comments'] == null) comments = 0
                        else comments = result1.rows[i]['comments']
                        MostTrending.push({
                            "user_id": result1.rows[i]['user_id'],
                            "volunteer_id": result1.rows[i]['volunteer_id'],
                            "volunteer_status": result1.rows[i]['volunteer_status'],
                            "category_name": result1.rows[i]['category_name'],
                            "volunteer_cat_id": result1.rows[i]['volunteer_cat_id'],
                            "f_name": result1.rows[i]['f_name'],
                            "l_name": result1.rows[i]['l_name'],
                            "category_status": result1.rows[i]['category_status'],
                            "cardType": result1.rows[i]['category_name'],
                            "cardTitle": result1.rows[i]['title'],
                            "cardDescription": result1.rows[i]['description'],
                            "cardStartOn": moment(result1.rows[i]['start_date']).format('DD MMM YYYY h:mm A'),
                            "cardEndOn": moment(result1.rows[i]['end_date']).format('DD MMM YYYY h:mm A'),
                            "cardPostedOn": moment(result1.rows[i]['registration_date'], 'YYYY.MM.DD').fromNow(),
                            "cardPostedBy": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "cardProfileImage": result1.rows[i]['image_path'],
                            "status": result1.rows[i]['volunteer_account'],
                            "cardUserId": result1.rows[i]['user_id'],
                            "comments": comments
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        total_rows: result1.rows[0]['total_rows'],
                        data: MostTrending,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'mostTrendingVolunteer', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'mostTrendingVolunteer', 'Internal server error', 500)
            }
        }
        mostTrendingVolunteerData()
    },

    mostDiscussVolunteer: function (req, res) {
        var VolunteerData = req.body;
        var offset = VolunteerData.offset;
        var MostDiscussed = [];
        var comment;
        async function mostDiscussVolunteerData() {
            try {
                const result1 = await volunteerModel.mostDiscussVolunteer(offset);
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['comments'] == null) {
                            comment = 0
                        } else {
                            comment = result1.rows[i]['comments']
                        }
                        MostDiscussed.push({
                            "user_id": result1.rows[i]['user_id'],
                            "volunteer_id": result1.rows[i]['volunteer_id'],
                            "volunteer_status": result1.rows[i]['volunteer_status'],
                            "category_name": result1.rows[i]['category_name'],
                            "volunteer_cat_id": result1.rows[i]['volunteer_cat_id'],
                            "f_name": result1.rows[i]['f_name'],
                            "l_name": result1.rows[i]['l_name'],
                            "category_status": result1.rows[i]['category_status'],
                            "cardType": result1.rows[i]['category_name'],
                            "cardTitle": result1.rows[i]['title'],
                            "cardDescription": result1.rows[i]['description'],
                            "cardStartOn": moment(result1.rows[i]['start_date']).format('DD MMM YYYY h:mm A'),
                            "cardEndOn": moment(result1.rows[i]['end_date']).format('DD MMM YYYY h:mm A'),
                            "cardPostedOn": moment(result1.rows[i]['registration_date'], 'YYYY.MM.DD').fromNow(),
                            "cardPostedBy": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "cardProfileImage": result1.rows[i]['image_path'],
                            "status": result1.rows[i]['volunteer_account'],
                            "cardUserId": result1.rows[i]['user_id'],
                            "comments": comment
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        total_rows: result1.rows[0]['total_rows'],
                        data: MostDiscussed
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'mostDiscussVolunteer', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'mostDiscussVolunteer', 'Internal server error', 500)
            }
        }
        mostDiscussVolunteerData()
    },

    getVolunteerById: function (req, res) {
        var VolunteerData = req.body;
        var volunteer_id = VolunteerData.volunteer_id;
        var offset = VolunteerData.offset;
        var is_admin = VolunteerData.is_admin;
        var volunteerData = []
        var comments_data = []
        var comment_count;
        var media_data = [];
        var admin_name;
        var location;
        var account_type;

        async function getVolunteerByIdData() {
            try {
                const result1 = await volunteerModel.getVolunteerIdData(volunteer_id);
                const result2 = await volunteerModel.getVolunteerCommentData(volunteer_id, offset);
                if (result1.rows.length > 0) {
                    location = result1.rows[0]['address']
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['media_count'] == 0) media_data = []
                        else {
                            media_data.push({
                                "media_file_id": result1.rows[i]['volunteer_media_id'],
                                "media_file_name": result1.rows[i]['file_name']
                            })
                        }
                    }
                    if (result1.rows[0]['comment_count'] == null) comment_count = 0
                    else comment_count = result1.rows[0]['comment_count']
                    if (result2.rows.length > 0) {
                        for (var i = 0; i < result2.rows.length; i++) {
                            if (is_admin == false || is_admin == 'false'){
                                if(result2.rows[i]['is_admin']==false || result2.rows[i]['is_admin']=='false') admin_name = result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name']
                                else admin_name = "Admin"
                            }
                            else admin_name = result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name']
                            if (result2.rows[i]['login_type'] == 'google' || result2.rows[i]['login_type'] == 'facebook') account_type = 'social'
                            else account_type = result2.rows[i]['login_type']
                            comments_data.push({
                                "user_id": result2.rows[i]['user_id'],
                                "is_admin": result2.rows[i]['is_admin'],
                                "PostedBy": admin_name,
                                "image_path": result2.rows[i]['image_path'],
                                "volunteer_id": result2.rows[i]['volunteer_id'],
                                "PostedOn": moment(result2.rows[i]['registration_date'], 'YYYY.MM.DD').fromNow(),
                                "comment": result2.rows[i]['comment'],
                                "account_type": account_type
                            })
                        }
                    }
                    volunteerData.push({
                        "title": result1.rows[0]['title'],
                        "description": result1.rows[0]['description'],
                        "ward_id": result1.rows[0]['ward_id'],
                        "ward_name": result1.rows[0]['ward_name'],
                        "volunteer_id": result1.rows[0]['volunteer_id'],
                        "volunteer_cat_id": result1.rows[0]['volunteer_cat_id'],
                        "volunteer_category_name": result1.rows[0]['category_name'],
                        "PostedBy": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "image": result1.rows[0]['image_path'],
                        "user_id": result1.rows[0]['user_id'],
                        "is_admin": result1.rows[0]['is_admin'],
                        "PostedOn": moment(result1.rows[0]['registration_date'], 'YYYY.MM.DD').fromNow(),
                        "start_date": moment(result1.rows[0]['start_date']).format('DD MMM YYYY'),
                        "end_date": moment(result1.rows[0]['end_date']).format('DD MMM YYYY'),
                        "d_start_date": moment(result1.rows[0]['start_date']).format('YYYY-MM-DD'),
                        "d_end_date": moment(result1.rows[0]['end_date']).format('YYYY-MM-DD'),
                        "category_status": result1.rows[0]['category_status'],
                        "address": location,
                        "latitude": result1.rows[0]['latitude'],
                        "longitude": result1.rows[0]['longitude'],
                        "share_location_flag": result1.rows[0]['share_location_flag'],
                        "comment_count": comment_count,
                        "media_files": media_data,
                        "comments_data": comments_data,
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: volunteerData,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getVolunteerById', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getVolunteerById', 'Internal server error', 500)
            }
        }
        getVolunteerByIdData()
    },

    deleteVolunteerComment: function (req, res) {
        var VolunteerData = req.body;
        var volunteer_id = VolunteerData.volunteer_id;
        async function deleteVolunteerCommentData() {
            try {
                const result1 = await volunteerModel.deleteVolunteerComment(volunteer_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Comment Deleted successful"
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteVolunteerComment', 'Failed to delete comment', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteVolunteerComment', 'Internal server error', 500)
            }
        }
        deleteVolunteerCommentData()
    },

    addVolunteerComment: function (req, res) {
        var VolunteerData = req.body;
        var user_id = VolunteerData.user_id;
        var comment = VolunteerData.comment;
        var volunteer_id = VolunteerData.volunteer_id;
        async function addVolunteerCommentData() {
            try {
                const result1 = await volunteerModel.addVolunteerComment(user_id, comment, volunteer_id,);
                if (result1.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: "Comment Added Successful"
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'addVolunteerComment', 'Failed to add comment', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'addVolunteerComment', 'Internal server error', 500)
            }
        }
        addVolunteerCommentData()
    },

    searchVolunteer: function (req, res) {
        var VolunteerData = req.body;
        var search_text = VolunteerData.search_text;
        var volunteerData = []
        var comments;
        async function searchVolunteerData() {
            try {
                const result1 = await volunteerModel.searchVolunteerData(search_text);
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['comments'] == null) {
                            comments = 0
                        } else {
                            comments = result1.rows[i]['comments']
                        }
                        volunteerData.push({
                            "user_id": result1.rows[i]['user_id'],
                            "volunteer_id": result1.rows[i]['volunteer_id'],
                            "volunteer_status": result1.rows[i]['volunteer_status'],
                            "category_name": result1.rows[i]['category_name'],
                            "volunteer_cat_id": result1.rows[i]['volunteer_cat_id'],
                            "f_name": result1.rows[i]['f_name'],
                            "l_name": result1.rows[i]['l_name'],
                            "category_status": result1.rows[i]['category_status'],
                            "cardType": result1.rows[i]['category_name'],
                            "cardTitle": result1.rows[i]['title'],
                            "cardDescription": result1.rows[i]['description'],
                            "cardStartOn": moment(result1.rows[i]['start_date']).format('DD MMM YYYY h:mm A'),
                            "cardEndOn": moment(result1.rows[i]['end_date']).format('DD MMM YYYY h:mm A'),
                            "cardPostedOn": moment(result1.rows[i]['registration_date'], 'YYYY.MM.DD').fromNow(),
                            "cardPostedBy": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "cardProfileImage": result1.rows[i]['image_path'],
                            "status": result1.rows[i]['volunteer_account'],
                            "cardUserId": result1.rows[i]['user_id'],
                            "comments": comments
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: volunteerData,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'searchVolunteer', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'searchVolunteer', 'Internal server error', 500)
            }
        }
        searchVolunteerData()
    },

    updateVolunteerInfo: function (req, res) {
        var VolunteerData = req.body;
        var start_date = VolunteerData.start_date;
        var end_date = VolunteerData.end_date;
        var description = VolunteerData.description;
        var latitude = VolunteerData.latitude;
        var longitude = VolunteerData.longitude;
        var address = VolunteerData.address;
        var share_location_flag = VolunteerData.share_location_flag;
        var volunteer_id = VolunteerData.volunteer_id;
        var incomingFile = []
        var volunteer_length = []

        // var files_data = []
        // console.log("req.files", req.files);
        // if (req.files) {
        //     var array = VolunteerData.volunteer_media_id;
        //     var volunteer_media_id = JSON.parse(array);
        //     for (const [key] of Object.entries(req.files)) {
        //         files_data.push(`${key}`);
        //     }
        //     for (var i = 0; i < files_data.length; i++) {
        //         incomingFile.push(req.files[files_data[i]]);
        //     }
        //     var path = './public/assests/volunteer/' + volunteer_id
        //     console.log(Object.keys(req.files).length);
        //     for (var p = 0; p < Object.keys(req.files).length; p++) {
        //         // if ((incomingFile[p].mimetype == 'image/png') || (incomingFile[p].mimetype == 'image/jpeg') || (incomingFile[p].mimetype == 'image/jfif') || (incomingFile[p].mimetype == 'application/pdf') || (incomingFile[p].mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        //         var GUID = "assests/volunteer/" + volunteer_id;
        //         var attachment_path = GUID + '/';
        //         var db_path = ("public/" + attachment_path + incomingFile[p].name);
        //         var path = './public/assests/volunteer/' + volunteer_id
        //         console.log("volunteer_media_id[p]", volunteer_media_id[p], "db_path", db_path);
        //         volunteerModel.updateVolunteerMedia(volunteer_media_id[p], db_path, function (err, update_data) {
        //             if (err) {
        //                 logErrorMessage(res, 'updateVolunteerInfo', err.message, 404, {
        //                     status: false,
        //                     message: err.message
        //                 });
        //             } else {
        //                 if (update_data.rows.length > 0) {
        //                     for (var i = 0; i < Object.keys(req.files).length; i++) {
        //                         fs.writeFile(path + '/' + incomingFile[i].name, incomingFile[i].data, function (err, result) {
        //                             if (err) {
        //                                 logErrorMessage(res, 'updateVolunteerInfo', "File not uploaded!!", 500, {
        //                                     status: false,
        //                                     message: "File not uploaded!!"
        //                                 });
        //                             } else {
        //                                 volunteer_length.push(update_data.rows)
        //                                 if (Object.keys(req.files).length == volunteer_length.length) {
        //                                     volunteerModel.updateVolunteerData(volunteer_id, start_date, end_date, description, latitude, longitude, address, share_location_flag, function (err, update_volunteer) {
        //                                         if (err) {
        //                                             logErrorMessage(res, 'updateVolunteerInfo', err.message, 404, {
        //                                                 status: false,
        //                                                 message: err.message
        //                                             });
        //                                         } else {
        //                                             if (update_volunteer.rows.length > 0) {
        //                                                 res.status(201).send({
        //                                                     status: true,
        //                                                     message: "Volunteer update",
        //                                                 })
        //                                             } else {
        //                                                 logErrorMessage(res, 'updateVolunteerInfo', 'volunteer update failed', 400, {
        //                                                     status: false,
        //                                                     message: 'volunteer update failed'
        //                                                 });
        //                                             }
        //                                         }
        //                                     })
        //                                 }
        //                             }
        //                         });
        //                     }
        //                 } else {
        //                     logErrorMessage(res, 'updateVolunteerInfo', "Something went wrong", 400, {
        //                         status: false,
        //                         message: "Something went wrong"
        //                     });
        //                 }
        //             }
        //         });
        //         // } else {
        //         //     logErrorMessage(res, 'updateVolunteerInfo', "Invalid file format", 404, {
        //         //         status: false,
        //         //         message: "Invalid file format"
        //         //     });
        //         // }
        //     }
        // } else {
        // volunteerModel.checkVolunteerDate(volunteer_id,  function(err, volunteerDate) {
        //         if (err) {
        //             logErrorMessage(res, 'updateVolunteerInfo', err.message, 404, {
        //                 status: false,
        //                 message: err.message
        //             });
        //         } else if(volunteerDate.rows.length > 0) {
        //             DBStartDate=volunteerDate.rows[0]['start_date']
        //             DBEndDate=volunteerDate.rows[0]['end_date']
        //             if(DBStartDate){

        //             }else{

        //             }

        //         }else{

        //         }
        // })
        if (start_date > end_date) {
            ErrorLogs.errorResponse(res, 'addVolunteer', 'start_date cannot be greater than end_date', 403)
        }
        // else if (start_date < moment().format('YYYY-MM-DD')) {
        //     logErrorMessage(res, 'addVolunteer', 'start_date cannot be less than end_date', 403, {
        //         status: false,
        //         message: 'start_date cannot be less than current_date'
        //     });
        // }
        else {
            async function updateVolunteerDetails() {
                try {
                    const result1 = await volunteerModel.updateVolunteerData(volunteer_id, start_date, end_date, description, latitude, longitude, address, share_location_flag);
                    if (result1.rows.length > 0) {
                        res.status(201).send({
                            status: true,
                            message: "Data Updated Successful",
                        })
                    } else {
                        ErrorLogs.errorResponse(res, 'updateVolunteerInfo', 'Failed to update data', 400)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'updateVolunteerInfo', 'Internal server error', 500)
                }
            }
            updateVolunteerDetails()
        }
        // }
    },

    // OCA Volunteer API

    getAdminVolunteer: function (req, res) {
        var volunteerData = []
        async function getAdminVolunteerData() {
            try {
                const result1 = await volunteerModel.getAdminVolunteer();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        volunteerData.push({
                            "ward_name": result1.rows[i]['ward_name'],
                            "volunteer_id": result1.rows[i]['volunteer_id'],
                            "volunteer_title": result1.rows[i]['title'],
                            "submission_date": moment(result1.rows[i]['registration_date']).format('YYYY-MM-DD'),
                            "category_name": result1.rows[i]['category_name']
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: volunteerData
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getAdminVolunteer', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getAdminVolunteer', 'Internal server error', 500)
            }
        }
        getAdminVolunteerData()
    },


};
module.exports = volunteerController;