const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');

const ChatbotTask = {
    getChatbotDetails: function () {
        return new Promise((resolve, reject) => {
            db.query("select w.ward_name ,u.f_name ,u.l_name ,c.chatbot_id,cs.chatbot_status ,c.chatbot_query,c.reported_date from users u inner join chatbot c on c.user_id =u.user_id inner join ward w on w.ward_id =u.ward_id inner join chatbot_status cs on cs.chatbot_status_id =c.chatbot_status_id where c.chatbot_query_status ='active' order by c.reported_date DESC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteChatbot: function (chatbot_id) {
        return new Promise((resolve, reject) => {
            db.query("update chatbot set chatbot_query_status ='delete' where chatbot_id =$1 returning chatbot_id", [chatbot_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getChatbotStatusCategory: function () {
        return new Promise((resolve, reject) => {
            db.query("select cs.chatbot_status_id ,cs.chatbot_status from chatbot_status cs order by cs.chatbot_status_id", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    setChatbotStatus: function (chatbot_id, chatbot_status_id) {
        return new Promise((resolve, reject) => {
            db.query("update chatbot set chatbot_status_id =$2 where chatbot_id =$1 returning chatbot_id  ", [chatbot_id, chatbot_status_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getChatbotById: function (chatbot_id) {
        return new Promise((resolve, reject) => {
            db.query("select c.chatbot_id ,c.chatbot_query ,c.reported_date ,cs.chatbot_status_id,cs.chatbot_status,w.ward_id ,w.ward_name, u.f_name ,u.l_name ,u.email ,u.phone_number[array_length(u.phone_number, 1)] from users u inner join ward w on w.ward_id =u.ward_id inner join chatbot c on c.user_id =u.user_id inner join chatbot_status cs on cs.chatbot_status_id =c.chatbot_status_id where c.chatbot_id =$1 and c.chatbot_query_status ='active'", [chatbot_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    createChatbot: function (user_id, concern_query) {
        return new Promise((resolve, reject) => {
            let reported_date = moment().format("YYYY-MM-DD HH:mm");
            db.query("insert into chatbot (user_id,chatbot_query,chatbot_status_id,chatbot_query_status,reported_date) values($1,$2,1,'active',$3) returning chatbot_id", [user_id, concern_query, reported_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};

module.exports = ChatbotTask;