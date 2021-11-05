const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");

const adminController = {

    displayToDoAdmin: async (req, res) => {
        //envoyer les activité certify f et les comments report t.
        try {
            console.log("je suis dans le try")
            const pendingActivities = await adminDataMapper.getPendingActivities();
            const reportedComments = await adminDataMapper.getReportedComments();
            console.log("je sors du try")
            res.json({
                activity: pendingActivities.rows,
                comment: reportedComments.rows
            });

        } catch (error) {
            res.status(500)
        }
    },

    deleteComment: async (req, res) => {
        try {
            await adminDataMapper.deleteComment(req.body.comment.id) //TODO PRENDRE LA BONNE INFO SELON YANIS
        } catch (error) {
            res.status(500).json({
                message: "impossible d'effacer ce commentaire."
            });
        }
    },

    validateActivity: async (req, res) => {
        try {
            if (confirm) { //TODO PRENDRE LA BONNE INFO SELON YANIS
                await adminDataMapper.validateActivity(req.body.activity.id) //TODO PRENDRE LA BONNE INFO SELON YANIS
            } else {
                await adminDataMapper.deleteActivity(req.body.activity.id) //TODO PRENDRE LA BONNE INFO SELON YANIS
            };
        } catch (error) {
            res.status(500).json
        }
    },

    deleteActivity: async (req, res) => {
        try {
            await adminDataMapper.deleteActivity(req.body.activity.id) //TODO PRENDRE LA BONNE INFO SELON YANIS
        } catch (error) {
            res.status(500).json({
                message: "impossible d'effacer ce commentaire."
            });
        }
    },

}; 

module.exports = adminController;