const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');

const NewsTask = {
    registerNews: function (RegisterData) {
        return new Promise((resolve, reject) => {
            let uploaded_on = moment().format("YYYY-MM-DD HH:mm:ss")
            db.query("insert into news(user_id,title,description,category_id,is_breaking,uploaded_on,is_hide) values ($1,$2,$3,$4,$5,$6,$7) returning news_id", [RegisterData.user_id, RegisterData.title, RegisterData.description, RegisterData.category_id, RegisterData.is_breaking, uploaded_on,RegisterData.is_hide], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    newsImage: function (id,image_path) {
        return new Promise((resolve, reject) => {
            db.query("update news set image_path=$2 where news_id=$1 returning news_id", [id,image_path], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    NewsCategory: function () {
        return new Promise((resolve, reject) => {
            db.query("select * from news_category order by category_id ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getNews: function () {
        return new Promise((resolve, reject) => {
            db.query("select n.news_id as id,n.title,(u.f_name ||' '|| u.l_name) as postedBy,nc.category_name ,n.uploaded_on,n.user_id as admin_id,n.is_breaking,n.is_hide from news n inner join users u on n.user_id =u.user_id inner join news_category nc on nc.category_id =n.category_id where n.is_delete=false order by n.uploaded_on DESC ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getNewsDataByID: function (ID) {
        return new Promise((resolve, reject) => {
            db.query("select n.news_id,n.user_id as admin_id,n.title,n.description,nc.category_id,nc.category_name,u.f_name,u.l_name,n.uploaded_on,n.image_path,n.is_hide,n.is_breaking  from news n inner join news_category nc on n.category_id  =nc.category_id inner join users u on u.user_id =n.user_id where n.news_id =$1 ", [ID], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getNewsCommentsByID: function (ID,offset) {
        return new Promise((resolve, reject) => {
            db.query("SELECT nc2.user_id as user_id,u.is_admin,u.login_type,n.user_id as admin_id,nc2.id,subqueryI.countOfChild as comment_count,u.image_path,u.f_name,u.l_name,nc2.comments,nc2.comment_on  from news n inner join news_category nc on n.category_id  =nc.category_id inner join news_comments nc2  on n.news_id =nc2.main_news_id inner join users u on u.user_id =nc2.user_id left join (select main_news_id ,count(id) as countOfChild from news_comments nc3  where  is_delete=false  group by main_news_id ) subqueryI on(n.news_id = subqueryI.main_news_id ) where n.news_id=$1 and nc2.is_delete =false order by nc2.id desc limit $2", [ID,offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    addNewsComment: function (data) {
        // console.log("data",data);
        return new Promise((resolve, reject) => {
            let comment_on = moment().format("YYYY-MM-DD HH:mm:ss")
            db.query("insert into news_comments(main_news_id,user_id,comments,comment_on) values($1,$2,$3,$4) returning id ", [data.newsID,data.user_id,data.comment,comment_on], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteNewsComment: function (ID) {
        return new Promise((resolve, reject) => {
            db.query("update news_comments set is_delete=true where id=$1 returning id", [ID], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteNews: function (ID) {
        return new Promise((resolve, reject) => {
            db.query("update news set is_delete=true where news_id=$1  returning news_id", [ID], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    breakingNews: function () {
        return new Promise((resolve, reject) => {
            db.query("select n.news_id,n.title ,n.description ,n.image_path,n.uploaded_on from news n where is_hide =false and n.is_breaking =true and n.is_delete =false and floor(EXTRACT(EPOCH FROM (current_timestamp - n.uploaded_on)/3600))::integer <= 48 order by n.news_id desc limit 10  ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getNewsOCM : function (offset) {
        return new Promise((resolve, reject) => {
            db.query("(select n.news_id as news_id,subqueryI.comment_count,n.title,(u.f_name ||' '|| u.l_name) as postedBy ,n.uploaded_on,n.user_id as admin_id,n.is_breaking,n.image_path  from news n inner join users u on n.user_id =u.user_id left join (select n.news_id,count(nc.id) as comment_count from news n inner join news_comments nc on n.news_id = nc.main_news_id where nc.is_delete=false group by n.news_id) subqueryI on(n.news_id=subqueryI.news_id) where n.is_delete=false and n.is_breaking=true and n.is_hide =false  order by n.uploaded_on desc) union (select n.news_id as id,subqueryI.comment_count,n.title,(u.f_name ||' '|| u.l_name) as postedBy,n.uploaded_on,n.user_id as admin_id,n.is_breaking,n.image_path from news n inner join users u on n.user_id =u.user_id left join (select n.news_id,count(nc.id) as comment_count from news n inner join news_comments nc on n.news_id = nc.main_news_id where nc.is_delete=false group by n.news_id) subqueryI on(n.news_id=subqueryI.news_id) where n.is_delete=false and n.is_hide=false and n.is_breaking=false  order by n.uploaded_on desc) order by is_breaking desc, uploaded_on desc",(error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    isBreakingNewsEditable: function (ID) {
        return new Promise((resolve, reject) => {
            db.query("SELECT floor(EXTRACT(EPOCH FROM (current_timestamp - n.uploaded_on)/3600))::integer as interval FROM news n where n.news_id =$1;", [ID], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    changeBreakingNewsStatus :function (ID){
        return new Promise((resolve, reject) => {
            db.query("update news set is_breaking=false where news_id=$1  returning news_id", [ID], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateNews: function (RegisterData) {
        return new Promise((resolve, reject) => {
            db.query("update news set title =$2,description =$3,category_id =$4,is_breaking=$5,is_hide=$6 where news_id=$1 returning news_id;", [RegisterData.news_id, RegisterData.title, RegisterData.description, RegisterData.category_id, RegisterData.is_breaking,RegisterData.is_hide], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};

module.exports = NewsTask;