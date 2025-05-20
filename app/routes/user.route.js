const userCntrl = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/signup",userCntrl.createUser);

module.exports = router;

