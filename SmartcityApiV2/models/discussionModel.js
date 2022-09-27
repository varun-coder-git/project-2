const db = require('../config/dbConnection'); //reference of dbconnection.js

const DiscussionTask = {
    getAllDiscussion: function (query_id, user_id) {
        if (query_id == 0) {
            return new Promise((resolve, reject) => {
                db.query("select * from discussions", [], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        }
        else if (query_id == 1) {
            return new Promise((resolve, reject) => {
                db.query("select * from discussions where user_id=$1", [user_id], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        }
    },

    addNewDiscussion: function (user_id, discussion_cat_id, subject, body, date) {
        return new Promise((resolve, reject) => {
            db.query("insert into discussions(user_id, discussion_cat_id, subject, body, date) values($1,$2,$3,$4,$5) returning thread_id", [user_id, discussion_cat_id, subject, body, date,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateDiscussion: function (discussion_cat_id, subject, body, date, thread_id) {
        return new Promise((resolve, reject) => {
            db.query("update discussions set discussion_cat_id=$1 ,subject=$2 ,body=$3 ,date=$4 where thread_id=$5 returning user_id", [discussion_cat_id, subject, body, date, thread_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};
module.exports = DiscussionTask;
