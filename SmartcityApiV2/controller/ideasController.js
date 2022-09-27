const express = require('express'),
    moment = require('moment'),
    ideasModel = require('../models/ideasModel'),
    errorLogModel = require('../models/ErrorLogModel'),
    fs = require('fs'),
    ErrorLogs = require('./errorController'),
    mkdirp = require('mkdirp');
errorLogModel.errorData.ControllerName = 'Ideas';

var ideas = {
    getAllIdeas: function (req, res) {
        var IdeaData = req.body;
        var is_admin = IdeaData.is_admin;
        var IdeasDetails = [];
        async function getAllIdeasData() {
            try {
                const result1 = await ideasModel.getAllIdeas(IdeaData, is_admin);
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        IdeasDetails.push({
                            "cardType": result1.rows[i]['category_name'],
                            "cardTitle": result1.rows[i]['subject'],
                            "cardDescription": result1.rows[i]['body'],
                            "d_cardPostedOn": moment(result1.rows[i]['created_date']).format('YYYY-MM-DD'),
                            "cardPostedOn": moment(result1.rows[i]['created_date'], 'YYYY.MM.DD').fromNow(),
                            "cardLastCommentedOn": null,
                            "cardPostedBy": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "cardPlace": null,
                            "cardProfileImage": result1.rows[i]['image_path'],
                            "threadId": result1.rows[i]['thread_id'],
                            "status": result1.rows[i]['status_code'],
                            "cardUserId": result1.rows[i]['user_id'],
                            "wardName": result1.rows[i]['ward_name'],
                            "CommentCount": result1.rows[i]['countofchild']
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: 'Data Found Successful',
                        total_rows: result1.rows[0]['total_rows'],
                        data: IdeasDetails
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getAllIdeas', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getAllIdeas', 'Internal server error', 500)
            }
        }
        getAllIdeasData()
    },

    GetMostDiscussedIdeas: function (req, res) {
        var IdeaData = req.body;
        async function getMostDiscussedIdeasData() {
            try {
                const result1 = await ideasModel.getMostDiscussedIdeas(IdeaData);
                if (result1.rows.length > 0) {
                    var IdeasDetails = [];
                    for (let i = 0; i < result1.rows.length; i++) {
                        IdeasDetails.push({
                            "cardType": result1.rows[i]['category_name'],
                            "cardTitle": result1.rows[i]['subject'],
                            "cardDescription": result1.rows[i]['body'],
                            "cardPostedOn": moment(result1.rows[i]['created_date'], 'YYYY.MM.DD').fromNow(),
                            "cardLastCommentedOn": null,
                            "cardPostedBy": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "cardPlace": null,
                            "cardProfileImage": result1.rows[i]['image_path'],
                            "threadId": result1.rows[i]['thread_id'],
                            "status": result1.rows[i]['status_code'],
                            "cardUserId": result1.rows[i]['user_id'],
                            "wardName": result1.rows[i]['ward_name'],
                            "CommentCount": result1.rows[i]['countofchild'],
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: 'Data Found Successful',
                        total_rows: result1.rows[0]['total_rows'],
                        data: IdeasDetails
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'GetMostDiscussedIdeas', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'GetMostDiscussedIdeas', 'Internal server error', 500)
            }
        }
        getMostDiscussedIdeasData()
    },

    GetTrendingIdeas: function (req, res) {
        var IdeaData = req.body;
        async function GetTrendingIdeasData() {
            try {
                const result1 = await ideasModel.getTrendingIdeas(IdeaData);
                if (result1.rows.length > 0) {
                    var IdeasDetails = [];
                    for (let i = 0; i < result1.rows.length; i++) {
                        IdeasDetails.push({
                            "cardType": result1.rows[i]['category_name'],
                            "cardTitle": result1.rows[i]['subject'],
                            "cardDescription": result1.rows[i]['body'],
                            "cardPostedOn": moment(result1.rows[i]['created_date'], 'YYYY.MM.DD').fromNow(),
                            "cardLastCommentedOn": null,
                            "cardPostedBy": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "cardPlace": null,
                            "cardProfileImage": result1.rows[i]['image_path'],
                            "threadId": result1.rows[i]['thread_id'],
                            "status": result1.rows[i]['status_code'],
                            "cardUserId": result1.rows[i]['user_id'],
                            "wardName": result1.rows[i]['ward_name'],
                            "CommentCount": result1.rows[i]['countofchild'],
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: 'Data Found Successful',
                        total_rows: result1.rows[0]['total_rows'],
                        data: IdeasDetails
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'GetTrendingIdeas', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'GetTrendingIdeas', 'Internal server error', 500)
            }
        }
        GetTrendingIdeasData()
    },

    GetIdeasbyUser: function (req, res) {
        var IdeaData = req.body;
        var user_id = IdeaData.user_id;
        async function GetIdeasbyUserData() {
            try {
                const result1 = await ideasModel.GetIdeasbyUser(user_id, IdeaData,);
                if (result1.rows.length > 0) {
                    var IdeasDetails = [];
                    for (let i = 0; i < result1.rows.length; i++) {
                        IdeasDetails.push({
                            "cardType": result1.rows[i]['category_name'],
                            "cardTitle": result1.rows[i]['subject'],
                            "cardDescription": result1.rows[i]['body'],
                            "cardPostedOn": moment(result1.rows[i]['created_date'], 'YYYY.MM.DD').fromNow(),
                            "cardLastCommentedOn": null,
                            "cardPostedBy": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "cardPlace": null,
                            "cardProfileImage": result1.rows[i]['image_path'],
                            "threadId": result1.rows[i]['thread_id'],
                            "status": result1.rows[i]['status_code'],
                            "cardUserId": result1.rows[i]['user_id'],
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: 'Data Found Successful',
                        data: IdeasDetails
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'GetIdeasbyUser', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'GetIdeasbyUser', 'Internal server error', 500)
            }
        }
        GetIdeasbyUserData()
    },

    getIdeasbySummaryId: function (req, res) {
        var IdeaData = req.body;
        var idea_id = req.params.id;
        var is_admin = req.params.is_admin;
        async function getIdeasbySummaryIdData() {
            try {
                var db_name, comment_count, attachment_data = [], comment_data = [], idea_id_data = [], idea_location, account_type;
                const result1 = await ideasModel.getIdeasbySummaryId(idea_id);
                const result2 = await ideasModel.getIdeaAttachment(idea_id);
                const result3 = await ideasModel.getIdeasbySummaryIdComments(idea_id, IdeaData.offset);

                if (result1.rows.length > 0) {
                    if (result1.rows[0]['countofchild'] == null || result1.rows[0]['countofchild'] == undefined) comment_count = 0
                    else comment_count = result1.rows[0]['countofchild']
                    if (result1.rows[0]['share_location_flag'] == false || result1.rows[0]['share_location_flag'] == 'false') idea_location = 'not available'
                    else idea_location = result1.rows[0]['address']
                    if (result2.rows.length > 0) {
                        for (var i = 0; i < result2.rows.length; i++) {
                            attachment_data.push({
                                "attachment_id": result2.rows[i]['thread_id'],
                                "attachment": result2.rows[i]['attachment_path'],
                            })
                        }
                    } 
                    if (result3.rows.length > 0) {
                        for (var i = 0; i < result3.rows.length; i++) {
                            if (is_admin == false || is_admin == 'false'){
                                if(result3.rows[i]['is_admin']==true || result3.rows[i]['is_admin']=='true'){ 
                                    db_name = "Admin" ;
                            }else{
                                 db_name = result3.rows[i]['f_name'] + " " + result3.rows[i]['l_name'];
                            }
                            } 
                            else db_name = result3.rows[i]['f_name'] + " " + result3.rows[i]['l_name']
                            if (result3.rows[i]['login_type'] == 'google' || result3.rows[i]['login_type'] == 'facebook') account_type = 'social'
                            else account_type = result3.rows[i]['login_type']
                            comment_data.push({
                                "Image": result3.rows[i]['image_path'],
                                "PersonCommentId": result3.rows[i][''],
                                "Name": db_name,
                                "CommentDescription": result3.rows[i]['body'],
                                "IdeaNumber": result3.rows[i]['thread_id'],
                                "DateOfComment": moment(result3.rows[i]['updated_on'], 'YYYY.MM.DD').fromNow(),
                                "commentUserId": result3.rows[i]['user_id'],
                                "AdminFlag": result3.rows[i]['is_admin'],
                                "account_type": account_type
                            })
                        }
                        
                    }
                    idea_id_data.push({
                        "Image": result1.rows[0]['image_path'],
                        "Name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "IdeaDescription": result1.rows[0]['body'],
                        "IdeaNumber": result1.rows[0]['thread_id'],
                        "Title": result1.rows[0]['subject'],
                        "category_name": result1.rows[0]['category_name'],
                        "category_id": result1.rows[0]['idea_cat_id'],
                        "UserId": result1.rows[0]['user_id'],
                        "ward_name": result1.rows[0]['ward_name'],
                        "address": idea_location,
                        "latitude": result1.rows[0]['latitude'],
                        "longitude": result1.rows[0]['longitude'],
                        "CommentCount": comment_count,
                        "SubmissionDate": moment(result1.rows[0]['updated_on'], 'YYYY.MM.DD').fromNow(),
                        "share_location_flag": result1.rows[0]['share_location_flag'],
                        "Comment": comment_data,
                        "attachment": attachment_data,
                    })
                    res.status(200).send({
                        status: true,
                        message: 'Data Found Successful',
                        Details: idea_id_data
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getIdeasbySummaryId', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getIdeasbySummaryId', 'Internal server error', 500)
            }
        }
        getIdeasbySummaryIdData()
    },

    CreateIdea: function (req, res) {
        var IdeaData = req.body;
        var user_id = IdeaData.user_Id;
        var idea_cat_id = IdeaData.idea_cat_id;
        var title = IdeaData.title;
        var description = IdeaData.description;
        var latitude = IdeaData.latitude;
        var longitude = IdeaData.longitude;
        var address = IdeaData.address;
        var share_location_flag = IdeaData.share_location_flag;
        var incomingFile = []
        var thread_length = []
        ideasModel.CreateIdea(user_id, idea_cat_id, title, description, latitude, longitude, address, share_location_flag, function (err, data) {
            if (err) {
                ErrorLogs.errorResponse(res, 'Create idea', 'Internal server error', 500)
            } else {
                var thread_id = data.rows[0]['thread_id'];
                var files_data = []
                if (req.files) {
                    for (const [key] of Object.entries(req.files)) {
                        files_data.push(`${key}`);
                    }
                    for (var i = 0; i < files_data.length; i++) {
                        incomingFile.push(req.files[files_data[i]]);
                    }
                    var path = './public/assests/ideas/' + thread_id
                    mkdirp(path + "/", function (err) {
                        if (err) console.error(err)
                        else {
                            for (var p = 0; p < Object.keys(req.files).length; p++) {
                                // if ((incomingFile[p].mimetype == 'image/png') || (incomingFile[p].mimetype == 'image/jpeg') || (incomingFile[p].mimetype == 'image/jfif') || (incomingFile[p].mimetype == 'application/pdf') || (incomingFile[p].mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                                var GUID = "assests/ideas/" + thread_id;
                                var attachment_path = GUID + '/';
                                var db_path = ("public/" + attachment_path + incomingFile[p].name);
                                var path = './public/assests/ideas/' + thread_id;
                                ideasModel.insertIdeaMedia(thread_id, db_path, function (err, update_data) {
                                    if (err) {
                                        ErrorLogs.errorResponse(res, 'Create idea', 'Internal server error', 500)
                                    } else {
                                        if (update_data.rows.length > 0) {
                                            for (var i = 0; i < Object.keys(req.files).length; i++) {
                                                fs.writeFile(path + '/' + incomingFile[i].name, incomingFile[i].data, function (err, result) {
                                                    if (err) {
                                                        ErrorLogs.errorResponse(res, 'Create idea', 'File not uploaded!!', 403)
                                                    } else {
                                                        thread_length.push(update_data.rows)
                                                        if (Object.keys(req.files).length == thread_length.length) {
                                                            res.status(201).send({
                                                                status: true,
                                                                message: "Idea Added Successful",
                                                            })
                                                        }
                                                    }
                                                });
                                            }
                                        } else {
                                            ErrorLogs.errorResponse(res, 'Create idea', 'Failed to create idea', 400)
                                        }
                                    }
                                });
                                // } else {
                                //     logErrorMessage(res, 'Create idea', "Invalid file format", 404, {
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
                        message: "Idea Added Successful",
                    })
                }
            }
        });
    },

    UpdateIdea: function (req, res) {
        var IdeaData = req.body;
        async function UpdateIdeaData() {
            try {
                const result1 = await ideasModel.UpdateIdea(IdeaData);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Update Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'UpdateIdea', 'Failed to update data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'UpdateIdea', 'Internal server error', 500)
            }
        }
        UpdateIdeaData()
    },

    DeleteIdea: function (req, res) {
        var IdeaData = req.body;
        async function DeleteIdeaData() {
            try {
                const result1 = await ideasModel.DeleteIdea(IdeaData);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'DeleteIdea', 'Failed to delete idea', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'DeleteIdea', 'Internal server error', 500)
            }
        }
        DeleteIdeaData()
    },

    AddIdeaResponse: function (req, res) {
        var IdeaData = req.body;
        async function AddIdeaResponseData() {
            try {
                const result1 = await ideasModel.AddIdeaResponse(IdeaData);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Response Added Successful"
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'AddIdeaResponse', 'Failed to add response', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'AddIdeaResponse', 'Internal server error', 500)
            }
        }
        AddIdeaResponseData()
    },

    DeleteIdeaResponse: function (req, res) {
        var IdeaData = req.body;
        async function DeleteIdeaResponseData() {
            try {
                const result1 = await ideasModel.DeleteIdeaResponse(IdeaData);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Successful"
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'DeleteIdeaResponse', 'Failed to deleted Response', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'DeleteIdeaResponse', 'Internal server error', 500)
            }
        }
        DeleteIdeaResponseData()
    },

    searchIdea: function (req, res) {
        var IdeaData = req.body;
        var search_text = IdeaData.search_text;

        async function searchIdeaDetails() {
            try {
                const result1 = await ideasModel.searchIdeaData(search_text);
                if (result1.rows.length > 0) {
                    var IdeasDetails = [];
                    result1.rows.forEach(element => {
                        var obj = new Object();
                        obj.cardType = element.category_name;
                        obj.cardTitle = element.subject;
                        obj.cardDescription = element.body;
                        obj.d_cardPostedOn = moment(element.created_date).format('DD MMM YYYY h:mm A');
                        obj.cardPostedOn = moment(element.created_date, 'YYYY.MM.DD').fromNow();
                        obj.cardLastCommentedOn = null;
                        obj.cardPostedBy = element.f_name + " " + element.l_name;
                        obj.cardPlace = null;
                        obj.cardProfileImage = element.image_path
                        obj.threadId = element.thread_id.toString();
                        obj.status = element.status_code;
                        obj.cardUserId = element.user_id.toString();
                        obj.wardName = element.ward_name;
                        obj.CommentCount = element.countofchild;
                        IdeasDetails.push(obj);
                    });
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: IdeasDetails
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'searchIdea', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'searchIdea', 'Internal server error', 500)
            }
        }
        searchIdeaDetails()
    },

    getIdeaCategory: function (req, res) {
        async function getIdeaCategoryData() {
            try {
                const result1 = await ideasModel.ideaCategory();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getIdeaCategory', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getIdeaCategory', 'Internal server error', 500)
            }
        }
        getIdeaCategoryData()
    },

};
module.exports = ideas;