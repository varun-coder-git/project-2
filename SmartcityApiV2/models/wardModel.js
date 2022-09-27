const db = require('../config/dbConnection'); //reference of dbconnection.js

const UserTask= {

    getAllWards: function () {
        return new Promise((resolve, reject) => {
            db.query("Select * from ward where ward_status='active'", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateWard: function (ward_id,ward_name) {
        return new Promise((resolve, reject) => {
            db.query("update ward set ward_name=$1 where ward_id=$2 AND ward_status='active' returning ward_id", [ward_name,ward_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    addNewWard: function (ward_name) {
        return new Promise((resolve, reject) => {
            db.query("insert into ward(ward_name,ward_status) values($1,'active') returning ward_id", [ward_name], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteWard: function (ward_id) {
        return new Promise((resolve, reject) => {
            db.query("update ward set ward_status='deleted' where ward_id=$1 returning ward_id", [ward_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    topPerformingWard: function(callback){
        db.query("SELECT w.ward_name,c.ward_id,COUNT (c.complaint_status_id) closed_complaint_count FROM complaints c inner JOIN complaint_status cs ON c.complaint_status_id = cs.complaint_status_id inner JOIN ward w on w.ward_id=c.ward_id where cs.status_name='Closed' AND c.complaint_comment ='complaint' and c.active_delete ='active' GROUP BY c.ward_id,w.ward_name order by closed_complaint_count desc,ward_name ASC limit 3",[],callback);
    },

    topPerformingWard: function () {
        return new Promise((resolve, reject) => {
            db.query("SELECT w.ward_name,c.ward_id,COUNT (c.complaint_status_id) closed_complaint_count FROM complaints c inner JOIN complaint_status cs ON c.complaint_status_id = cs.complaint_status_id inner JOIN ward w on w.ward_id=c.ward_id where cs.status_name='Closed' AND c.complaint_comment ='complaint' and c.active_delete ='active' GROUP BY c.ward_id,w.ward_name order by closed_complaint_count desc,ward_name ASC limit 3", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    wardsNeedImprovement: function () {
        return new Promise((resolve, reject) => {
            db.query("SELECT w.ward_name,c.ward_id,COUNT (c.complaint_status_id) closed_complaint_count FROM complaints c inner JOIN complaint_status cs ON c.complaint_status_id = cs.complaint_status_id inner JOIN ward w on w.ward_id=c.ward_id where cs.status_name='Closed' AND c.complaint_comment ='complaint' and c.active_delete ='active'GROUP BY c.ward_id,w.ward_name order by closed_complaint_count asc,ward_name asc limit 3", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    topWardchart: function () {
        return new Promise((resolve, reject) => {
            db.query("SELECT w.ward_name,c.ward_id,COUNT (c.complaint_status_id) closed_complaint_count FROM complaints c inner JOIN complaint_status cs ON c.complaint_status_id = cs.complaint_status_id inner JOIN ward w on w.ward_id=c.ward_id where cs.status_name='Closed' AND c.complaint_comment ='complaint' and c.active_delete ='active' GROUP BY c.ward_id,w.ward_name order by closed_complaint_count desc,ward_name ASC limit 5", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    lessWardchart: function () {
        return new Promise((resolve, reject) => {
            db.query("SELECT w.ward_name,c.ward_id,COUNT (c.complaint_status_id) closed_complaint_count FROM complaints c inner JOIN complaint_status cs ON c.complaint_status_id = cs.complaint_status_id inner JOIN ward w on w.ward_id=c.ward_id where cs.status_name='Closed' AND c.complaint_comment ='complaint' and c.active_delete ='active'GROUP BY c.ward_id,w.ward_name order by closed_complaint_count asc,ward_name asc limit 5", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

};

module.exports = UserTask;