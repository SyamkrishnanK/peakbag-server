const { Router } = require("express");
const router = Router();

const { getData, submitHike } = require("./../../app/controllers/hikes");

router.get("/getdata", getData);
router.post("/submithike", submitHike);

module.exports = {
    authRouter: router
};
