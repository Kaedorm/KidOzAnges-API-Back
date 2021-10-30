const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");

const activityController = {

    submitActivity: async (req, res) => {
        try {
            console.log(req.body)
            console.log(req.file)
            const errors = [];
            const {
                title,
                description,
                zipcode,
                town,
                free
            } = req.body;
            const slug = description.slice(0,30) + '...';
            const userId = 10;
            //console.log (userId, "+++++++++");
            //check if all fields are full.
            if (!title || !description || !zipcode || !town || !free) {

                res.json({
                    error: 'Merci de compléter tous les champs!'
                });
                throw new Error("Merci de compléter tous les champs!");
            };
            //send data in DB.
            const newActivity = await activityDataMapper.submitActivity(title, description, slug, zipcode, town, free, userId);
            console.log(newActivity.rows[0])
            //console.log(newActivity.rows);
            //send response to the front.
            res.status(200).send("Nous vous remercions de votre proposition, celle-ci sera examinée avec le plus grand soin.")
            

        } catch (error) {
            console.log(error)
            res.status(500);
        };
    }

};

module.exports = activityController;