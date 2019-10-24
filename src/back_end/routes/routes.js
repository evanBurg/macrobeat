const express = require("express");
const router = express.Router();
const {search} = require("../search/search");

router.get("/ping", (req, res) => {
    res.send("pong");
})

router.get("/search", async (req, res) => {
    res.send(await search(req.query.query));
})

module.exports = router;