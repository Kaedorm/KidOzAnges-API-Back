const pool = require("../database");

const activityDataMapper = {

    
    getOneActivity: async(activityId) => {
        const query = {

            text: `SELECT activity.id, activity.description, activity.town, activity.zipcode, activity.title, activity.free, picture.url 
            FROM activity 
            JOIN picture ON picture.activity_id = activity.id 
            WHERE activity.id=$1;`,
            values: [activityId]
        }
        try {
            return await pool.query(query);
        } catch (error) {
            res.sendStatus(500);
        }
    },

    submitActivity: async(title, description, town, zipcode, free, user_Id) =>{
        try{
            const query = {
                text: `INSERT INTO "activity" (title, description, town, zipcode, free, user_Id) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING id, title, description, zipcode, free, town, user_Id`,
                values: [title, description, town, zipcode, free, user_Id]    

            };
            return await pool.query(query);
        
        }catch(error) {
                res.sendStatus(500)
        }
    },

    insertPicture: async(filename, activityId) => {
        try{
            const query = {
                text: `INSERT INTO picture(url, activity_id) 
                VALUES ($1, $2);`,
                values: [filename, activityId]
            }
            return await pool.query(query)
        }catch(error) {
            res.sendStatus(500)
        }
    },

    commentActivity: async(title, description, userId, activityId) => {
        try {
            const query = {
                text: `INSERT INTO comment(title, description, user_id, activity_id) 
                VALUES ($1,$2,$3,$4) RETURNING id, title, description, user_id, activity_id;`,
                values: [title, description, userId, activityId]
            }
            return await pool.query(query)
        } catch (error) {
            res.sendStatus(500)
        }
        
    },

    getCommentsOfActivity: async(activityId) => {
        try {
            const query = {
                text: `SELECT comment.title, comment.description, "user".nickname FROM comment
                JOIN "user" ON comment.user_id = "user".id
                JOIN activity ON comment.activity_id = activity.id
                WHERE activity.id=$1
                AND comment.report = false`,
                values: [activityId]
            }
            return await pool.query(query)
        } catch (error) {
            res.sendStatus(500)        }
    },

    rateActivity: async(rate) => {
        try {
            const query = {
                text: `SELECT id FROM rating WHERE rate=$1;`,
                values: [rate]
            }
            return await pool.query(query);
        } catch(err) {
            res.sendStatus(500)
        } 
    },

    insertRate: async(userId, activityId) => {
        try {
            const query = {
                text: `INSERT INTO user_rates_activity(user_id, activity_id) 
                VALUES ($1,$2)`,
                values: [userId, activityId]
            };
            return await pool.query(query)
        } catch(err) {
            res.sendStatus(500)        }
        
    },

    activityRating: async(rateId, activityId) => {
        try {
            const query = {
                text: `INSERT INTO activity_has_rating(note_id, activity_id) 
                VALUES ($1,$2);`,
                values: [rateId, activityId]
            }
            return await pool.query(query)
        } catch (error) {
            res.sendStatus(500)        }

    },

    getAverageRating: async(activityId) => {
        try {
            const query = {
                text: `SELECT activity_has_rating.activity_id, ROUND(AVG(rate),1) AS "moyenne" 
                FROM activity_has_rating 
                JOIN rating ON rating.id = activity_has_rating.note_id 
                WHERE activity_has_rating.activity_id = $1 
                GROUP BY activity_has_rating.activity_id;`,
                values: [activityId]
            }
            return await pool.query(query);
        } catch (error) {
            res.sendStatus(500)        }
    },

    searchActivity: async(town, free) => {
        try {
            const query = {
                text: `SELECT activity.id, activity.description, activity.town, activity.zipcode, activity.title, activity.free, picture.url FROM activity 
                JOIN picture ON picture.activity_id = activity.id 
                WHERE activity.town=$1 
                AND activity.free=$2
                AND activity.certify = true;`,
                values: [town, free]
            }
            return await pool.query(query);
        } catch (error) {
            res.sendStatus(500)        }
    },

    getArticles: async () => {

        try {
            const query = {
                text: `SELECT article.title, article.description, "user".nickname 
                FROM article 
                JOIN "user" ON article.user_id="user".id`
            };
            return await pool.query(query);
        } catch (error) {
            res.sendStatus(500)        }
    },

    findbestActivities: async ()=> {
        try {
            const query = {
                text: `SELECT activity_has_rating.activity_id,ROUND(AVG(rate),1) AS "moyenne", activity.title, activity.slug, activity.town, picture.url 
                FROM activity_has_rating JOIN rating ON rating.id = activity_has_rating.note_id 
                JOIN activity ON activity.id=activity_has_rating.activity_id 
                JOIN picture ON picture.activity_id = activity.id
                WHERE activity.certify = true
                GROUP BY activity_has_rating.activity_id, activity.title, activity.slug, activity.town, picture.url 
                ORDER BY moyenne DESC LIMIT 4;`
            };
            return await pool.query(query);
        } catch (error) {
            res.sendStatus(500)
        }
    },

    getUserWhoRatesActivity : async(userId, activityId) => {
        try {
            const query = {
                text: `SELECT * FROM user_rates_activity WHERE user_id = $1 AND activity_id = $2;`,
                values: [userId, activityId]
            }
            return await pool.query(query)
        } catch (error) {
            res.sendStatus(500);
        }
    }
};

module.exports = activityDataMapper;