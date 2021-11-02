const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");

const activityController = {

    submitActivity: async (req, res) => {
        try {
            console.log(req)
            //console.log(req.user)
            const {
                title,
                description,
                zipcode,
                town,
                free
            } = req.body;
            const slug = description.slice(0,30) + '...'; // we are taking the thirty first words of the description 
            const userId = req.user.id;
            
            //check if all fields are full.
            if (!title || !description || !zipcode || !town || !free) {

                return res.json({
                    error: 'Merci de compléter tous les champs!'
                });
                
            };
            //send data in DB.
            const newActivity = await activityDataMapper.submitActivity(title, description, slug, zipcode, town, free, userId);
            // we take the id of the activity juste posted
            // const activityId = newActivity.rows[0].id
            // // we insert picture path in database with the id of the activity just posted
            // await activityDataMapper.insertPicture(req.file.path, activityId)
            //send response to the front.
            res.status(200).json({message: "Nous vous remercions de votre proposition, celle-ci sera examinée avec le plus grand soin."})

        } catch (error) {
            console.log(error)
            res.status(500);
        };
    },

/*     displayTopRatedActivity: async (req, res)=>{
        try {
            const bestactivities = await activityDataMapper.findbestActivities();
            res.json({bestactivities});

        } catch (error) {
            console.log(error)
            res.status(500);
        }
    } */

};

module.exports = activityController;