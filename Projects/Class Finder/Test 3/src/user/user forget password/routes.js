const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.post("/forgot-password", controller.forgotPassword);
router.get('/reset-password/:email/:token', (req, res) => {
  res.sendFile(path.join(__dirname, './basic front end for test/reset-password.html'));
});
router.post("/reset-password/:email/:token", controller.resetPassword);

module.exports = router;

