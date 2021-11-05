const pool = require("../database");

const adminDataMapper = {

    getPendingActivities: async()=>{
        const query = "SELECT \"activity\".title, \"activity\".description, \"activity\".zipcode, \"activity\".town, \"activity\".free, \"picture\".url FROM \"activity\" JOIN \"picture\" ON \"activity\".id = \"picture\".activity_id WHERE \"activity\".certify='f' LIMIT 5";
        return await pool.query(query);
    },

    getReportedComments: async()=>{
        const query = "SELECT \"comment\".id, \"comment\".title, \"comment\".description, \"user\".nickname, \"user\".email FROM \"comment\" JOIN \"user\" ON \"comment\".user_id = \"user\".id WHERE \"comment\".report='t'";
        return await pool.query(query);
    },
};

module.exports = adminDataMapper;