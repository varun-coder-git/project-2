const db = require('../config/dbConnection'); //reference of dbconnection.js
var moment = require('moment');

const DonutTask = {
    getDonutDetails: function (calender_period) {
        let StartOfYear = moment().startOf('year').format('YYYY-MM-DD');
        let startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        var StartOfWeek = moment().day('Monday').format('YYYY-MM-DD');
        let today_date = moment().format("YYYY-MM-DD ")

        if (calender_period == 1 || calender_period == '1') {
            return new Promise((resolve, reject) => {
                db.query("select 'Complaints' AS label ,count(complaint) from complaints c where DATE(c.submission_date) BETWEEN $1 and $2 and c.active_delete ='active' and c.complaint is not null and c.ward_id is not null union select 'Incidents' as incident ,count(title) from incident i where DATE(i.reported_date) BETWEEN $1 and $2 and i.incident_active_delete ='active' and i.title is not null union select 'Polls' AS poll,count(p.poll_subject) from poll p where DATE(p.submission_date) BETWEEN $1 and $2 and p.poll_subject is not null and p.poll_active_status ='active' union select 'Ideas' AS ideas,count(i2.subject) from ideas i2 join idea_category ic on i2.idea_cat_id=ic.idea_cat_id join status_master sm on sm.status_id = i2.status join users u on i2.user_id =u.user_id join ward w on u.ward_id=w.ward_id where DATE(i2.created_date) BETWEEN $1 and $2 and i2.subject is not null and i2.status ='1' union select 'Volunteer Activity' AS volunteer_Activity,count(v.volunteer_comment) from volunteers v where DATE(v.registration_date) BETWEEN $1 and $2 and v.title is not null and v.volunteer_comment='volunteer' and v.volunteer_account ='active' union select 'Feedbacks' AS feedbacks,( SELECT COUNT(*) from complaints c where DATE(c.feedback_submission_date) BETWEEN $1 and $2 and c.active_delete='active' and c.feedback_status ='active')+(select count(*) from incident i where DATE(i.feedback_submission_date) BETWEEN $1 and $2 and i.incident_active_delete ='active' and i.feedback_status='active') order by label", [StartOfWeek, today_date], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            })
        }
        else if (calender_period == 2 || calender_period == '2') {
            return new Promise((resolve, reject) => {
                db.query("select 'Complaints' AS label ,count(complaint) from complaints c where DATE(c.submission_date) BETWEEN $1 and $2 and c.active_delete ='active' and c.complaint is not null and c.ward_id is not null union select 'Incidents' as incident ,count(title) from incident i where DATE(i.reported_date) BETWEEN $1 and $2 and i.incident_active_delete ='active' and i.title is not null union select 'Polls' AS poll,count(p.poll_subject) from poll p where DATE(p.submission_date) BETWEEN $1 and $2 and p.poll_subject is not null and p.poll_active_status ='active' union select 'Ideas' AS ideas,count(i2.subject) from ideas i2 join idea_category ic on i2.idea_cat_id=ic.idea_cat_id join status_master sm on sm.status_id = i2.status join users u on i2.user_id =u.user_id join ward w on u.ward_id=w.ward_id where DATE(i2.created_date) BETWEEN $1 and $2 and i2.subject is not null and i2.status ='1' union select 'Volunteer Activity' AS volunteer_Activity,count(v.volunteer_comment) from volunteers v where DATE(v.registration_date) BETWEEN $1 and $2 and v.title is not null and v.volunteer_comment='volunteer' and v.volunteer_account ='active' union select 'Feedbacks' AS feedbacks,( SELECT COUNT(*) from complaints c where DATE(c.feedback_submission_date) BETWEEN $1 and $2 and c.active_delete='active' and c.feedback_status ='active')+(select count(*) from incident i where DATE(i.feedback_submission_date) BETWEEN $1 and $2 and i.incident_active_delete ='active' and i.feedback_status='active') order by label ", [startOfMonth, today_date], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            })
        }
        else if (calender_period == 3 || calender_period == '3') {
            return new Promise((resolve, reject) => {
                db.query("select 'Complaints' AS label ,count(complaint) from complaints c where DATE(c.submission_date) BETWEEN $1 and $2 and c.active_delete ='active' and c.complaint is not null and c.ward_id is not null union select 'Incidents' as incident ,count(title) from incident i where DATE(i.reported_date) BETWEEN $1 and $2 and i.incident_active_delete ='active' and i.title is not null union select 'Polls' AS poll,count(p.poll_subject) from poll p where DATE(p.submission_date) BETWEEN $1 and $2 and p.poll_subject is not null and p.poll_active_status ='active' union select 'Ideas' AS ideas,count(i2.subject) from ideas i2 join idea_category ic on i2.idea_cat_id=ic.idea_cat_id join status_master sm on sm.status_id = i2.status join users u on i2.user_id =u.user_id join ward w on u.ward_id=w.ward_id where DATE(i2.created_date) BETWEEN $1 and $2 and i2.subject is not null and i2.status ='1' union select 'Volunteer Activity' AS volunteer_Activity,count(v.volunteer_comment) from volunteers v where DATE(v.registration_date) BETWEEN $1 and $2 and v.title is not null and v.volunteer_comment='volunteer' and v.volunteer_account ='active' union select 'Feedbacks' AS feedbacks,( SELECT COUNT(*) from complaints c where DATE(c.feedback_submission_date) BETWEEN $1 and $2 and c.active_delete='active' and c.feedback_status ='active')+(select count(*) from incident i where DATE(i.feedback_submission_date) BETWEEN $1 and $2 and i.incident_active_delete ='active' and i.feedback_status='active') order by label ", [StartOfYear, today_date], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            })
        }
    },
};

module.exports = DonutTask;
