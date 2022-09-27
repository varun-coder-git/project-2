const express = require('express'),
    discussionModel = require('../models/discussionModel'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'discussionController';

var discussionController = {
    getAllDiscussion: function (req, res) {
        var discussion_data = req.body;
        var user_id = discussion_data.user_id;
        var query_id = discussion_data.id;
        async function GetAllDiscussionData() {
            try {
                const result1 = await discussionModel.getAllDiscussion(query_id, user_id,);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getAllDiscussion', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getAllDiscussion', 'Internal server error', 500)
            }
        }
        GetAllDiscussionData()
    },

    addNewDiscussion: function (req, res) {
        var discussion_data = req.body;
        var user_id = discussion_data.user_id;
        var discussion_cat_id = discussion_data.discussion_cat_id;
        var subject = discussion_data.subject;
        var body = discussion_data.body
        var date = discussion_data.date
        async function RegisterDiscussion() {
            try {
                const result1 = await discussionModel.addNewDiscussion(user_id, discussion_cat_id, subject, body, date);
                if (result1.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: "Data Inserted Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'addNewDiscussion', 'Failed to insert data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'addNewDiscussion', 'Internal server error', 500)
            }
        }
        RegisterDiscussion()
    },

    updateDiscussion: function (req, res) {
        var discussion_data = req.body;
        var discussion_cat_id = discussion_data.discussion_cat_id;
        var subject = discussion_data.subject;
        var body = discussion_data.body
        var date = discussion_data.date
        var thread_id = discussion_data.thread_id;
        async function UpdateDiscussionData() {
            try {
                const result1 = await discussionModel.updateDiscussion(discussion_cat_id, subject, body, date, thread_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Updated Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'updateDiscussion', 'Failed to update data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'updateDiscussion', 'Internal server error', 500)
            }
        }
        UpdateDiscussionData()
    },
};

module.exports = discussionController;