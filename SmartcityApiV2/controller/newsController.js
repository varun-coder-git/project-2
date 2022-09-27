const axios = require('axios'),
    express = require('express'),
    newsModel = require('../models/newsModel'),
    bcrypt = require('bcrypt'),
    validator = require('validator'),
    isEmpty = require('../controller/isEMpty'),
    errorLogModel = require('../models/ErrorLogModel'),
    moment = require('moment'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    ErrorLogs = require('./errorController');
errorLogModel.errorData.ControllerName = 'newsController';


var newsController = {
    RegisterNews: function (req, res) {
        var RegisterData = req.body;
        async function RegisterNewsData() {
            try {
                const registerNews = await newsModel.registerNews(RegisterData);
                if (registerNews.rows.length > 0) {
                    if (req.files) {
                        var path = './public/assests/news/' + registerNews.rows[0]['news_id'] + '/';
                        mkdirp(path + "/", function (err) {
                            if (err) console.error(err)
                            else {
                                let fileData = req.files.file;
                                var today_date = moment().format("YYYYMMDDHHSS");
                                if ((fileData.mimetype == 'image/png') || (fileData.mimetype == 'image/jpeg') || (fileData.mimetype == 'image/jfif') || (fileData.mimetype == 'application/pdf') || (fileData.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                                    let DBpath = "public/assests/news/" + registerNews.rows[0]['news_id'] + "/" + today_date + fileData.name
                                    fs.writeFile(path + today_date + fileData.name, fileData.data, function (err, result) {
                                        if (err) {
                                            ErrorLogs.errorResponse(res, 'RegisterNews', 'File not uploaded!!', 402)
                                        } else {
                                            async function insertImage() {
                                                try {
                                                    const newsImageFile = await newsModel.newsImage(registerNews.rows[0]['news_id'], DBpath);
                                                    if (newsImageFile.rows.length > 0) {
                                                        res.status(201).send({
                                                            status: true,
                                                            message: "News Register Successful",
                                                        })
                                                    } else ErrorLogs.errorResponse(res, 'RegisterNews', 'Failed to register news', 400)
                                                } catch (error) {
                                                    ErrorLogs.errorResponse(res, 'RegisterNews', 'Internal server error', 500)
                                                }
                                            }
                                            insertImage()
                                        }
                                    })
                                } else ErrorLogs.errorResponse(res, 'RegisterNews', 'File format not supported', 403)
                            }
                        })
                    } else {
                        res.status(201).send({
                            status: true,
                            message: "News Register Successful",
                        })
                    }
                } else ErrorLogs.errorResponse(res, 'RegisterNews', 'Failed to register news', 400)
            } catch (error) {
                ErrorLogs.errorResponse(res, 'RegisterNews', 'Internal server error', 500)
            }
        }
        RegisterNewsData()
    },

    getNewsCategory: function (req, res) {
        async function GetNewsCategoryData() {
            try {
                const result1 = await newsModel.NewsCategory();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getNewsCategory', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getNewsCategory', 'Internal server error', 500)
            }
        }
        GetNewsCategoryData()
    },

    getNews: function (req, res) {
        async function GetNewsData() {
            try {
                const result1 = await newsModel.getNews();
                const newsData = [];
                var is_breaking, is_hide,is_breaking_flag;
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length ; i++) {
                        is_breaking_flag=result1.rows[i]['is_breaking'];
                        if (result1.rows[i]['is_breaking'] == true || result1.rows[i]['is_breaking'] == "true"){
                         is_breaking = 'Yes'
                         let result3 = await newsModel.isBreakingNewsEditable(result1.rows[i]['id']);
                         if (result3.rows[0]['interval'] > 48){ 
                            let result4 = await newsModel.changeBreakingNewsStatus(result1.rows[i]['id']);
                             is_breaking = 'No';
                             is_breaking_flag=false;
                         }
                        }else{
                             is_breaking = 'No'
                        }
                        if (result1.rows[i]['is_hide'] == true || result1.rows[i]['is_hide'] == "true") is_hide = 'Yes'
                        else is_hide = 'No'
                        newsData.push({
                            "id": result1.rows[i]['id'],
                            "title": result1.rows[i]['title'],
                            "postedby": result1.rows[i]['postedby'],
                            "category_name": result1.rows[i]['category_name'],
                            "uploaded_on": result1.rows[i]['uploaded_on'],
                            "admin_id": result1.rows[i]['admin_id'],
                            "is_breaking_flag":is_breaking_flag,
                            "is_hide_flag": result1.rows[i]['is_hide'],
                            "is_breaking": is_breaking,
                            "is_hide": is_hide,
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: newsData
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getNews', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getNews', 'Internal server error', 500)
            }
        }
        GetNewsData()
    },

    getNewsOCM: function (req, res) {
        async function GetNewsOCMData() {
            try {
                const result1 = await newsModel.getNewsOCM(req.body.offset);
                if (result1.rows.length > 0) {
                    let newsData = [];
                    let totalNewsCount=result1.rows.length;
                    let comments=0;
                    let breaking_status;
                    let limit= result1.rows.length< req.body.offset ? result1.rows.length :req.body.offset;
                    for (let i = 0; i < limit; i++) {
                        if (result1.rows[i]['comment_count'] == null) {
                            comments = 0
                        } else {
                            comments = result1.rows[i]['comment_count']
                        }
                        breaking_status=result1.rows[i]['is_breaking'];
                        if(result1.rows[i]['is_breaking']=='true' || result1.rows[i]['is_breaking']==true){
                            const result3 = await newsModel.isBreakingNewsEditable(result1.rows[i]['news_id']);
                            if (result3.rows[0]['interval'] > 48){ 
                                const result4 = await newsModel.changeBreakingNewsStatus(result1.rows[i]['news_id']);
                                breaking_status=false;
                            }

                        }
                        newsData.push({
                            "ID": result1.rows[i]['news_id'],
                            "title": result1.rows[i]['title'],
                            "postedBy": result1.rows[i]['postedBy'],
                            "uploaded_on": moment(result1.rows[i]['uploaded_on']).format('DD.MM.YYYY'),
                            "admin_id": result1.rows[i]['admin_id'],
                            "is_breaking": breaking_status,
                            "image_path": result1.rows[i]['image_path'],
                            "comment_count":comments
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        total_rows: totalNewsCount,
                        data: newsData
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getNews', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getNews', 'Internal server error', 500)
            }
        }
        GetNewsOCMData()
    },

    getNewsById: function (req, res) {
        async function getNewsByIdData() {
            try {
                const result1 = await newsModel.getNewsDataByID(req.body.ID);
                const result2 = await newsModel.getNewsCommentsByID(req.body.ID, req.body.offset);
                const result3 = await newsModel.isBreakingNewsEditable(req.body.ID);
                const commentData = [], newsData = [];
                var commentCount = 0;
                if (result1.rows.length > 0) {
                    if (result3.rows[0]['interval'] > 48){ 
                        interval = true;
                        const result4 = await newsModel.changeBreakingNewsStatus(req.body.ID);
                    }
                    else{ 
                        interval = false;
                    }
                    if (result2.rows.length > 0) commentCount = result2.rows[0]['comment_count']
                    else commentCount = 0
                    for (i = 0; i < result2.rows.length; i++) {
                        if (result2.rows[i]['login_type'] == 'google' || result2.rows[i]['login_type'] == 'facebook') var account_type = 'social'
                        else var account_type = result2.rows[i]['login_type'];
                        commentData.push({
                            "commentID": result2.rows[i]['id'],
                            "admin_id": result2.rows[i]['admin_id'],
                            "user_id": result2.rows[i]['user_id'],
                            "postedBy": result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name'],
                            "image": result2.rows[i]['image_path'],
                            "postedOn": moment(result2.rows[i]['comment_on'], 'YYYY.MM.DD').fromNow(),
                            "comment": result2.rows[i]['comments'],
                            "account_type": account_type,
                            "is_admin":result2.rows[i]['is_admin']
                        })
                    };
                    newsData.push({
                        "title": result1.rows[0]['title'],
                        "newsID": result1.rows[0]['news_id'],
                        "admin_id": result1.rows[0]['admin_id'],
                        "postedBy": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "postedOn": moment(result1.rows[0]['uploaded_on']).format('DD.MM.YYYY'),
                        "categoryID": result1.rows[0]['category_id'],
                        "category": result1.rows[0]['category_name'],
                        "description": result1.rows[0]['description'],
                        "image": result1.rows[0]['image_path'],
                        "is_hide": result1.rows[0]['is_hide'],
                        "is_breaking": interval,
                        "commentCount": commentCount,
                        "comments": commentData
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: newsData
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getNewsById', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getNewsById', 'Internal server error', 500)
            }
        }
        getNewsByIdData()
    },

    addNewsComment: function (req, res) {
        async function AddNewsCommentData() {
            try {
                const result1 = await newsModel.addNewsComment(req.body);
                if (result1.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: "Data Added Successful",
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'addNewsComment', 'Failed to add data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'addNewsComment', 'Internal server error', 500)
            }
        }
        AddNewsCommentData()
    },

    deleteNewsComment: function (req, res) {
        async function DeleteNewsCommentData() {
            try {
                const result1 = await newsModel.deleteNewsComment(req.body.commentID);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Delete Successful",
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'addNewsComment', 'Failed to delete data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'addNewsComment', 'Internal server error', 500)
            }
        }
        DeleteNewsCommentData()
    },

    deleteNews: function (req, res) {
        async function DeleteNewsData() {
            try {
                const result1 = await newsModel.deleteNews(req.body.ID);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Delete Successful",
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteNews', 'Failed to delete data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteNews', 'Internal server error', 500)
            }
        }
        DeleteNewsData()
    },

    breakingNews: function (req, res) {
        async function BreakingNewsData() {
            try {
                const result1 = await newsModel.breakingNews();
                if (result1.rows.length > 0) {
                    let newsData = []
                    for (var i = 0; i < result1.rows.length; i++) {
                        newsData.push({
                            "news_id": result1.rows[i]['news_id'],
                            "title": result1.rows[i]['title'],
                            "description": result1.rows[i]['description'],
                            "image_path": result1.rows[i]['image_path'],
                            "uploaded_on": moment(result1.rows[i]['uploaded_on']).format('DD.MM.YYYY'),
                        })
                    } 
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: newsData
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'breakingNews', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'breakingNews', 'Internal server error', 500)
            }
        }
        BreakingNewsData()
    },

    editNewsById: function (req, res) {
        async function editNewsByIdData() {
            try {
                const result1 = await newsModel.getNewsDataByID(req.body.ID);
                const result2 = await newsModel.getNewsCommentsByID(req.body.ID, req.body.offset);
                const result3 = await newsModel.isBreakingNewsEditable(req.body.ID);
                const commentData = [], newsData = [];
                var commentCount = 0;
                if (result1.rows.length > 0) {
                    if ((result3.rows[0]['interval'] > 48) && (result1.rows[0]['is_breaking']=='true'|| result1.rows[0]['is_breaking']==true)){ 
                        interval = true;
                        const result4 = await newsModel.changeBreakingNewsStatus(req.body.ID);
                    }
                    else if(result1.rows[0]['is_breaking']=='false'|| result1.rows[0]['is_breaking']==false){ 
                        interval = true;
                    }else{
                        interval = false;
                    }

                    if (result2.rows.length > 0) commentCount = result2.rows[0]['comment_count']
                    else commentCount = 0
                    for (i = 0; i < result2.rows.length; i++) {
                        if (result2.rows[i]['login_type'] == 'google' || result2.rows[i]['login_type'] == 'facebook') var account_type = 'social'
                            else var account_type = result2.rows[i]['login_type']
                        commentData.push({
                            "commentID": result2.rows[i]['id'],
                            "admin_id": result2.rows[i]['admin_id'],
                            "user_id": result2.rows[i]['user_id'],
                            "postedBy": result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name'],
                            "image": result2.rows[i]['image_path'],
                            "postedOn": moment(result2.rows[i]['comment_on'], 'YYYY.MM.DD').fromNow(),
                            "comment": result2.rows[i]['comments'],
                            "account_type": account_type,
                            "is_admin":result2.rows[i]['is_admin']
                        })
                    };
                    newsData.push({
                        "title": result1.rows[0]['title'],
                        "newsID": result1.rows[0]['news_id'],
                        "admin_id": result1.rows[0]['admin_id'],
                        "postedBy": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "postedOn": moment(result1.rows[0]['uploaded_on'], 'YYYY.MM.DD').fromNow(),
                        "categoryID": result1.rows[0]['category_id'],
                        "category": result1.rows[0]['category_name'],
                        "description": result1.rows[0]['description'],
                        "image": result1.rows[0]['image_path'],
                        "is_hide": result1.rows[0]['is_hide'],
                        "is_breaking": result1.rows[0]['is_breaking'],
                        "commentCount": commentCount,
                        "is_disable": interval,
                        "comments": commentData
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: newsData
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'editNewsById', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'editNewsById', 'Internal server error', 500)
            }
        }
        editNewsByIdData()
    },

    updateNews: function (req, res) {
            var updateData = req.body;
            async function updateNewsData() {
                try {
                    const updateNews = await newsModel.updateNews(updateData);
                    if(updateData.isURL==="false" || updateData.isURL===false ){
                        const newsImageFile = await newsModel.newsImage(updateNews.rows[0]['news_id']," ");
                    }
                    if (updateNews.rows.length > 0) {
                        if (req.files && req.files != null && Object.keys(req.files).length > 0) {
                            var path = './public/assests/news/' + updateNews.rows[0]['news_id'] + '/';
                            mkdirp(path + "/", function (err) {
                                if (err) console.error(err)
                                else {
                                    let fileData = req.files.file;
                                    var today_date = moment().format("YYYYMMDDHHSS");
                                    if ((fileData.mimetype == 'image/png') || (fileData.mimetype == 'image/jpeg') || (fileData.mimetype == 'image/jfif') || (fileData.mimetype == 'application/pdf') || (fileData.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                                        let DBpath = "public/assests/news/" + updateNews.rows[0]['news_id'] + "/" + today_date + fileData.name
                                        fs.writeFile(path + today_date + fileData.name, fileData.data, function (err, result) {
                                            if (err) {
                                                ErrorLogs.errorResponse(res, 'updateNews', 'File not uploaded!!', 402)
                                            } else {
                                                async function insertImage() {
                                                    try {
                                                        const newsImageFile = await newsModel.newsImage(updateNews.rows[0]['news_id'], DBpath);
                                                        if (newsImageFile.rows.length > 0) {
                                                            res.status(201).send({
                                                                status: true,
                                                                message: "News update Successful",
                                                            })
                                                        } else ErrorLogs.errorResponse(res, 'updateNews', 'Failed to update news', 400)
                                                    } catch (error) {
                                                        ErrorLogs.errorResponse(res, 'updateNews', 'Internal server error', 500)
                                                    }
                                                }
                                                insertImage()
                                            }
                                        })
                                    } else ErrorLogs.errorResponse(res, 'updateNews', 'File format not supported', 403)
                                }
                            })
                        } else {
                            res.status(201).send({
                                status: true,
                                message: "News update Successful",
                            })
                        }
                    } else ErrorLogs.errorResponse(res, 'RegisterNews', 'Failed to update news', 400)
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'RegisterNews', 'Internal server error', 500)
                }
            }
            updateNewsData()
    },

    getNewsByIdOCM: function (req, res) {
        async function getNewsByIdOCMData() {
            try {
                const result1 = await newsModel.getNewsDataByID(req.body.ID);
                const result2 = await newsModel.getNewsCommentsByID(req.body.ID, req.body.offset);
                const result3 = await newsModel.isBreakingNewsEditable(req.body.ID);
                const commentData = [], newsData = [];
                let comment_user="";
                var commentCount = 0;
                if (result1.rows.length > 0) {
                    if (result3.rows[0]['interval'] > 48){ 
                        interval = true;
                        const result4 = await newsModel.changeBreakingNewsStatus(req.body.ID);
                    }
                    else{ 
                        interval = false;
                    }
                    if (result2.rows.length > 0) commentCount = result2.rows[0]['comment_count']
                    else commentCount = 0
                    for (i = 0; i < result2.rows.length; i++) {
                        if(result2.rows[i]['is_admin']==false || result2.rows[i]['is_admin']=='false' ){
                            comment_user= result2.rows[i]['f_name'] + " " + result2.rows[i]['l_name'];
                        }else{
                            comment_user="Admin"
                        }
                        commentData.push({
                            "commentID": result2.rows[i]['id'],
                            "admin_id": result2.rows[i]['admin_id'],
                            "user_id": result2.rows[i]['user_id'],
                            "postedBy":comment_user ,
                            "image": result2.rows[i]['image_path'],
                            "postedOn": moment(result2.rows[i]['comment_on'], 'YYYY.MM.DD').fromNow(),
                            "comment": result2.rows[i]['comments'],
                        })
                    };
                    newsData.push({
                        "title": result1.rows[0]['title'],
                        "newsID": result1.rows[0]['news_id'],
                        "admin_id": result1.rows[0]['admin_id'],
                        "postedBy": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "postedOn": moment(result1.rows[0]['comment_on']).format('DD.MM.YYYY'),
                        "categoryID": result1.rows[0]['category_id'],
                        "category": result1.rows[0]['category_name'],
                        "description": result1.rows[0]['description'],
                        "image": result1.rows[0]['image_path'],
                        "is_hide": result1.rows[0]['is_hide'],
                        "is_breaking": interval,
                        "commentCount": commentCount,
                        "comments": commentData
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: newsData
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getNewsByIdOCM', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getNewsByIdOCM', 'Internal server error', 500)
            }
        }
        getNewsByIdOCMData()
    },

};




module.exports = newsController;