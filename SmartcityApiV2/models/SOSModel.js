const db = require('../config/dbConnection'); //reference of dbconnection.js

const SOSTask = {
    GetSOSData: function (user_id, callback) {
        db.query("select u.f_name ,u.l_name ,u.phone_number[array_length(u.phone_number, 1)] ,u.emergency_number ,u.latitude ,u.longitude from users u where u.user_id=$1", [user_id], callback);
    },

};

module.exports = SOSTask;