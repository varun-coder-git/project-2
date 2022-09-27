const express = require('express');
const news_eventsModel = require('../models/news_eventsModel');
//const errorLogModel = require('../models/ErrorLogModel');

var news_events = {
    getAllNews_events: function (req, res) {
        news_eventsModel.getAllNews_events(function (err, data) {
            if (err) {
                logErrorMessage(res, 'getAllNews_events', err.message, 404, { status: true, message: 'Failed to fetch data from news_events table' });
            } else {
                res.status(200).send({ status: true, data: data.rows });
            }
        });
    },

    getNews_eventsId: function (req, res) {
        news_eventsModel.getNews_eventsId(req.params.id,function (err, data) {
            if (err) {
                logErrorMessage(res, 'getAllNews_eventsById', err.message, 404, { status: true, message: 'Failed to fetch news and events data from news_events table' });
            } else {
                res.status(200).send({ status: true, data: data.rows });
            }
        });
    },

    AddNews_events: function (req, res) {
        var news_data = req.body;
       // var user_id = news_data.user_id;
        news_eventsModel.AddNews_events(news_data, function (err, data) {
            if (err) {
                res.status(404).send({ status: false,message: err.message,})
            }
            else {
                    res.status(200).send({status: true,message:"Added successfully"})  
            }
        });
    },

    news_eventsUpdate: function(req, res){
        var update_data = req.body;
        userModel.userUpdateProfile(update_data,function(err,data){
            if(err){
                res.status(402).send({status: false,message: err.message,}) 
            }
            else{
                res.status(200).send({status: true,message: "Update successfull",}) 
            }
        })
    }
    
};

function logErrorMessage(res, methodName, message, statusCode, responseMessage) {
    errorLogModel.errorData.MethodName = methodName;
    errorLogModel.errorData.ErrorMessage = message;
    errorLogModel.addToErrorLog(errorLogModel.errorData, function (err, count) {
        if (err) {
            // console.log(err);
        } else {
            res.status(statusCode).send(responseMessage);
        }
    });
}

module.exports = news_events;  