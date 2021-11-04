const pool = require("../database");

const activityDataMapper = {


    getOneActivity: async(activityId) => {
        const query = {
            text: `SELECT id, description, town, zipcode, title, free FROM activity WHERE id=$1;`,
            values: [activityId]
        }
        try {
            return await pool.query(query);
        } catch (error) {
            res.sendStatus(500);
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

    commentActivity: async() => {
        
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