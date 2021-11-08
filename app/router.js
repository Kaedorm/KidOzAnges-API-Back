const router = require("express").Router();
const auth = require("./middleware/auth")

// We import all controllers
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");
const activityController = require("./controllers/activityController"); 
const upload = require("./middleware/multer");

//const multer = require('multer')
//const upload = multer({ dest: './public' })

//USER ROUTES
//User signup route
router.post("/api/user/signup", userController.signup);
//user login route
router.post("/api/user/login", userController.login);
//show user profile
router.get("/api/user", auth.authenticateToken, userController.showUser);
// user delete his own profile
router.delete("/api/user/delete", auth.authenticateToken, userController.deleteUser),
router.patch("/api/user/updatenickname", auth.authenticateToken, userController.updateNickname),
router.patch("/api/user/updateemail", auth.authenticateToken, userController.updateEmail),

//ACTIVITY ROUTES
router.get("/api/activity/:id", activityController.activityDetails)
router.post("/api/activity/:id/comment", auth.authenticateToken, activityController.commentActivity)
//submit an activity , 
router.post("/api/submitactivity", auth.authenticateToken, upload.single('picture'), activityController.submitActivity);
router.post("/api/searchactivity", activityController.searchActivity)

//ADMIN ROUTE
router.get("/admin", adminController.displayToDoAdmin ); 

//display the best rated activities
//router.get("/api/bestactivities", activityController.displayTopRatedActivity); 

module.exports = router;