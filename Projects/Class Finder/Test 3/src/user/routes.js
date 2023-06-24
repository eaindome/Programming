const { Router } = require("express");
const controller = require('./controller');

const router = Router();


router.post("/", controller.userLogin);
router.get("/", controller.userProfile);
router.post("/logout", controller.userLogout);
router.post('/signup', controller.userSignUp);

module.exports = router;