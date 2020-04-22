"use strict";

// Sugestia – funkcję oceniającą ruchy najlepiej
// umieścić w osobnym module, a poniżej jedynie z niej
// skorzystać.

const express = require("express");
const router = express.Router();
const uuid = require("uuidv4").uuid;


router.route("/")
    .post((req, res) => {
        let obj;
        req.session.id = uuid();
        obj = req.body;
        if (null == obj.size){
            obj.size = 5;
        }
        if (null == obj.dim){
            obj.dim = 9;
        }
        if (null == obj.max){
            obj.max = 0;
        }
        console.log(req.body);
        res.json(obj);
    })
    .patch((req, res) => {
        let ruch = req.body;
        // oceniamy ruch
        res.json({
            msg: "ocena ruchu",
            ruch
        });
    });

module.exports = router;
