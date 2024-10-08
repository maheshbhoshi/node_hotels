const express = require("express");

// routes required
const router = express.Router();

const MenuItem = require("./../models/MenuItem.js");


router.post("/", async(req,res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();

        console.log("Data saved..");
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server Error" });
    }
})




router.get("/", async(req,res) => {
    try {
        const response = await MenuItem.find();
        console.log("data  fetched successfully.");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server Error" });
    }
})

// get result agains worktype
router.get("/:taste", async(req,res) => {
    try {
        const tasteType = req.params.taste;
        if(tasteType == "spicy" || tasteType == "sweet"){
            const response = await MenuItem.find({taste:tasteType});
            console.log("response  fetched successfully.");
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"invalid  work type" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server Error" });
    }
})

module.exports = router;