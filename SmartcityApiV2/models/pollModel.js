const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');
const UserTask = {
    activePoll: function () {
        return new Promise((resolve, reject) => {
            db.query("update poll set poll_status='Active',is_poll_reactivate='true' where Date(start_date) <= current_date AND current_date <= Date(end_date) and poll_status='Inactive' or poll_status=null ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    inactivePoll: function () {
        return new Promise((resolve, reject) => {
            db.query("update poll set poll_status='Inactive',is_poll_reactivate='false' where current_date < Date(start_date) OR current_date > Date(end_date)", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    isDisableStatus: function () {
        return new Promise((resolve, reject) => {
            db.query("update poll set poll_status='Inactive',is_poll_reactivate='false' where is_disable='true' ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getAdminPollData: function (offset) {
        return new Promise((resolve, reject) => {
            db.query("select pc.poll_cat_id,pc.poll_category_name,p.admin_id,p.main_poll_id,p.poll_id,p.poll_options_id,p.poll_subject,u.image_path,u.f_name,u.l_name,p.submission_date,p.poll_status,p.start_date,p.end_date from users u inner join poll p on u.user_id = p.admin_id inner join poll_category pc on p.poll_cat_id=pc.poll_cat_id where p.poll_subject is not null and p.poll_active_status ='active' order by p.submission_date DESC limit $1", [offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getPollData: function (offset) {
        return new Promise((resolve, reject) => {
            db.query("select (select count(p2.poll_id) as total_rows from poll p2 inner join users u2 on u2.user_id = p2.admin_id where (p2.poll_status='Active') and p2.poll_answer ='poll' and u2.is_admin =true and u2.citizen_status ='active' and p2.poll_active_status='active' and p2.is_disable='false' and Date(p2.start_date) <=current_date and current_date <=Date(p2.end_date)), p.poll_id,subqueryI.vote,pc.poll_cat_id, pc.poll_category_name,p.admin_id, p.main_poll_id,p.poll_options_id,p.poll_subject,u.image_path,u.f_name,u.l_name, p.submission_date,p.poll_status,p.start_date,p.end_date from users u inner join poll p on u.user_id = p.admin_id inner join poll_category pc on p.poll_cat_id=pc.poll_cat_id left join (select main_poll_id, COUNT(answer_vote) as vote from poll where main_poll_id is not null and answer_vote_status='active' GROUP BY main_poll_id) subqueryI on(p.poll_id = subqueryI.main_poll_id ) where (p.poll_status='Active') and p.poll_answer ='poll' and u.is_admin =true and u.citizen_status ='active' and poll_active_status='active' and is_disable='false' and Date(p.start_date) <=current_date and current_date <=Date(p.end_date) order by p.start_date desc limit $1", [offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    checkDuplicateSubject: function (poll_subject) {
        return new Promise((resolve, reject) => {
            db.query("select poll_id,poll_options_id,poll_subject from poll where poll_subject=$1 ", [poll_subject,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    searchOptionId: function () {
        return new Promise((resolve, reject) => {
            db.query("select poll_options_id from poll_options order by poll_options_id DESC limit 1 ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getPollById: function (poll_id) {
        return new Promise((resolve, reject) => {
            db.query("select po.poll_options_id,po.option_index,pc.poll_cat_id,pc.poll_category_name,p.admin_id,p.poll_id,u.image_path,u.f_name,u.l_name,p.poll_subject,p.start_date,p.end_date,p.question_type,po.option_name,p.is_disable from users u inner join poll as p on u.user_id = p.admin_id inner join poll_options as po on po.poll_options_id=p.poll_options_id inner join poll_category as pc on pc.poll_cat_id=p.poll_cat_id where p.poll_id=$1 AND p.poll_active_status='active' order by po.option_index ASC", [poll_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getUserAnswerVote: function (user_id, poll_id) {
        return new Promise((resolve, reject) => {
            db.query("select p.answer_vote from poll p where p.main_poll_id =$2 and p.admin_id =$1 and p.poll_active_status ='active'", [user_id, poll_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    addPollOptions: function (options_id, answer_choice, callback) {
        for (var i = 1; i < answer_choice.length + 1; i++) {
            db.query("INSERT INTO poll_options(poll_options_id,option_index,option_name) values($1,$2,$3) returning poll_options_id,option_index", [options_id, i, answer_choice[i - 1],], callback);
        }
    },

    addPollData: function (poll_subject, poll_options_id, start_date, end_date, user_id, question_type, poll_cat_id, callback) {
        let submission_date = moment().format("YYYY-MM-DD HH:mm:ss")
        let date_ob = new Date();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let d_start_date = moment(start_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
        let d_end_date = moment(end_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
        db.query("INSERT INTO poll(poll_subject,poll_options_id,start_date,end_date,admin_id,submission_date,question_type,poll_cat_id,poll_answer) SELECT $1,$2,$3,$4,$5,$6,$7,$8,'poll' WHERE NOT EXISTS (SELECT 1 FROM poll WHERE poll_options_id=$2) returning poll_id", [poll_subject, poll_options_id, d_start_date, d_end_date, user_id, submission_date, question_type, poll_cat_id], callback);
    },
    deletePoll: function (poll_id) {
        return new Promise((resolve, reject) => {
            db.query("update poll set poll_active_status='deleted' where poll_id=$1 returning poll_id", [poll_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteData: function (poll_id) {
        return new Promise((resolve, reject) => {
            db.query("delete from poll_options where poll_options_id=$1 returning poll_options_id", [poll_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updatePollOptions: function (answer_choice, poll_options_id,) {
        return new Promise((resolve, reject) => {
            for (var i = 1; i < answer_choice.length + 1; i++) {
                db.query("INSERT INTO poll_options(poll_options_id,option_index,option_name) values($1,$2,$3) returning poll_options_id,option_index", [poll_options_id, i, answer_choice[i - 1],], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            }
        });
    },

    updatePoll: function (poll_id, start_date, start_date_flag, end_date, end_date_flag, user_id, is_disable) {
        return new Promise((resolve, reject) => {
            var d = new Date();
            let hours = d.getHours();
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();
            if ((start_date_flag == true || start_date_flag == 'true') && (end_date_flag == true || end_date_flag == 'true')) {
                var new_sdate = moment(start_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
                var new_edate = moment(end_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
                db.query("update poll set start_date=$3,end_date=$4,is_disable=$5 where poll_id=$1 AND admin_id=$2 returning poll_id", [poll_id, user_id, new_sdate, new_edate, is_disable,], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            } else if (start_date_flag == true || start_date_flag == 'true') {
                var new_start_date = moment(start_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
                db.query("update poll set start_date=$3,is_disable=$4 where poll_id=$1 AND admin_id=$2 returning poll_id", [poll_id, user_id, new_start_date, is_disable,], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            } else if (end_date_flag == true || end_date_flag == 'true') {
                var new_end_date = moment(end_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
                db.query("update poll set end_date=$3,is_disable=$4 where poll_id=$1 AND admin_id=$2 returning poll_id", [poll_id, user_id, new_end_date, is_disable,], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            } else {
                db.query("update poll set is_disable=$3 where poll_id=$1 AND admin_id=$2 returning poll_id", [poll_id, user_id, is_disable,], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            }
        });
    },

    pollCategory: function () {
        return new Promise((resolve, reject) => {
            db.query("select * from poll_category order by poll_category_name ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    mostTrendingPoll: function (offset) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("YYYY-MM-DD")
            let past_date = moment().subtract(1, 'months').format('YYYY-MM-DD')
            db.query("select (select count(p2.poll_id) as total_rows from poll p2 inner join users u2 on u2.user_id = p2.admin_id where (p2.poll_status='Active') and p2.poll_answer ='poll' and u2.is_admin =true and u2.citizen_status ='active' and p2.poll_active_status='active' and p2.is_disable='false' and date(p.start_date) BETWEEN $1 and '2022-01-07'),subqueryI.vote,u.f_name,u.l_name,u.image_path,pc.poll_cat_id,pc.poll_category_name, p.poll_id,p.poll_topic_id,p.title,p.poll_subject,p.poll_options_id,p.start_date,p.end_date, p.submission_date, p.admin_id,p.question_type,p.poll_status,p.is_disable,p.poll_active_status from users u inner join poll p on u.user_id=p.admin_id inner join poll_category pc on p.poll_cat_id=pc.poll_cat_id inner join poll_options po on po.poll_options_id =p.poll_options_id left join (select main_poll_id, COUNT(answer_vote) as vote from poll where main_poll_id is not null and answer_vote_status='active' GROUP BY main_poll_id) subqueryI on(p.poll_id = subqueryI.main_poll_id ) where poll_active_status='active' and poll_status='Active' and (date(p.start_date) BETWEEN $1 and $2) group by u.f_name,u.l_name, u.image_path,pc.poll_cat_id,pc.poll_category_name,p.poll_id,p.poll_topic_id,p.title,p.poll_subject, p.poll_options_id,p.start_date,p.end_date,p.submission_date,p.admin_id,p.question_type,p.poll_status, p.is_disable,p.poll_active_status,subqueryI.vote order by vote desc nulls last LIMIT $3", [past_date, today_date, offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    mostTDiscussPoll: function (offset) {
        return new Promise((resolve, reject) => {
            db.query("select (select count(p2.poll_id) as total_rows from poll p2 inner join users u2 on u2.user_id = p2.admin_id where (p2.poll_status='Active') and p2.poll_answer ='poll' and u2.is_admin =true and u2.citizen_status ='active' and p2.poll_active_status='active' and p2.is_disable='false' ),subqueryI.vote,u.f_name,u.l_name,u.image_path,pc.poll_cat_id, pc.poll_category_name,p.poll_id, p.poll_topic_id,p.title,p.poll_subject,p.poll_options_id, p.start_date,p.end_date,p.submission_date,p.admin_id, p.question_type, p.poll_status,p.is_disable,p.poll_active_status from users u inner join poll p on u.user_id=p.admin_id inner join poll_category pc on p.poll_cat_id=pc.poll_cat_id inner join poll_options po on po.poll_options_id =p.poll_options_id left join (select main_poll_id, COUNT(answer_vote) as vote from poll where main_poll_id is not null and answer_vote_status='active' GROUP BY main_poll_id) subqueryI on(p.poll_id = subqueryI.main_poll_id ) where poll_active_status='active' and poll_status='Active' and p.start_date<=current_timestamp group by u.f_name,u.l_name, u.image_path,pc.poll_cat_id, pc.poll_category_name,p.poll_id,p.poll_topic_id,p.title,p.poll_subject,p.poll_options_id, p.start_date,p.end_date,p.submission_date,p.admin_id,p.question_type, p.poll_status, p.is_disable,p.poll_active_status,subqueryI.vote order by vote desc nulls last limit $1;", [offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },


    getPollVoteCount: function (db_poll_id, callback) {
        for (var i = 0; i < db_poll_id.length; i++) {
            db.query("select main_poll_id,coalesce(COUNT(answer_vote),0) as votes from poll where main_poll_id=$1 and poll_active_status='active' GROUP by main_poll_id", [db_poll_id[i]], callback);
        }
    },

    VotePollData: function (poll_data, answer_arr, db_poll_options_id) {
        return new Promise((resolve, reject) => {
            let submission_date = moment().format("YYYY-MM-DD hh:mm");
            db.query("INSERT INTO poll(admin_id,submission_date,answer_vote,main_poll_id,poll_options_id,poll_answer) values($1,$2,CAST($3 as varchar),$4,$5,'answer') returning poll_id", [poll_data.user_id, submission_date, answer_arr, poll_data.poll_id, db_poll_options_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    CheckDuplicateVote: function (poll_id, user_id) {
        return new Promise((resolve, reject) => {
            db.query("select poll_id from poll where main_poll_id=$1 AND admin_id=$2 and answer_vote_status='active' ", [poll_id, user_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    logVoteCount: function (poll_options_id,option_index) {
        return new Promise((resolve, reject) => {
                db.query("update poll_options set vote_count=vote_count+1 where poll_options_id=$1 AND option_index=$2 returning option_index ", [poll_options_id,option_index], (error, results) => {
                    if (error) return reject(error);    
                    return resolve(results);   
                });  
        });
    },

    updateIsReactive: function (poll_id) {
        return new Promise((resolve, reject) => {
            db.query("update poll set is_poll_reactivate ='false' where poll_id=$1 ", [poll_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    setCounterZero: function (poll_id) {
        return new Promise((resolve, reject) => {
            db.query("update poll_options as po set vote_count =0 from poll as p where p.is_poll_reactivate=true and po.poll_options_id =p.poll_options_id and p.poll_id=$1 returning po.poll_options_id", [poll_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    setResetVoteAsDelete: function (d_poll_options_id, poll_id) {
        return new Promise((resolve, reject) => {
            db.query("update poll p set answer_vote_status ='deleted' where p.poll_options_id =$1 and p.main_poll_id =$2 ", [d_poll_options_id, poll_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    setActiveStatusFalse: function () {
        return new Promise((resolve, reject) => {
            db.query("update poll set is_poll_reactivate='false' where poll_status='Active' ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    PollAnalytics: function (poll_id) {
        return new Promise((resolve, reject) => {
            db.query("select p.poll_id ,p.submission_date ,p.poll_subject,p.start_date,p.end_date,po.option_index ,po.option_name ,po.vote_count from poll p inner join poll_options po on po.poll_options_id = p.poll_options_id where p.poll_id =$1 order by po.option_index ", [poll_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    searchPollData: function (search_text) {
        return new Promise((resolve, reject) => {
            db.query("select p.poll_id,SUM (vote_count) AS vote,pc.poll_cat_id, pc.poll_category_name,p.admin_id,p.main_poll_id,p.poll_options_id,p.poll_subject,u.image_path,u.f_name,u.l_name,p.submission_date,p.poll_status,p.start_date,p.end_date from users u inner join poll p on u.user_id = p.admin_id inner join poll_category pc on p.poll_cat_id=pc.poll_cat_id inner join poll_options po on po.poll_options_id =p.poll_options_id where (p.poll_status='Active') AND poll_active_status='active' and is_disable='false' and p.start_date<=current_timestamp  and current_timestamp <=p.end_date and (p.poll_subject || ' ' || u.f_name || ' ' || u.l_name || ' ' || pc.poll_category_name) ilike $1 group by p.poll_id ,pc.poll_cat_id, pc.poll_category_name,p.admin_id,p.main_poll_id,p.poll_options_id,p.poll_subject,u.image_path,u.f_name,u.l_name,p.submission_date,p.poll_status,p.start_date,p.end_date order by p.start_date desc", [`%${search_text}%`,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};

module.exports = UserTask;