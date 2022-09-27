const db = require('../config/dbConnection'); //reference of dbconnection.js


const UserTask = {
    getFacilityType: function (query_id) {
        if (query_id == 0) {
            return new Promise((resolve, reject) => {
                db.query("select l.location_id,l.facility_name,l.location_category_id,l.latitude,l.longitude,lc.facility_icon_path,lc.facility_type from locations l inner join location_category lc on l.location_category_id = lc.location_category_id where l.location_status='active' and lc.facility_type_status='active' ", [], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        } else if (query_id != 0) {
            return new Promise((resolve, reject) => {
                db.query("select l.location_id,l.facility_name,l.location_category_id,l.latitude,l.longitude,lc.facility_icon_path,lc.facility_type from locations l inner join location_category lc on l.location_category_id = lc.location_category_id where l.location_category_id=$1 AND l.location_status='active' ", [query_id], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        }
    },

    updateFacilityType: function (location_id, location_category_id, facility_name, latitude, longitude) {
        return new Promise((resolve, reject) => {
            db.query("update locations set facility_name=$1,location_category_id=$2,latitude=$3,longitude=$4 where location_id=$5 AND location_status='active' returning location_id", [facility_name, location_category_id, latitude, longitude, location_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    addFacilityType: function (facility_type) {
        return new Promise((resolve, reject) => {
            db.query("insert into location_category(facility_type,facility_type_status) values($1,'active') returning location_category_id", [facility_type], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteFacilityType: function (location_category_id) {
        return new Promise((resolve, reject) => {
            db.query("update location_category set facility_type_status='deleted' where location_category_id=$1 returning location_category_id", [location_category_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};

module.exports = UserTask;