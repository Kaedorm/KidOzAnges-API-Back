const pool = require("../database");

const activityDataMapper = {

    submitActivity: async(title, description,slug,zipcode,town,free, user_Id) =>{
        try{
            const query = {
                text: 'INSERT INTO "activity" (title, description,slug, zipcode, town, free, user_Id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, description, slug, zipcode, town, free, user_Id',
                values: [title, description,slug, zipcode,town, free, user_Id]    
            };
            return await pool.query(query);
        
        }catch(error) {
                console.log(error)
        }
    },

    insertPicture: async(filename, activityId) => {
        try{
            const query = {
                text: `INSERT INTO picture(picture_url, activity_id) VALUES ($1);`,
                values: [filename, activityId]
            }
            return await pool.query(query)
        }catch(error) {
            console.error(error)
        }
    }
};

module.exports = activityDataMapper;