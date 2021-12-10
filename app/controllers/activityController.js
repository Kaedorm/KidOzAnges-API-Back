const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");

//new requires for AWS
/* const {
    uploadFile,
    getFileStream
} = require('../../s3')
const fs = require('fs')
const util = require('util');
const unlinkFile = util.promisify(fs.unlink) */

const activityController = {

    /*     getPicture: (req, res) => {
            const key = req.params.key 
            const readStream = getFileStream(result.rows[0].url);
            readStream.pipe(res);
        }, */


    activityDetails: async (req, res) => {
        const activityId = Number(req.params.id);
        try {
            const result = await activityDataMapper.getOneActivity(activityId);
            const verify = result.rows.find(elm => elm.id == activityId)
                (verify)
            if (!verify) {
                return res.sendStatus(404).json({erreur: "404"});
            }
            const comments = await activityDataMapper.getCommentsOfActivity(activityId);
            const avgRating = await activityDataMapper.getAverageRating(activityId)

            res.json({
                activity: result.rows[0],
                comments: comments.rows.length > 0 ? comments.rows : "Cette activité ne contient pas de commentaire",
                rate: avgRating.rows.length > 0 ? avgRating.rows[0] : "Cette activité ne possède pas encore de note"
            })

        } catch (error) {
            // res.status(500)
        }
    },

    submitActivity: async (req, res) => {
        try {
            const {
                title,
                description,
                zipcode,
                town,
                free,
            } = req.body;
            
            const userId = Number(req.user.id);

            //check if all fields are full.
            if (!title || !description || !zipcode || !town || !free) {

                return res.json({
                    error: 'Merci de compléter tous les champs!'
                });

            };
            //send data in DB.
            const newActivity = await activityDataMapper.submitActivity(title, description, town, Number(zipcode), free, Number(userId));
            // we take the id of the activity just posted

            const activityId = newActivity.rows[0].id


/*             const file = req.file

            const result = await uploadFile(file) */

            await unlinkFile(file.path) //delete picture in app

            // we insert picture path in database with the id of the activity just posted
            await activityDataMapper.insertPicture(result.Location, activityId);

            //send response to the front.
            res.status(200).json({
                message: "Nous vous remercions de votre proposition, celle-ci sera examinée avec le plus grand soin."
            })

        } catch (error) {
            (error)
            res.status(500);
        };
    },

    commentActivity: async (req, res) => {
        try {
            const activityId = Number(req.params.id);
            const userId = Number(req.user.id);
            const {
                title,
                comment,
                rate
            } = req.body;
            if (rate && rate > 0 && rate < 6) {
                // we are checking if an user already rates the activity
                const userRatesActivity = await activityDataMapper.getUserWhoRatesActivity(userId, activityId);
                const hasRates = userRatesActivity.rows.find(elm => elm.user_id == userId && elm.activity_id == activityId);
                // if this user alredy rates this activity we return an error
                (hasRates)
                if (hasRates) {
                    res.json({ erreur: "Vous ne pouvez pas noter plusieurs fois cette activité" });
                    throw new Error("Cette activité est déjà notée par cet utilisateur")
                }
                // else we insert in database the user who rates this activity with the rate of the activity
                const result = await activityDataMapper.rateActivity(rate)

                const rateId = result.rows[0].id;
                await activityDataMapper.insertRate(userId, activityId);
                await activityDataMapper.activityRating(Number(rateId), activityId);

            }
            // we insert the comment of this activity
            const newComment = await activityDataMapper.commentActivity(title, comment, userId, activityId);
            res.json({
                newComment: newComment.rows[0]
            })
        } catch (err) {
            res.sendStatus(403);
        }
    },


    searchActivity: async (req, res) => {
        try {
            const {
                town,
                free
            } = req.body;

            const result = await activityDataMapper.searchActivity(town, free);
            // if no activity corresponding the user search we send an error
            if (!result.rows || result.rows.length == 0) {
                res.json({
                    error: "Nous sommes désolés, mais aucune activité ne correspond à vos critères de recherche."
                })
                throw new Error("L'activité n'existe pas");
            }
            // else return all activities from the user search
            res.json({
                activities: result.rows
            })
        } catch (error) {
            res.status(500)
        }
    },

    getArticles: async (req, res) => {
        try {
            const articles = await activityDataMapper.getArticles();
            if(!articles.rows || articles.rows.length == 0) {
                res.json({
                    error: "Nous sommes désolés mais aucun article n'est disponible"
                })
            }
            res.json(articles.rows);
        } catch (error) {
            res.status(500)
        }
    },

    displayTopActivity: async (req, res) => {

        try {

            const bestactivities = await activityDataMapper.findbestActivities();
            res.json(bestactivities.rows);

        } catch (error) {
            (error)
            res.status(500);
        }

    }


};

module.exports = activityController;