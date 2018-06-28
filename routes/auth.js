const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/login", loginController.show);
router.post("/login", loginController.store);

module.exports = router;
