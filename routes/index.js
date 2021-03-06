const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Registration = mongoose.model("Registration");
const path = require("path");
const auth = require("http-auth");

router.get("/", (req, res) => {
    res.render('form');
}); 
router.post("/", 
[
    check("name")
        .isLength({ min: 1 })
        .withMessage("Please enter a name"),
    check("email")
        .isLength({ min: 1 })
        .withMessage("Please enter an email")
], (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()){
        const registration = new Registration(req.body);
        registration.save()
        .then(() =>{
            res.send("Thank you for registering");
        })
        .catch((err) => {
            console.log(err);
            res.send("sorry! something went wrong");
        });
    }else{
        res.render('form',{
            title: "Registration form",
            errors: errors.array(),
            data: req.body,

        });
                }
    
    
});
router.get("/registered", (req, res) => {
    Registration.find()
    .then((registrations) => {
    res.render("index", { title: 'listing registrations', registrations});

    })
    .catch(() => {
        res.send("sorry! something went wrong")
    });
    });

module.exports = router