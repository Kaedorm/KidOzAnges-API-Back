const activityDataMapper = require("../datamappers/activityDataMapper");
const userDataMapper = require("../datamappers/userDataMapper");
const adminDataMapper = require("../datamappers/adminDataMapper");

//new requires for AWS
const { uploadFile, getFileStream } = require('../../s3')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const activityController = {

    activityDetails: (req, res) => {
        const activityId = req.params.id;
        try {
            const result = await activityDataMapper.getOneActivity(activityId);
            if(!result) {
                throw new Error("This activity doesn't exist")
            }
            const activity = result.rows[0];
            res.json({
                activity
            })
            
        } catch(error) {

        }
    },

    // uploadPicture: (req, res) => {
    // const file = req.file
    // console.log(file)

    // const result = await uploadFile(file)
    // await unlinkFile(file.path) //delete picture in app
    // console.log(result)
    // },

    // getPicture: (req, res) => {
    // console.log(req.params)
    // const key = req.params.key //TODO ajouter la route avec la key pour récupérer l'image.
    // const readStream = getFileStream(key)

    // readStream.pipe(res)// send the stream to the front
    // },

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
            const userId = Number(req.user.id);
            
            //check if all fields are full.
            if (!title || !description || !zipcode || !town || !free) {

                return res.json({
                    error: 'Merci de compléter tous les champs!'
                });
                
            };
            //send data in DB.
            const newActivity = await activityDataMapper.submitActivity(title, description, slug, Number(zipcode), town, Boolean(free), userId);
            // we take the id of the activity juste posted
            // const activityId = newActivity.rows[0].id
            // // we insert picture path in database with the id of the activity just posted
            // await activityDataMapper.insertPicture(req.file.path, activityId);
            // activityController.uploadPicture(req, res); //send the picture to AWS and delete it from public storage.
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