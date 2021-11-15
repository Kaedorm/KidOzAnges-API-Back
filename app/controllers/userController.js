const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");
const auth = require("../middleware/auth")
const {
    hashSync,
    compare
} = require("bcrypt"); // module for crypted password
const {
    validate
} = require('email-validator');
const schema = require("../schemas/passwordSchema"); // password validator module require

const userController = {
    signup: async (req, res) => {
        try {
            const errors = [];
            const {
                nickname,
                firstname,
                lastname,
                email,
                password,
                passwordConfirm,
                gender
            } = req.body;
            // const result  = await userDataMapper.getUsers();
            // const users = result.rows;
            // const userFound = users.find(user => user.email === email.toLowerCase());

            const result = await userDataMapper.getUserByEmail(req.body.email.toLowerCase());
            // if a user is in database we push an error
            if(result.rows[0]) errors.push("L'adresse email est déjà utilisée.");

            const validatePassword = schema.validate(password);
            // we push errors if user write invalid informations
            // verifying if password contains 1 uppercase letter, 1 lowercase letter, 1 digit, no spaces and greater than 8 characters
            if (!validatePassword) errors.push("Le mot de passe doit contenir 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre");
            // We compare the 2 passwords, if differents we push an error
            if (password !== passwordConfirm) errors.push("Les deux mots de passe ne sont pas identiques.");
            // all the fields are required
            if (!nickname || !firstname || !lastname || !email || !password || !passwordConfirm || !gender) errors.push("Veuillez renseigner tous les champs.");
            // verifying if email is in good format
            if (!validate(email)) errors.push("L'adresse mail renseignée n'est pas correcte.");
            // if(userFound) errors.push("L'adresse mail est déjà utilisée.");

            // if the errors array isn't empty we push all errors

            if (errors.length > 0) {
                res.json({
                    errors
                });
                throw new Error("Impossible d'entrer l'utilisateur en base de données");
            }

            // inserting the user in database with an encrypted password
            const newUser = await userDataMapper.insertUser(nickname, firstname, lastname, email.toLowerCase(), hashSync(password, 8), gender);
            // we send newUser's informations
            res.status(200).json({
                user: newUser.rows[0]
            })
        } catch (error) {

            res.status(500)

        }
    },

    login: async (req, res) => {
        try {
            const result = await userDataMapper.getUserByEmail(req.body.email.toLowerCase());

            const user = result.rows[0];
            if (!req.body.email || !req.body.password) return res.json({
                error: "Veuillez renseigner tous les champs"
            })
            // if there's no match user in database we return an error  

            if (!user) {

                res.json({
                    error: 'Utilisateur inconnu'
                });
                throw new Error("L'utilisateur est déjà en base de données");
            }
            // Users in data base have crypted passwords so we have ton compare them to be sure that the crypted password correspond to the user password in the login form
            const checkingPassword = await compare(req.body.password, user.password)
            // if compared password's good, we send user infos to the front application and create an unique token for the user
            if (checkingPassword) {
                // we delete user's password for not send it to client
                delete user.password
                const accessToken = auth.generateAccessToken(user)
                // we send infos to the front application
                res.json({
                    accessToken
                })

            } else {
                return res.json({
                    error: 'Mot de passe invalide.'
                })
            }
        } catch (error) {
            res.status(500);
        }
    },

    showUser: async (req, res) => {
        try { 

            const user = await userDataMapper.showUserProfile(req.user.id);

            res.json({user:user.rows[0]})
        } catch {
            res.status(500)
        }
    },

    deleteUser: async (req, res) => {

        try {
            await userDataMapper.deleteUser(req.user.id);
            res.json({message: "Votre profil a bien été supprimé"});

        } catch {
            res.status(500)
        }
    },

    updateNickname: async (req, res) => {
        try {
;
            const newNickname = req.body.nickname;
            await userDataMapper.updateNickname(newNickname,req.user.id);
            res.json({
                newNickname, 
                message:"Votre profil a bien été mis à jour"});

        } catch (error) {
            res.status(500);
        }
    },

    updateEmail: async(req, res) => {
        try {
            const newEmail = req.body.email;
            await userDataMapper.updateEmail(newEmail, req.user.id)
            res.json({
                newEmail, 
                message: "Votre profil a bien été mis à jour"
            })

        } catch (error) {
            res.status(500);
        }
    },

    reportComment: async (req, res) => {
        try{
            const targetedComment = req.query.id;
            await userDataMapper.reportedComment(targetedComment); 
            res.json({
                message: "commentaire signalé"
            })
        }catch(error){
            res.status(500);
        }
    }


};

module.exports = userController;