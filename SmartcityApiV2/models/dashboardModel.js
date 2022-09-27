const db = require('../config/dbConnection'); //reference of dbconnection.js
var moment=require('moment');

const DashboardTask = {    

    getMarkers: function () {
        return new Promise((resolve, reject) => {
            db.query("select * from map_markers ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getDashboardComplaint: function () {
        return new Promise((resolve, reject) => {
            db.query("select cs.status_name ,mm.marker_path path,c.thread_id id,c.subject title ,c.complaint description, c.latitude ,c.longitude ,c.address,c.complaint_comment type_data from complaints c inner join map_markers mm on mm.marker_type =c.complaint_comment inner join complaint_status cs on cs.complaint_status_id =c.complaint_status_id where c.active_delete ='active' and c.complaint_comment ='complaint' and (cs.complaint_status_id =1 or cs.complaint_status_id=5) ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getDashboardIncident: function () {
        return new Promise((resolve, reject) => {
            db.query("select is2.incident_status_type ,mm.marker_path path,i.incident_id id,i.title title ,i.description description,i.latitude,i.longitude ,i.address, i.incident_comment type_data from incident i inner join map_markers mm on mm.marker_type =i.incident_comment inner join incident_status is2 on is2.incident_status_id =i.incident_status_id where i.incident_active_delete='active' and i.incident_comment ='incident' and is2.incident_status_id=1", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};

module.exports = DashboardTask;