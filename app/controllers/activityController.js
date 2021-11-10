const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");

//new requires for AWS
const {
    uploadFile,
    getFileStream
} = require('../../s3')
const fs = require('fs')
const util = require('util');
const unlinkFile = util.promisify(fs.unlink)

const activityController = {



/*     getPicture: (req, res) => {
        const key = req.params.key //TODO a voir pour rajout
        const readStream = getFileStream(result.rows[0].url);
        readStream.pipe(res);
    }, */


    activityDetails: async (req, res) => {

        //console.log("++++++",req.params)
        const activityId = Number(req.params.id);
        try {
            
            
            const result = await activityDataMapper.getOneActivity(activityId);

            const verify = result.rows.find(elm => elm.id == activityId)
            console.log(verify)
            if(!verify) {
                return res.sendStatus(404);
            }
            //console.log(result.rows)
            
                

            const comments = await activityDataMapper.getCommentsOfActivity(activityId);
            //console.log(comments.rows)
            const avgRating = await activityDataMapper.getAverageRating(activityId)

            console.log(avgRating.rows)
            

            res.json({
                activity: result.rows[0],
                comments: comments.rows.length > 0 ? comments.rows : "Cette activité ne contient pas de commentaire",
                rate: avgRating.rows.length > 0 ? avgRating.rows[0] : "Cette activité ne possède pas encore de note"
            })

        } catch (error) {
            res.status(500)
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
            console.log(req.user)
            const slug = description.slice(0, 30) + '...'; // we are taking the thirty first words of the description 
            const userId = Number(req.user.id);

            //check if all fields are full.
            if (!title || !description || !zipcode || !town || !free) {

                return res.json({
                    error: 'Merci de compléter tous les champs!'
                });

            };
            //send data in DB.
            const newActivity = await activityDataMapper.submitActivity(title, description, town, slug, Number(zipcode), free, Number(userId));
            // we take the id of the activity just posted

            const activityId = newActivity.rows[0].id

            //!activityController.uploadPicture(req, res); //send the picture to AWS and delete it from public storage.
            const file = req.file
            //console.log(file,"+++++++++++++++++++");
            const result = await uploadFile(file)
            //console.log(result, "zzzzzzzzzzzzz");
            await unlinkFile(file.path) //delete picture in app

            // we insert picture path in database with the id of the activity just posted
            await activityDataMapper.insertPicture(result.Location, activityId);

            //send response to the front.
            res.status(200).json({
                message: "Nous vous remercions de votre proposition, celle-ci sera examinée avec le plus grand soin."
            })

        } catch (error) {
            console.log(error)
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
                const userRatesActivity = await activityDataMapper.getUserWhoRatesActivity(userId, activityId);
                const hasRates = userRatesActivity.rows.find(elm => elm.user_id == userId && elm.activity_id == activityId);
                console.log(hasRates)
                if(hasRates) {
                    res.json({error: "Vous ne pouvez pas noter plusieurs fois cette activité"});
                    throw new Error("Cette activité est déjà notée par cet utilisateur")
                } 
                const result = await activityDataMapper.rateActivity(rate)

                const rateId = result.rows[0].id;
                await activityDataMapper.insertRate(userId, activityId);
                await activityDataMapper.activityRating(Number(rateId), activityId);

            }
            const newComment = await activityDataMapper.commentActivity(title, comment, userId, activityId);
            res.json({
                newComment: newComment.rows[0]
            })
        } catch (err) {
            console.error(err)
        }
    },


    searchActivity: async (req, res) => {
        try {
            const {
                town,
                free
            } = req.body;

            const result = await activityDataMapper.searchActivity(town, free);
            if(!result.rows || result.rows.length == 0) {
                res.json({
                    error: "Nous sommes désolés, mais aucune activité ne correspond à vos critères de recherche."
                })
                throw new Error("L'activité n'existe pas");
            }
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
            res.json(articles.rows);
        } catch (error) {
            res.status(500)
        }
    },

    displayTopActivity: async (req, res)=>{
        console.log("avant le try");
            try {
                console.log("dans le try");
                const bestactivities = await activityDataMapper.findbestActivities();
                res.json(bestactivities.rows);

            } catch (error) {
                console.log(error)
                res.status(500);
            }

    }


};

module.exports = activityController;