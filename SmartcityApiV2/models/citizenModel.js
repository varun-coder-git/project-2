const db = require('../config/dbConnection'); //reference of dbconnection.js

const CitizenTask = {
    GetCitizenCount: function () {
        return new Promise((resolve, reject) => {
            db.query("select count(*) filter (where citizen_status='active' and is_login=true and is_admin=false and ward_id is not null) as online,count(*) filter (where citizen_status='active' and is_admin=false and ward_id is not null) as reg from users", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};

module.exports = CitizenTask;