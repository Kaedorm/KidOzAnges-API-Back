const pool = require("../database");

const activityDataMapper = {

    submitActivity: async(title, description,slug,zipcode,town,free, user_Id) =>{
        try{
            const query = {
                text: 'INSERT INTO "activity" (title, description,slug, zipcode, free, user_Id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, title, description, slug, zipcode, free, user_Id',
                values: [title, description,slug, zipcode, free, user_Id]    
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