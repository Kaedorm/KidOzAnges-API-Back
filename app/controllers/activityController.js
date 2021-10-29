const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");

const activityController = {

    submitActivity: async (req, res) => {
        console.log("je suis dans le controller submitActivy")
        try {
            console.log(req.body)
            const errors = [];
            const {
                title,
                description,
                zipcode,
                town,
                free
            } = req.body;
            const slug = description.slice(30) + '...';
            const userId = req.session.user.id;

            //check if all fields are full.
            if (!title || !description || !zipcode || !town || !free) errors.push('Merci de remplir tous les champs!');

            //send data in DB.
            const newActivity = await activityDataMapper.submitActivity(title, description, slug, zipcode, town, free, userId);
            console.log(newActivity);
            //send response to the front.
            res.status(200).send("Nous vous remercions de votre proposition, celle-ci sera examinée avec le plus grand soin.")

        } catch (error) {
            console.log(error)
            res.status(500);
        };
    }

};

module.exports = activityController;