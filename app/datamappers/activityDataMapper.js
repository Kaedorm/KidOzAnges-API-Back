const pool = require("../database");

const activityDataMapper = {

    submitActivity: async(title, description,slug,zipcode,town,free) =>{
        try{
    const query = {
        text: 'INSERT INTO "activity" (title, description,slug, zipcode,town, free, user_id) VALUES (?, ?, ?, ?,$1, $2, $3, $4, $5, $6) RETURNING id, nickname, firstname, lastname, email, password, gender;',
        values: [title, description,slug, zipcode,town, free, user_id]    
    };
        return await pool.query(query);
        
        }catch(error) {
                console.log(error)
            }
        }
    };

module.exports = activityDataMapper;