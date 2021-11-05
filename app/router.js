const router = require("express").Router();
const auth = require("./middleware/auth")

// We import all controllers
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");
const activityController = require("./controllers/activityController"); 
const upload = require("./middleware/multer");
const { authenticateToken } = require("./middleware/auth");
//const multer = require('multer')
//const upload = multer({ dest: './public' })

//USER ROUTES

//User signup route
router.post("/api/user/signup", userController.signup);
//user login route
router.post("/api/user/login", userController.login);

router.get("/api/me", auth.authenticateToken, (req, res) => {
    res.send(req.user)
})
//show user profile
router.get("/api/user", auth.authenticateToken, userController.showUser);
// user delete his own profile
router.delete("/api/user/delete", auth.authenticateToken, userController.deleteUser),

//ACTIVITY ROUTES
router.get("/api/activity/:id", activityController.activityDetails)
router.post("/api/activity/:id/comment", auth.authenticateToken, activityController.commentActivity)
//submit an activity , 
router.post("/api/submitactivity", upload.single('picture'), activityController.submitActivity);

//ADMIN ROUTE
router.get("/admin", adminController.displayToDoAdmin ); 

//display the best rated activities
//router.get("/api/bestactivities", activityController.displayTopRatedActivity); 

module.exports = router;