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
                text: "SELECT id, nickname, firstname, lastname, email, password, gender FROM \"user\" WHERE email=$1;",
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
            text: "DELETE FROM \"user\" WHERE id=$1",
            values: [userId]
        }
        try {
            return await pool.query(query)
        } catch (error) {
            console.error(error)
        }
    },

    showUserProfile: async (userId) => {
        const query = {
            text: "SELECT id, nickname, firstname, lastname, email, gender FROM \"user\" WHERE id=$1;",
            values: [userId]
        };
        try {
            return await pool.query(query);

        } catch (error) {
            console.error(error)
        }
    },
};

module.exports = userDataMapper;