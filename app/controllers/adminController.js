const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");

const adminController = {
    displayToDoAdmin: async (req, res) => {
        //envoyer les activité certify f et les comments report t.
        try {
            const pendingActivities = await adminDataMapper.getPendingActivities();
            const reportedComments = await adminDataMapper.getReportedComments();
            res.json({activity: pendingActivities.rows, comment: reportedComments.rows});
        } catch (error) {
            res.status(500)
        }
    }
}

module.exports = adminController;