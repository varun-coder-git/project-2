const db = require('../config/dbConnection'); //reference of dbconnection.js
var moment = require('moment');

const WhatsTrendingTask = {
    getWhatsTrendingCount: function () {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("YYYY-MM-DD")
            let past_date = moment().subtract(1, 'months').format('YYYY-MM-DD')
            db.query("select i.thread_id id ,subqueryI.countOfChild as countOfChild ,i.subject title,i.user_id as admin_id,i.user_id as poll_options_id,i.body description ,i.created_date created_date,i.idea_comment type_data from ideas i join status_master sm on sm.status_id = i.status left join (select  main_thread_id ,count(thread_id) as countOfChild from ideas where main_thread_id is not null and status=1 group by main_thread_id ) subqueryI on(i.thread_id = subqueryI.main_thread_id ) where status=1 and (date(i.created_date) between $1 and $2) and i.subject is not null union select p.poll_id,SUM (vote_count) AS countOfChild ,p.title,p.admin_id ,p.poll_options_id ,p.poll_subject,p.submission_date,p.poll_answer from poll p inner join poll_options po on po.poll_options_id =p.poll_options_id where p.poll_active_status='active' and p.poll_status='Active' and (date(p.submission_date) between $1 and $2 ) group by p.poll_id,p.title,p.poll_subject,p.submission_date union select v2.volunteer_id, subqueryI2.countOfChild ,v2.title,v2.volunteer_cat_id ,v2.volunteer_cat_id ,v2.description,v2.registration_date,v2.volunteer_comment from volunteers v2 left join (select  main_volunteer_id ,count(comment) as countOfChild from volunteers where main_volunteer_id is not null AND comment_status='false' GROUP BY main_volunteer_id  ) subqueryI2 on(v2.volunteer_id = subqueryI2.main_volunteer_id ) where  (date(v2.registration_date) BETWEEN $1 and $2) and v2.volunteer_account ='active' and v2.volunteer_comment ='volunteer'order by countOfChild desc nulls last ", [past_date, today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getWhatsTrendingDetails: function (offset) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("YYYY-MM-DD")
            let past_date = moment().subtract(1, 'months').format('YYYY-MM-DD')
            db.query("select i.thread_id id ,subqueryI.countOfChild as countOfChild ,i.subject title,i.user_id as admin_id,i.user_id as poll_options_id,i.body description ,i.created_date created_date,i.idea_comment type_data from ideas i join status_master sm on sm.status_id = i.status left join (select  main_thread_id ,count(thread_id) as countOfChild from ideas where main_thread_id is not null and status=1 group by main_thread_id ) subqueryI on(i.thread_id = subqueryI.main_thread_id ) where status=1 and (date(i.created_date) between $2 and $3) and i.subject is not null union select p.poll_id,SUM (vote_count) AS countOfChild ,p.title,p.admin_id ,p.poll_options_id ,p.poll_subject,p.submission_date,p.poll_answer from poll p inner join poll_options po on po.poll_options_id =p.poll_options_id where p.poll_active_status='active' and p.poll_status='Active' and (date(p.submission_date) between $2 and $3 ) group by p.poll_id,p.title,p.poll_subject,p.submission_date union select v2.volunteer_id, subqueryI2.countOfChild ,v2.title,v2.volunteer_cat_id ,v2.volunteer_cat_id ,v2.description,v2.registration_date,v2.volunteer_comment from volunteers v2 left join (select  main_volunteer_id ,count(comment) as countOfChild from volunteers where main_volunteer_id is not null AND comment_status='false' GROUP BY main_volunteer_id  ) subqueryI2 on(v2.volunteer_id = subqueryI2.main_volunteer_id ) where  (date(v2.registration_date) BETWEEN $2 and $3) and v2.volunteer_account ='active' and v2.volunteer_comment ='volunteer'order by countOfChild desc nulls last,created_date desc,description asc limit $1", [offset, past_date, today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};

module.exports = WhatsTrendingTask;