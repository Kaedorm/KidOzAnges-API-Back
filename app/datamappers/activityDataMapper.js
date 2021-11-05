const { Polly } = require("aws-sdk");
const pool = require("../database");

const activityDataMapper = {


    getOneActivity: async(activityId) => {
        const query = {
            text: `SELECT activity.id, activity.description, activity.town, activity.zipcode, activity.title, activity.free FROM activity WHERE activity.id=$1;`,
            values: [activityId]
        }
        try {
            return await pool.query(query);
        } catch (error) {
            res.sendStatus(500);
        }
    },

    getCommentsOfActivity: async(activityId) => {
        try {
            const query = {
                text: `SELECT comment.title, comment.description, "user".nickname FROM comment
                JOIN "user" ON comment.user_id = "user".id
                JOIN activity ON comment.activity_id = activity.id
                WHERE activity.id=$1`,
                values: [activityId]
            }
            return await pool.query(query)
        } catch (error) {
            res.status(500)
        }
    },

    submitActivity: async(title, description, town, slug,zipcode,free, user_Id) =>{
        try{
            const query = {
                text: 'INSERT INTO "activity" (title, description,slug, town, zipcode, free, user_Id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, description, slug, zipcode, free, town, user_Id',
                values: [title, description,slug, town, zipcode, free, user_Id]    

            };
            return await pool.query(query);
        
        }catch(error) {
                console.log(error)
        }
    },

    insertPicture: async(filename, activityId) => {
        try{
            const query = {
                text: `INSERT INTO picture(url, activity_id) VALUES ($1, $2);`,
                values: [filename, activityId]
            }
            return await pool.query(query)
        }catch(error) {
            console.error(error)
        }
    },

    commentActivity: async(title, description, userId, activityId) => {
        try {
            const query = {
                text: `INSERT INTO comment(title, description, user_id, activity_id) VALUES ($1,$2,$3,$4) RETURNING id, title, description, user_id, activity_id;`,
                values: [title, description, userId, activityId]
            }
            return await pool.query(query)
        } catch (error) {
            console.error(error)
        }
        
    },

    rateActivity: async(rate) => {
        try {
            const query = {
                text: `SELECT id FROM rating WHERE rate=$1;`,
                values: [rate]
            }
            return await pool.query(query);
        } catch(err) {
            console.error(error)
        } 
    },

    insertRate: async(userId, activityId) => {
        try {
            const query = {
                text: `INSERT INTO user_rates_activity(user_id, activity_id) VALUES ($1,$2)`,
                values: [userId, activityId]
            };
            return await pool.query(query)
        } catch(err) {
            console.error(error);
        }
        
    },

    activityRating: async(rateId, activityId) => {
        try {
            const query = {
                text: `INSERT INTO activity_has_rating(note_id, activity_id) VALUES ($1,$2);`,
                values: [rateId, activityId]
            }
            return await pool.query(query)
        } catch (error) {
            console.error(error);
        }

    }
/*     findbestActivities: async ()=> {
        try {
            const query = {
                text: 'SELECT * FROM "activity" ORDER BY RATE DESC LIMIT 4'
            }
        } catch (error) {
            console.error(error)
        }
    } */
};

module.exports = activityDataMapper;