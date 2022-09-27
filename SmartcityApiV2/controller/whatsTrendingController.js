const express = require('express'),
    whatsTrendingModel = require('../models/whatsTrendingModel'),
    moment = require('moment'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'WhatsTrendingController';

var WhatsTrendingController = {
    getWhatsTrending: function (req, res) {
        var WhatsTrendingData = []
        async function DealersList() {
            try {
                const result1 = await whatsTrendingModel.getWhatsTrendingCount();
                const result2 = await whatsTrendingModel.getWhatsTrendingDetails(req.body.offset);
                if (result2.rows.length > 0) {
                    var total_rows = result1.rows.length;
                    for (var i = 0; i < result2.rows.length; i++) {
                        if (result2.rows[i]['type_data'] == 'poll') {
                            WhatsTrendingData.push({
                                "id": result2.rows[i]['id'],
                                "count": result2.rows[i]['countofchild'],
                                "title": result2.rows[i]['description'],
                                "admin_id": result2.rows[i]['admin_id'],
                                "poll_options_id": result2.rows[i]['poll_options_id'],
                                "description": result2.rows[i]['description'],
                                "created_date": moment(result2.rows[i]['created_date'], 'YYYY.MM.DD').fromNow(),
                                "type_data": result2.rows[i]['type_data'],
                            })
                        } else {
                            WhatsTrendingData.push({
                                "id": result2.rows[i]['id'],
                                "count": result2.rows[i]['countofchild'],
                                "title": result2.rows[i]['title'],
                                "description": result2.rows[i]['description'],
                                "created_date": moment(result2.rows[i]['created_date'], 'YYYY.MM.DD').fromNow(),
                                "type_data": result2.rows[i]['type_data'],
                            })
                        }
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        total_rows: total_rows,
                        data: WhatsTrendingData
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getWhatsTrending', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getWhatsTrending', 'Internal server error', 500)
            }
        }
        DealersList()

    },

    // getWhatsTrendingbyId: function (req, res) {
    //     var trending_data = req.body;
    //     var token = trending_data.token;
    //     var user_id = trending_data.user_id;
    //     var offset = trending_data.offset
    //     var id = trending_data.id;
    //     var type_data= trending_data.type_data;
    //     var WhatsTrendingData = []
    //     jwt.verify(token, secret_key, function (err, decoded) {
    //         if (err) {
    //             res.status(500).send({
    //                 auth: false,
    //                 message: 'Failed to authenticate token.'
    //             });
    //         } else {
    //             if (decoded.id != user_id) {
    //                 res.status(500).send({
    //                     auth: false,
    //                     message: 'Invalid Token/token doesnot match with id'
    //                 });
    //             } else {
    //                 whatsTrendingModel.getwhatsTrendingDetails(offset, function (err, whats_Data) {
    //                     if (err) {
    //                         logErrorMessage(res, 'getWhatsTrending', err.message, 404, {
    //                             status: false,
    //                             message: 'Failed to get data'
    //                         });
    //                     } else {
    //                         if (whats_Data.rows.length > 0) {
    //                             for (var i = 0; i < whats_Data.rows.length; i++) {
    //                                 WhatsTrendingData.push({
    //                                     "id": whats_Data.rows[i]['id'],
    //                                     "count": whats_Data.rows[i]['countofchild'],
    //                                     "title": whats_Data.rows[i]['title'],
    //                                     "description": whats_Data.rows[i]['description'],
    //                                     "created_date": moment(whats_Data.rows[i]['created_date'], 'YYYY.MM.DD').fromNow(),
    //                                     "type_data": whats_Data.rows[i]['type_data'],
    //                                 })
    //                             }
    //                             res.status(200).send({
    //                                 status: true,
    //                                 message: "Data Found",
    //                                 data: WhatsTrendingData
    //                             });
    //                         } else {
    //                             logErrorMessage(res, 'getWhatsTrending', "Data Not Found", 404, {
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
};

module.exports = WhatsTrendingController;