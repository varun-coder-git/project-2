const db = require('../config/dbConnection'); //reference of dbconnection.js

const UserTask = {
    facility_count: function () {
        return new Promise((resolve, reject) => {
            db.query("SELECT l.location_category_id,lc.facility_type,lc.facility_icon_path,COUNT(l.location_category_id) item_count FROM locations l inner JOIN location_category lc ON l.location_category_id = lc.location_category_id where location_status='active' GROUP BY l.location_category_id,lc.facility_type,lc.facility_icon_path order by l.location_category_id", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getFacilityLocation: function () {
        return new Promise((resolve, reject) => {
            db.query("select l.location_id,l.facility_name,l.location_category_id,l.latitude,l.longitude,lc.facility_type from locations l inner join location_category lc on l.location_category_id = lc.location_category_id where location_status='active' and lc.facility_type_status='active' order by l.location_id DESC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    checkDuplicateUpdate: function (facility_name,location_category_id,lat,long) {
        return new Promise((resolve, reject) => {
            db.query("select location_id,facility_name,location_category_id from locations where facility_name=$1 AND location_category_id=$2 AND latitude=$3 AND longitude=$4",[facility_name,location_category_id,lat,long,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    
    updateLocation: function (location_id,long, lat, location_category_id,facility_name) {
        return new Promise((resolve, reject) => {
            db.query("update locations set location_category_id=$1,facility_name=$2,longitude=$3,latitude=$4 where location_id=$5 AND location_status='active' returning location_id",[ location_category_id,facility_name,long, lat,location_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    facilityLocation: function (location_category_id, facility_name, longitude, latitude) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO locations(location_category_id, facility_name, longitude, latitude,location_status) values($1,$2,$3,$4,'active') returning location_id",[location_category_id,facility_name,longitude,latitude], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteFacility: function (location_id) {
        return new Promise((resolve, reject) => {
            db.query("update locations set location_status='deleted' where location_id=$1 returning location_id",[location_id,],  (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getFacilityByID: function (location_id) {
        return new Promise((resolve, reject) => {
            db.query("select l.location_id ,l.location_category_id ,l.facility_name ,l.latitude ,l.longitude,lc.facility_type from locations l inner join location_category lc on l.location_category_id=lc.location_category_id where l.location_status='active' AND l.location_id=$1",[location_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    facilityCategory: function () {
        return new Promise((resolve, reject) => {
            db.query("select location_category_id,facility_type from location_category",[], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};

module.exports = UserTask;