const pool = require("../database");

const userDataMapper = {

    // finding all datas from all users.
    getAllUsers: async () => {
        try {
            const query = "SELECT id, nickname, firstname, lastname, email, password, gender FROM \"user\";";
            return await pool.query(query);
        } catch (error) {
            throw new Error(error)
        }
    },

    getUserByEmail: async (email) => {
        try {
            const query = {
                text: "SELECT \"user\".id, \"user\".nickname, \"user\".firstname, \"user\".lastname, \"user\".email, \"user\".password, \"user\".gender, role.level AS role FROM \"user\" JOIN role ON \"user\".role_id = role.id WHERE email=$1;",
                values: [email]
            }
            return pool.query(query)
        } catch (error) {
            throw new Error(error)
        }
    },

    //inserting a new user in DB. 
    insertUser: async (nickname, firstname, lastname, email, password, gender) => {

        const query = {
            text: "INSERT INTO \"user\" (nickname, firstname, lastname, email, password, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nickname, firstname, lastname, email, password, gender;",
            values: [nickname, firstname, lastname, email, password, gender]

        };
        try {
            return await pool.query(query);

        } catch (error) {
            console.error(error)
        }
    },

    //delete an existing user.
    deleteUser: async (userId) => {
        const query = {
            text: `DELETE FROM "user" WHERE id=$1`,
            values: [userId]
        }
        try {
            return await pool.query(query)
        } catch (error) {
            console.error(error)
        }
    },

    showUserProfile: async (userId) => {
        try {
            const query = {
                text: "SELECT id, nickname, firstname, lastname, email, gender FROM \"user\" WHERE id=$1;",
                values: [userId]
            };
            return await pool.query(query);

        } catch (error) {
            console.error(error)
        }
    },

    updateNickname: async (newNickname, userId) => {
        try {
            const query = {
                text: `UPDATE "user" SET nickname = $1 WHERE id = $2`,
                values: [newNickname, userId]
            };
            console.log("je suis dans la query");
            return await pool.query(query);
        } catch (error) {
            console.error(error)
        }
    },

    updateEmail: async (newNickname, userId) => {
        try {
            const query = {
                text: `UPDATE "user" SET email = $1 WHERE id = $2`,
                values: [newNickname, userId]
            };
            return await pool.query(query);
        } catch (error) {
            console.error(error)
        }
    },

    reportedComment: async (commentId) => {
        try {
            const query = {
                text: `UPDATE "comment" SET report = 'true' WHERE id = $1`,
                values: [commentId]
            }
            return await pool.query(query);
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = userDataMapper;
