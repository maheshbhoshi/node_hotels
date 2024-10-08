const express = require("express");

const router = express.Router();
// import person module
const Person = require("./../models/Person.js");


router.post('/' , async (req,res) => {
    try {
        const data = req.body; // Assuminjg the request body contains the person data.
    
        // created new person document using the mongoose model.
        const newPerson = new Person(data);
    
        // save to the new person to the database;
        const response = await newPerson.save();
    
        console.log("Data saved..");
        res.status(200).json(response);
    
    } catch (err) {
        console.log(err);
        res.status(500).json({err:"internal server Error" });
    }
 })

 
router.get("/", async(req,res) => {
    try {
        const response = await Person.find();
        console.log("data  fetched successfully.");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server Error" });
    }
})

// get result agains worktype
router.get("/:work", async(req,res) => {
    try {
        const worktype = req.params.work;
        if(worktype == "chef" || worktype == "manager" || worktype=="waiter"){
            const response = await Person.find({work:worktype});
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

// update person records

router.put("/:id",async (req,res) =>{
    try {
        const personid = req.params.id; // Extract the id from the url parameters.
        const updatedPersonData = req.body; // update data for the person.

        const response = await Person.findByIdAndUpdate(personid,updatedPersonData,{
            new:true, // return the updated document 
            runValidators:true  // Run mongoose validation.
        });

        if(!response){
            return res.status(404).json({error:"Person Not Found.."});
        }

        console.log('data updated successfully..')
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server Error"})
    }
})


 
router.delete("/:id", async(req,res) => {
    try {
        const personid = req.params.id;
        const response = await Person.findByIdAndRemove(personid);
        if(!response){
            return res.status(404).json({error:"Person Not Found.."});
        }
        console.log("data deleted successfully.");
        res.status(200).json({message:"person Deleted success"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server Error" });
    }
})



module.exports = router;