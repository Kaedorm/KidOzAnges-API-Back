const pool = require("../database");

const adminDataMapper = {

    getPendingActivities: async () => {
        const query = "SELECT \"activity\".id,\"activity\".title, \"activity\".description, \"activity\".zipcode, \"activity\".town, \"activity\".free, \"picture\".url FROM \"activity\" JOIN \"picture\" ON \"activity\".id = \"picture\".activity_id WHERE \"activity\".certify='f' LIMIT 5";
        return await pool.query(query);
    },

    getReportedComments: async () => {
        const query = "SELECT \"comment\".id, \"comment\".title, \"comment\".description, \"user\".nickname, \"user\".email FROM \"comment\" JOIN \"user\" ON \"comment\".user_id = \"user\".id WHERE \"comment\".report='t'";
        return await pool.query(query);
    },

    validateActivity: async (activityId) => {
        const query = {
            text: `UPDATE activity SET certify='t' WHERE id=$1`,
            values: [activityId]
        };
        return await pool.query(query);

    },

    deleteActivity: async (activityId) => {
        const query = {
            text: `DELETE FROM activity WHERE id=$1`,
            values: [activityId]
        };
        return await pool.query(query);
    },

    deleteComment: async (commentId) => {
        const query = {
            text: `DELETE FROM comment WHERE id=$1`,
            values: [commentId]
        };
        return await pool.query(query);
    },

    acceptComment: async (commentId) => {
        const query = {
            text: `UPDATE comment SET report='f' WHERE id=$1`,
            values: [commentId]
        };
        return await pool.query(query);

    },
};

module.exports = adminDataMapper;