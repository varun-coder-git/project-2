const express = require('express'),
    moment = require('moment'),
    feedbackModel = require('../models/feedbackModel'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'Feedback';

var FeedBackController = {
    getFeedback: function (req, res) {
        var complaint_feedback = [],ward_name;
        async function GetFeedbackData() {
            try {
                const result1 = await feedbackModel.getAllComplaintFeedback();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['user_id'] == 'null' || result1.rows[i]['user_id'] == null || result1.rows[i]['user_id'] == undefined) {
                            ward_name = 'Anonymous'
                        } else {
                            ward_name = result1.rows[i]['ward_name']
                        }
                        complaint_feedback.push({
                            "ward_name": ward_name,
                            "feedback_id": result1.rows[i]['thread_id'],
                            "feedbackfor": result1.rows[i]['complaint_comment'],
                            "category": result1.rows[i]['category_name'],
                            "submission_date": moment(result1.rows[i]['submission_date']).format('YYYY-MM-DD'),
                            "feedback_rating": result1.rows[i]['feedback_rating'],
                            "feedback_description": result1.rows[i]['feedback_description'],
                            "feedback_submission_date": moment(result1.rows[i]['feedback_submission_date']).format('YYYY-MM-DD'),
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: complaint_feedback
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getFeedback', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getFeedback', 'Internal server error', 500)
            }
        }
        GetFeedbackData()
    },

    deleteFeedBack: function (req, res) {
        var FeedbackData = req.body;
        var feedbackFor = FeedbackData.feedbackfor;
        var feedback_id = FeedbackData.feedback_id;
        async function DeleteFeedBackData() {
            try {
                const result1 = await feedbackModel.deleteFeedBack(feedbackFor, feedback_id);

                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Successful",
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteFeedBack', 'Failed to delete data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteFeedBack', 'Internal server error', 500)
            }
        }
        DeleteFeedBackData()
    },

    getFeedbackById: function (req, res) {
        var FeedBackID_Data = req.body;
        var feedbackFor = FeedBackID_Data.feedbackfor;
        var feedback_id = FeedBackID_Data.feedback_id;
        var A_Full_name,A_ward_name,feedback_data=[];

        async function GetFeedbackByIdData() {
            try {
                const result1 = await feedbackModel.getFeedbackById(feedbackFor, feedback_id);
                if (result1.rows.length > 0) {
                    if ((feedbackFor == 'Incident' || feedbackFor == 'incident') && (result1.rows[0]['user_id'] == 'null' || result1.rows[0]['user_id'] == null || result1.rows[0]['user_id'] == undefined)) {
                        A_ward_name = 'Anonymous'
                        A_Full_name = 'Anonymous'
                    } else {
                        A_ward_name = result1.rows[0]['ward_name']
                        A_Full_name = result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name']
                    }
                    feedback_data.push({
                        "ward_name": A_ward_name,
                        "feedback_id": result1.rows[0]['id'],
                        "posted_by": A_Full_name,
                        "feedbackfor": result1.rows[0]['comment'],
                        "category": result1.rows[0]['cat_name'],
                        "subject": result1.rows[0]['subject'],
                        "submission_date": moment(result1.rows[0]['submission_date'], 'YYYY.MM.DD').fromNow(),
                        "feedback_rating": result1.rows[0]['feedback_rating'],
                        "feedback_description": result1.rows[0]['feedback_description'],
                        "feedback_submission_date": moment(result1.rows[0]['feedback_submission_date'], 'YYYY.MM.DD').fromNow(),
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: feedback_data
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getFeedbackById', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getFeedbackById', 'Internal server error', 500)
            }
        }
        GetFeedbackByIdData()
    },
};

module.exports = FeedBackController;