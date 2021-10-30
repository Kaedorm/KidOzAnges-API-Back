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
        }
    };

module.exports = activityDataMapper;