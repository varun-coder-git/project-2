const db = require('../config/dbConnection'); //reference of dbconnection.js
var dateTime = new Date();

const news_eventTask = {
    getAllNews_events: function (callback) {
            return db.query("SELECT title,description,status_id FROM news_events;", callback);
    },

    getNews_eventsId: function (id,callback) {
        return db.query("SELECT title,description,status_id FROM news_events where created_by=$1;",[id],callback);
    },
    AddNews_events : function(news_data, callback){
        db.query("insert into news_events(title,description,status_id,created_on,created_by) values($1,$2,$3,$4,$5)",[news_data.title,news_data.description,1,dateTime,news_data.userId,], callback);
     },

    news_eventsUpdate :function(update_data, callback){
       var name=update_data.full_name;
       var full_name=name.split(" ");
       var fname=full_name[0]
       var lname=full_name[1]
        db.query("update users set email=$1,dob=$2,gender=$3,emergency_number=$4,blood_group_id=$5,pincode=$6,address=$7,city=$8,f_name=$9,l_name=$10 where user_id=$1",[update_data.email,update_data.dob,update_data.gender,update_data.emergency_number,update_data.blood_group,update_data.pincode,update_data.address,update_data.city,fname,lname,update_data.user_id],callback)

    }
};
module.exports = news_eventTask;
