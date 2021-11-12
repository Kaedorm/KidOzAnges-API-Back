const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");

const adminController = {
    displayToDoAdmin: async (req, res) => {
        //envoyer les activité certify f et les comments report t.
        try {
            const pendingActivities = await adminDataMapper.getPendingActivities();
            const reportedComments = await adminDataMapper.getReportedComments();

            res.json({
                activity: pendingActivities.rows.length > 0 ? pendingActivities.rows : "aucune activité à valider.",
                comment: reportedComments.rows.length > 0 ? reportedComments.rows : "aucun commentaire signalé."
            });

        } catch (error) {
            res.status(500)
        }
    },

    deleteComment: async (req, res) => {
        try {
            await adminDataMapper.deleteComment(req.query.id);
            res.json({message:"le commentaire est supprimé"}); 
        }catch (error) {
            res.status(500).json({
                message: "impossible d'effacer ce commentaire."
            });
        }
    },

    acceptComment: async(req, res)=>{
        try {
            await adminDataMapper.acceptComment(req.query.id);
            res.json({message: "le commentaire est validé"});
        } catch (error) {
            res.status(500).json
        }
    },

    validateActivity: async (req, res) => {
        try {
            await adminDataMapper.validateActivity(req.query.id);
            res.json({message: "l'activité est bien publiée"});              
        } catch (error) {
            res.status(500).json
        }
    },

    deleteActivity: async (req, res) => {
        try {
            await adminDataMapper.deleteActivity(req.query.id);
            res.json({message: "l'activité est supprimée"}); 
        } catch (error) {
            res.status(500).json({
                message: "impossible d'effacer cette activité."
            });
        }
    },

}; 


module.exports = adminController;