const router = require("express").Router();

// We import all controllers
const mainController = require("./controllers/mainController")
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");
const activityController = require("./controllers/activityController"); 
const uploadController = require("./middleware/multer");

//USER ROUTES
//User signup route
router.post("/api/user/signup", userController.signup);
//user login route
router.post("/api/user/login", userController.login);

//ACTIVITY ROUTES
//submit an activity
//router.post("api/submitactivity", upload.single('picture'), activityController.submitActivity);

module.exports = router;