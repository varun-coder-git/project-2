const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');

const ideasTask = {
    getAllIdeas: function (ideas_data, is_admin,) {
        return new Promise((resolve, reject) => {
            if (is_admin == true || is_admin == 'true') {
                db.query("select (select count(i2.thread_id) as total_rows from ideas i2 join users u2 on u2.user_id =i2.user_id join idea_category ic2 on i2.idea_cat_id=ic2.idea_cat_id join status_master sm2 on sm2.status_id = i2.status join ward w2 on u2.ward_id=w2.ward_id where i2.status = 1 and i2.main_thread_id is NULL and i2.idea_comment='idea' and u2.citizen_status ='active' and u2.is_admin =false ),i.thread_id,subqueryI.countOfChild ,i.user_id,w.ward_name,u.f_name,u.l_name,u.image_path,i.subject ,i.body ,ic.category_name,sm.status_code,i.created_date from ideas i join idea_category ic on i.idea_cat_id=ic.idea_cat_id join status_master sm on sm.status_id = i.status join users u on i.user_id =u.user_id join ward w on u.ward_id=w.ward_id left join (select  main_thread_id ,count(thread_id) as countOfChild from ideas where main_thread_id is not null and status=1 group by main_thread_id ) subqueryI on(i.thread_id = subqueryI.main_thread_id ) where i.status = 1 and i.main_thread_id is NULL and idea_comment='idea'and u.citizen_status ='active' order by w.ward_name ASC LIMIT $1 OFFSET $2", [ideas_data.offset, ideas_data.recordId - 1], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            } else {
                db.query("select (select count(i2.thread_id) as total_rows from ideas i2 join users u2 on u2.user_id =i2.user_id join idea_category ic2 on i2.idea_cat_id=ic2.idea_cat_id join status_master sm2 on sm2.status_id = i2.status join ward w2 on u2.ward_id=w2.ward_id where i2.status = 1 and i2.main_thread_id is NULL and i2.idea_comment='idea' and u2.citizen_status ='active' and u2.is_admin =false ),i.thread_id,subqueryI.countOfChild ,i.user_id,w.ward_name,u.f_name,u.l_name,u.image_path,i.subject ,i.body ,ic.category_name,sm.status_code,i.created_date from ideas i join idea_category ic on i.idea_cat_id=ic.idea_cat_id join status_master sm on sm.status_id = i.status join users u on i.user_id =u.user_id join ward w on u.ward_id=w.ward_id left join (select main_thread_id ,count(thread_id) as countOfChild from ideas where main_thread_id is not null and status=1 group by main_thread_id ) subqueryI on(i.thread_id = subqueryI.main_thread_id ) where i.status = 1 and i.main_thread_id is NULL and idea_comment='idea' and u.citizen_status ='active' and u.is_admin =false order by created_date DESC LIMIT $1 OFFSET $2", [ideas_data.offset, ideas_data.recordId - 1], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            }
        });
    },

    getMostDiscussedIdeas: function (ideas_data) {
        return new Promise((resolve, reject) => {
            db.query("select (select count(i2.thread_id) as total_rows from ideas i2 join users u2 on u2.user_id =i2.user_id join idea_category ic2 on i2.idea_cat_id=ic2.idea_cat_id join status_master sm2 on sm2.status_id = i2.status join ward w2 on u2.ward_id=w2.ward_id where i2.status = 1 and i2.main_thread_id is NULL and i2.idea_comment='idea' and u2.citizen_status ='active' and u2.is_admin =false ), i.thread_id,subqueryI.countOfChild as countOfChild , i.user_id,w.ward_name,u.f_name,u.l_name,u.image_path, i.subject ,i.body ,ic.category_name,sm.status_code,i.created_date from ideas i join idea_category ic on i.idea_cat_id=ic.idea_cat_id join status_master sm on sm.status_id = i.status join users u on i.user_id =u.user_id join ward w on u.ward_id=w.ward_id left join (select main_thread_id , count(thread_id) as countOfChild from ideas where main_thread_id is not null and status=1 group by main_thread_id ) subqueryI on(i.thread_id = subqueryI.main_thread_id ) where status=1 and idea_comment='idea' and i.main_thread_id is NULL and u.citizen_status ='active' and u.is_admin =false order by subqueryI.countOfChild desc nulls last LIMIT $1 OFFSET $2;", [ideas_data.offset, ideas_data.recordId - 1], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getTrendingIdeas: function (ideas_data) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("YYYY-MM-DD HH:mm");
            let past_date = moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm');
            db.query("select (select count(i2.thread_id) as total_rows from ideas i2 join users u2 on u2.user_id =i2.user_id join idea_category ic2 on i2.idea_cat_id=ic2.idea_cat_id join status_master sm2 on sm2.status_id = i2.status join ward w2 on u2.ward_id=w2.ward_id where i2.status = 1 and (i2.created_date BETWEEN $3 and $4) and i2.main_thread_id is NULL and i2.idea_comment='idea' and u2.citizen_status ='active' and u2.is_admin =false ),i.thread_id,subqueryI.countOfChild as countOfChild , i.user_id,w.ward_name,u.f_name,u.l_name,u.image_path, i.subject ,i.body ,ic.category_name,sm.status_code,i.created_date from ideas i join idea_category ic on i.idea_cat_id=ic.idea_cat_id join status_master sm on sm.status_id = i.status join users u on i.user_id =u.user_id join ward w on u.ward_id=w.ward_id left join (select main_thread_id ,count(thread_id) as countOfChild from ideas where main_thread_id is not null and status=1 group by main_thread_id ) subqueryI on(i.thread_id = subqueryI.main_thread_id ) where status=1 and (i.created_date BETWEEN $3 and $4) and idea_comment='idea' and i.main_thread_id is NULL and u.citizen_status ='active' and u.is_admin =false order by subqueryI.countOfChild desc nulls last LIMIT $1 OFFSET $2;", [ideas_data.offset, ideas_data.recordId - 1, past_date, today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    GetIdeasbyUser: function (id, ideas_data) {
        return new Promise((resolve, reject) => {
            db.query("select i.thread_id,i.user_id,u.f_name,u.l_name,u.image_path,i.subject ,i.body ,ic.category_name,sm.status_code,i.created_date from ideas i join idea_category ic on i.idea_cat_id=ic.idea_cat_id join status_master sm on sm.status_id = i.status join users u on i.user_id =u.user_id where  i.status = 1 and i.main_thread_id is null and i.user_id =$1 LIMIT $2 OFFSET $3;", [id, ideas_data.offset, ideas_data.recordId - 1], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getIdeasbySummaryId: function (id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT i.share_location_flag,i.latitude,i.longitude,i.address,i.thread_id,subqueryI.countOfChild ,i.main_thread_id,i.user_id,u.f_name,u.l_name,u.image_path, w.ward_name,i.subject ,i.body ,ic.category_name,ic.idea_cat_id,sm.status_code ,i.created_date,i.updated_on from ideas i join idea_category ic on i.idea_cat_id =ic.idea_cat_id join status_master sm on sm.status_id = i.status join users u on i.user_id =u.user_id join ward w on u.ward_id=w.ward_id left join (select main_thread_id ,count(thread_id) as countOfChild from ideas where main_thread_id is not null and status=1 group by main_thread_id ) subqueryI on(i.thread_id = subqueryI.main_thread_id ) where i.thread_id=$1  and i.idea_comment='idea'  order by i.updated_on desc", [id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getIdeasbySummaryIdComments: function (id, offset) {
        return new Promise((resolve, reject) => {
            db.query("SELECT i.thread_id,i.main_thread_id,i.user_id,u.f_name,u.l_name,u.image_path,u.login_type,u.is_admin,w.ward_name,i.subject ,i.body ,ic.category_name,ic.idea_cat_id,sm.status_code ,i.created_date,i.updated_on from ideas i join idea_category ic on i.idea_cat_id =ic.idea_cat_id join status_master sm on sm.status_id = i.status join users u on i.user_id =u.user_id join ward w on u.ward_id=w.ward_id where i.main_thread_id=$1 and i.status ='1' order by i.updated_on desc LIMIT $2;", [id, offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    CreateIdea: function (user_Id, idea_cat_id, title, description,latitude,longitude,address,share_location_flag, callback) {
        var dateTime = new Date();
        db.query("INSERT into ideas(user_id,idea_cat_id,subject,body,created_date,status,updated_on,idea_comment,latitude,longitude,address,share_location_flag) values($1,$2,$3,$4,$5,$6,$7,'idea',$8,$9,$10,$11) returning thread_id", [user_Id, idea_cat_id, title, description, dateTime, 1, dateTime,latitude,longitude,address,share_location_flag], callback);
    },

    UpdateIdea: function (ideas_data) {
        return new Promise((resolve, reject) => {
            var dateTime = new Date();
            db.query("UPDATE ideas SET subject =$1, body=$2,updated_on=$3 WHERE user_id =$4 and thread_id=$5 returning thread_id;", [ideas_data.title, ideas_data.description, dateTime, ideas_data.user_Id, ideas_data.thread_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    DeleteIdea: function (ideas_data) {
        return new Promise((resolve, reject) => {
            var dateTime = new Date();
            db.query("UPDATE ideas SET status =$1,updated_on=$2 where thread_id =$4 and ($3 in (select user_id from users where is_admin is true) or (user_id = (select user_id from users where user_id = $3 ))) returning thread_id;", [2, dateTime, ideas_data.user_Id, ideas_data.thread_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    AddIdeaResponse: function (IdeaData) {
        return new Promise((resolve, reject) => {
            var dateTime = new Date();
            db.query("INSERT into ideas(user_id,idea_cat_id,body,created_date,main_thread_id,status,updated_on,idea_comment) values($1,$2,$3,$4,$5,$6,$7,'comment') returning thread_id", [IdeaData.user_Id, IdeaData.idea_cat_id, IdeaData.description, dateTime, IdeaData.parent_thread_id, 1, dateTime], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },


    DeleteIdeaResponse: function (ideas_data) {
        return new Promise((resolve, reject) => {
            db.query("update ideas set status ='5' where thread_id =$1 and ($2 in (select user_id from users where is_admin is true) or (user_id = (select user_id from users where user_id = $2 ))) returning thread_id", [ideas_data.response_Id, ideas_data.user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    insertIdeaMedia: function (thread_id, DB1_path, callback) {
        db.query("insert into ideas(attachment_thread_id,attachment_path,idea_comment) values($1,$2,'media') returning thread_id", [thread_id, DB1_path], callback);
    },

    getIdeaAttachment: function (thread_id) {
        return new Promise((resolve, reject) => {
            db.query("select attachment_path,thread_id from ideas i where i.attachment_thread_id =$1", [thread_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    searchIdeaData: function (search_text) {
        return new Promise((resolve, reject) => {
            db.query("select i.thread_id,subqueryI.countOfChild ,i.user_id,w.ward_name,u.f_name,u.l_name,u.image_path,i.subject ,i.body ,ic.category_name,sm.status_code,i.created_date from ideas i join idea_category ic on i.idea_cat_id=ic.idea_cat_id join status_master sm on sm.status_id = i.status join users u on i.user_id =u.user_id join ward w on u.ward_id=w.ward_id left join (select main_thread_id ,count(thread_id) as countOfChild from ideas where main_thread_id is not null and status=1 group by main_thread_id ) subqueryI on(i.thread_id = subqueryI.main_thread_id ) where i.status = 1 and i.main_thread_id is null and (u.f_name || ' ' || u.l_name || ' ' || i.subject || ' ' || i.body || ' ' || ic.category_name) ilike $1 order by i.created_date DESC", [`%${search_text}%`,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    ideaCategory: function () {
        return new Promise((resolve, reject) => {
            db.query("select ic.idea_cat_id ,ic.category_name from idea_category ic order by ic.category_name ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

};
module.exports = ideasTask;