const express = require('express'),
    moment = require('moment'),
    chatbotModel = require('../models/chatbotModel'),
    errorLogModel = require('../models/ErrorLogModel'),
    ErrorLogs = require('./errorController');
errorLogModel.errorData.ControllerName = 'ChatbotController';

var chatbotController = {
    getChatbotData: function (req, res) {
        var ChatbotDetails = []
        async function getChatbotDetails() {
            try {
                const result1 = await chatbotModel.getChatbotDetails();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        ChatbotDetails.push({
                            "chatbot_id": result1.rows[i]['chatbot_id'],
                            "ward_name": result1.rows[i]['ward_name'],
                            "citizen_name": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "query": result1.rows[i]['chatbot_query'],
                            "reported_date": moment(result1.rows[i]['reported_date']).format('YYYY-MM-DD'),
                            "status": result1.rows[i]['chatbot_status'],
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: ChatbotDetails
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getChatbotData', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getChatbotData', 'Internal server error', 500)
            }
        }
        getChatbotDetails()
    },

    deleteChatbot: function (req, res) {
        var chatbot_data = req.body;
        var chatbot_id = chatbot_data.chatbot_id;

        async function DeleteChatbotData() {
            try {
                const result1 = await chatbotModel.deleteChatbot(chatbot_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteChatbot', 'Failed to delete data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteChatbot', 'Internal server error', 500)
            }
        }
        DeleteChatbotData()
    },

    getChatbotStatusCategory: function (req, res) {
        async function ChatbotCategoryData() {
            try {
                const result1 = await chatbotModel.getChatbotStatusCategory();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getChatbotStatusCategory', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getChatbotStatusCategory', 'Internal server error', 500)
            }
        }
        ChatbotCategoryData()
    },

    updateChatbotStatus: function (req, res) {
        var chatbot_data = req.body;
        var chatbot_id = chatbot_data.chatbot_id;
        var chatbot_status_id = chatbot_data.chatbot_status_id;
        async function updateChatbotStatusData() {
            try {
                const result1 = await chatbotModel.setChatbotStatus(chatbot_id, chatbot_status_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Update Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'updateChatbotStatus', 'Failed to update data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'updateChatbotStatus', 'Internal server error', 500)
            }
        }
        updateChatbotStatusData()
    },

    getChatbotById: function (req, res) {
        var ChatbotDetails = []
        async function getChatbotByIdData() {
            try {
                const result1 = await chatbotModel.getChatbotById(req.body.chatbot_id);
                if (result1.rows.length > 0) {
                    var phoneNumber;
                    for (var i = 0; i < result1.rows.length; i++) {
                        if (result1.rows[i]['phone_number'] == '' || result1.rows[i]['phone_number'] == null || result1.rows[i]['phone_number'] == 'null' || result1.rows[i]['phone_number'] == undefined) {
                            phoneNumber = 'NA'
                        }
                        else {
                            phoneNumber = result1.rows[i]['phone_number']
                        }
                        ChatbotDetails.push({
                            "chatbot_id": result1.rows[i]['chatbot_id'],
                            "chatbot_query": result1.rows[i]['chatbot_query'],
                            "reported_date": moment(result1.rows[i]['reported_date']).format('DD MMM YYYY h:mm A'),
                            "chatbot_status_id": result1.rows[i]['chatbot_status_id'],
                            "chatbot_status": result1.rows[i]['chatbot_status'],
                            "ward_id": result1.rows[i]['ward_id'],
                            "ward_name": result1.rows[i]['ward_name'],
                            "full_name": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "email": result1.rows[i]['email'],
                            "phone_number": phoneNumber,
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: ChatbotDetails
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getChatbotById', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getChatbotById', 'Internal server error', 500)
            }
        }
        getChatbotByIdData()
    },

    createChatbot: function (req, res) {
        var chatbot_data = req.body;
        var user_id = chatbot_data.user_id;
        var concern_query = chatbot_data.concern_query;
        async function createChatbotData() {
            try {
                const result1 = await chatbotModel.createChatbot(user_id, concern_query);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Concern Register Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'createChatbot', 'Failed to register data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'createChatbot', 'Internal server error', 500)
            }
        }
        createChatbotData()
    },
};

module.exports = chatbotController;