const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');
const UserTask = {

    getVolunteerForm: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select f_name,l_name,email,phone_number[array_length(phone_number, 1)] from users where user_id=$1 AND volunteer_account='active'", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    addVolunteer: function (user_id, title, start_date, end_date, category, description, latitude, longitude, address, share_location_flag, callback) {
        let current_time = moment().format("YYYY-MM-DD HH:mm:ss")
        var d = new Date();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let seconds = d.getSeconds();
        let d_start_date = moment(start_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
        let d_end_date = moment(end_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
        db.query("insert into volunteers(user_id,title,start_date,end_date,volunteer_cat_id,description,registration_date,volunteer_comment,latitude,longitude,address,share_location_flag) values($1,$2,$3,$4,$5,$6,$7,'volunteer',$8,$9,$10,$11) returning volunteer_id", [user_id, title, d_start_date, d_end_date, category, description, current_time, latitude, longitude, address, share_location_flag], callback);
    },

    VolunteerStatus: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select vn.volunteer_id,vn.volunteer_cat_id,vc.category_name,vn.volunteer_status,vc.category_status from volunteers vn full outer join volunteer_category vc on vn.volunteer_cat_id = vc.volunteer_cat_id where user_id = $1 AND (vn.volunteer_status='pending' OR vn.volunteer_status='accepted') AND vc.category_status='active'", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    cancelVolunteerStatus: function (volunteer_id) {
        return new Promise((resolve, reject) => {
            db.query("update volunteers set volunteer_status='cancel' where volunteer_id=$1 returning user_id ", [volunteer_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getAllVolunteer: function (offset) {
        return new Promise((resolve, reject) => {
            db.query("select subqueryI.comment as comments ,(select count(v2.volunteer_id) as total_rows from volunteers v2 inner join users u2 on v2.user_id=u2.user_id where v2.volunteer_account ='active' and v2.volunteer_comment='volunteer' and u2.is_admin='false'  and u2.citizen_status='active'),vn.start_date,vn.end_date,vn.title,vn.description, vn.registration_date,vn.user_id,vn.volunteer_id,vn.volunteer_account,vc.category_name,vn.volunteer_cat_id, u.f_name,u.l_name,u.image_path,vc.category_status from volunteers vn inner join users u on vn.user_id = u.user_id inner join volunteer_category as vc on vn.volunteer_cat_id = vc.volunteer_cat_id left join (select main_volunteer_id ,count(comment) as comment from volunteers v where v.main_volunteer_id is not null and v.comment is not null and v.comment_status='false' group by v.main_volunteer_id ) subqueryI on(vn.volunteer_id = subqueryI.main_volunteer_id ) where vc.category_status='active' AND vn.volunteer_account='active' and vn.volunteer_comment ='volunteer' and u.is_admin =false  and u.citizen_status ='active' order by vn.registration_date DESC limit $1", [offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateVolunteerStatus: function (volunteer_id, volunteer_status, admin_id) {
        return new Promise((resolve, reject) => {
            db.query("update volunteers set volunteer_status=$1,approver_admin_id=$2 where volunteer_id=$3 returning volunteer_id", [volunteer_status, admin_id, volunteer_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    checkVolunteerDate: function (volunteer_id) {
        return new Promise((resolve, reject) => {
            db.query("select start_date,end_date from volunteers where volunteer_id=$1", [volunteer_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateVolunteerInfo: function (volunteer_id, about_text) {
        return new Promise((resolve, reject) => {
            db.query("update volunteers set about_text=$1 where volunteer_id=$2 returning volunteer_id", [about_text, volunteer_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteVolunteer: function (volunteer_id) {
        return new Promise((resolve, reject) => {
            db.query("update volunteers set volunteer_account='deleted' where volunteer_id=$1 returning volunteer_id", [volunteer_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    addVolunteerCategory: function (category_name) {
        return new Promise((resolve, reject) => {
            db.query("insert into volunteer_category(category_name) values($1) returning volunteer_cat_id", [category_name], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getVolunteerCategory: function () {
        return new Promise((resolve, reject) => {
            db.query("select volunteer_cat_id,category_name from volunteer_category order by category_name ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateVolunteerCategory: function (volunteer_cat_id, category_name) {
        return new Promise((resolve, reject) => {
            db.query("update volunteer_category set category_name=$2 where volunteer_cat_id=$1 returning volunteer_cat_id ", [volunteer_cat_id, category_name,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteVolunteerCategory: function (volunteer_cat_id) {
        return new Promise((resolve, reject) => {
            db.query("update volunteer_category set category_status='deleted' where volunteer_cat_id=$1 returning volunteer_cat_id", [volunteer_cat_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    mostTrendingVolunteer: function (offset) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            let past_date = moment().subtract(1, 'months').format('DD-MMM-YYYY HH:mm')
            db.query("select subqueryI.countOfChild as comments ,(select count(v2.volunteer_id) as total_rows from volunteers v2 inner join users u2 on v2.user_id=u2.user_id where v2.volunteer_account ='active' and v2.volunteer_comment='volunteer' and u2.is_admin='false'  and u2.citizen_status='active' and (DATE(v2.registration_date) BETWEEN $1 and $2)), u.f_name,u.l_name,u.image_path,v.volunteer_id, v.user_id,v.registration_date, v.title,v.start_date,v.end_date,v.description, vc.category_name from users u inner join volunteers v on u.user_id=v.user_id inner join volunteer_category vc on v.volunteer_cat_id=vc.volunteer_cat_id left join (select main_volunteer_id , count(comment) as countOfChild from volunteers where main_volunteer_id is not null AND comment_status='false' GROUP BY main_volunteer_id ) subqueryI on(v.volunteer_id = subqueryI.main_volunteer_id ) where (DATE(v.registration_date) BETWEEN $1 and $2) and v.volunteer_account ='active' and u.is_admin='false' and u.citizen_status='active' and v.volunteer_comment ='volunteer' order by subqueryI.countOfChild desc nulls last limit $3", [past_date, today_date, offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    mostDiscussVolunteer: function (offset) {
        return new Promise((resolve, reject) => {
            db.query("select subqueryI.countOfChild as comments ,(select count(v2.volunteer_id) as total_rows from volunteers v2 inner join users u2 on v2.user_id=u2.user_id where v2.volunteer_account ='active' and v2.volunteer_comment='volunteer' and u2.is_admin='false'  and u2.citizen_status='active'), u.f_name,u.l_name,u.image_path,v.volunteer_id,v.user_id, v.registration_date, v.title,v.start_date,v.end_date,v.description, vc.category_name from users u inner join volunteers v on u.user_id=v.user_id inner join volunteer_category vc on v.volunteer_cat_id=vc.volunteer_cat_id left join (select main_volunteer_id , count(comment) as countOfChild from volunteers where main_volunteer_id is not null AND comment_status='false' GROUP BY main_volunteer_id ) subqueryI on(v.volunteer_id = subqueryI.main_volunteer_id ) where v.volunteer_account ='active' and v.volunteer_comment ='volunteer' and u.is_admin='false' and  u.citizen_status='active' order by subqueryI.countOfChild desc nulls last limit $1", [offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getVolunteerIdData: function (volunteer_id) {
        return new Promise((resolve, reject) => {
            db.query("select count(vm.volunteer_media_id) as media_count,v.volunteer_cat_id,v.share_location_flag,v.latitude,v.longitude,vm.volunteer_media_id ,v.address,w.ward_id ,w.ward_name ,subqueryI.comment_count,vm.file_name,u.user_id,u.is_admin,u.f_name,u.l_name,u.image_path, v.volunteer_id,v.registration_date,v.start_date, v.end_date,v.title,v.description,vc.category_name from users u inner join ward w on w.ward_id =u.ward_id inner join volunteers v on u.user_id=v.user_id inner join volunteer_category vc on vc.volunteer_cat_id=v.volunteer_cat_id left join volunteer_media vm on vm.volunteer_id =v.volunteer_id left join (select main_volunteer_id, COUNT(main_volunteer_id) as comment_count from volunteers where comment_status='false' GROUP by main_volunteer_id) subqueryI on(v.volunteer_id = subqueryI.main_volunteer_id ) where v.volunteer_id=$1 group by vm.volunteer_media_id,v.address,w.ward_id ,w.ward_name ,subqueryI.comment_count,vm.file_name,u.user_id,u.is_admin,u.f_name,u.l_name,u.image_path,v.volunteer_id,v.registration_date,v.start_date, v.end_date,v.title,v.description,vc.category_name,v.latitude,v.longitude", [volunteer_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getVolunteerCommentData: function (volunteer_id, offset) {
        return new Promise((resolve, reject) => {
            db.query("select u.login_type,u.user_id,u.f_name,u.l_name,u.is_admin ,u.image_path,v.volunteer_id,v.registration_date,v.comment from users u inner join volunteers v on u.user_id=v.user_id  where v.main_volunteer_id=$1 and v.comment_status='false' order by v.volunteer_id  DESC limit $2", [volunteer_id, offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    addVolunteerComment: function (user_id, comment, volunteer_id) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm:ss")
            db.query("insert into volunteers(user_id,registration_date,comment,main_volunteer_id,volunteer_comment,comment_status) values($1,$2,$3,$4,'comment','false') returning volunteer_id", [user_id, today_date, comment, volunteer_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteVolunteerComment: function (volunteer_id) {
        return new Promise((resolve, reject) => {
            db.query("update volunteers set comment_status='true' where volunteer_id=$1 returning volunteer_id ", [volunteer_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    insertVolunteerMedia: function (volunteer_id, DB1_path, callback) {
        db.query("insert into volunteer_media(volunteer_id,file_name) values($1,$2) returning volunteer_id", [volunteer_id, DB1_path], callback);
    },

    updateVolunteerMedia: function (volunteer_media_id, DB1_path,) {
        return new Promise((resolve, reject) => {
            db.query("update volunteer_media set file_name=$2 where volunteer_media_id=$1 returning volunteer_media_id", [volunteer_media_id, DB1_path], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateVolunteerData: function (volunteer_id, start_date, end_date, description, latitude, longitude, address, share_location_flag) {
        return new Promise((resolve, reject) => {
            var d = new Date();
            let hours = d.getHours();
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();
            let d_start_date = moment(start_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
            let d_end_date = moment(end_date).format('YYYY-MM-DD') + " " + hours + ":" + minutes + ":" + seconds;
            db.query("update volunteers set start_date=$2,end_date=$3,description=$4,latitude=$5,longitude=$6,address=$7,share_location_flag=$8 where volunteer_id=$1 returning volunteer_id", [volunteer_id, d_start_date, d_end_date, description, latitude, longitude, address, share_location_flag,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    searchVolunteerData: function (search_text) {
        return new Promise((resolve, reject) => {
            db.query("select subqueryI.comment as comments ,vn.start_date,vn.end_date,vn.title,vn.description,vn.registration_date,vn.user_id,vn.volunteer_id,vn.volunteer_account,vc.category_name,vn.volunteer_cat_id,u.f_name,u.l_name,u.image_path,vc.category_status from volunteers vn inner join users u on vn.user_id = u.user_id inner join volunteer_category as vc on vn.volunteer_cat_id = vc.volunteer_cat_id left join (select  main_volunteer_id ,count(comment) as comment from volunteers v where v.main_volunteer_id is not null and v.comment is not null and v.comment_status='false' group by v.main_volunteer_id ) subqueryI on(vn.volunteer_id = subqueryI.main_volunteer_id ) where vc.category_status='active' AND vn.volunteer_account='active' and(vn.title || ' ' || vn.description || ' ' || u.f_name || ' ' || u.l_name || ' ' || vc.category_name) ilike $1 order by vn.registration_date desc", [`%${search_text}%`,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getAdminVolunteer: function () {
        return new Promise((resolve, reject) => {
            db.query("select w.ward_id ,w.ward_name ,v.volunteer_id ,v.title ,v.registration_date ,vc.volunteer_cat_id,vc.category_name from volunteers v inner join users u on u.user_id =v.user_id inner join ward w on w.ward_id =u.ward_id inner join volunteer_category vc on vc.volunteer_cat_id =v.volunteer_cat_id where v.volunteer_comment ='volunteer' and v.volunteer_account='active' and v.title is not null and u.citizen_status ='active' order by w.ward_name asc ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

};

module.exports = UserTask;