const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// router.post("/", async (req, res) => {
//     try {
//         const { name, age, favoriteFoods } = req.body;
//         if (!name) {
//             return res.status(400).send("name is required");
//         }
//         const person = new Person({ name, age, favoriteFoods });
//         await person.save();
//         res.status(200).send({ msg: "person added", person });
//     } catch (error) {
//         res.status(500).send("error");
//     }
// });

// Create and Save a Record of a Model:
const person = Person({
    name: "Mary",
    age: 28,
    favoriteFoods: ["spaghetti"],
});
person.save((error, data) => {
    if (error) {
        console.log("error");
    }
});

// Create Many Records with model.create()

Person.create(
    [
        { name: "hamed", age: 26, favoriteFoods: ["sushi", "cheese"] },
        { name: "med", age: 32, favoriteFoods: ["chicken"] },
        { name: "Ghazi", age: 30, favoriteFoods: ["salad", "sushi"] },
        { name: "Sameh", age: 24, favoriteFoods: ["rice", "sushi"] },
    ],
    (error, data) => {
        if (error) {
            console.log("error");
        }
    }
);

//Use model.find() to Search Your Database
//get
router.get("/", async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).send({ msg: "All contacts", persons });
    } catch (error) {
        res.status(500).send("impossible to get persons");
    }
});

//Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/favoriteFoods", async (req, res) => {
    try {
        const person = await Person.findOne({
            favoriteFoods: "salad",
        }).exec();
        res.status(200).send({ msg: "person", person });
    } catch (error) {
        res.status(500).send("impossible to find person");
    }
});

// Use model.findById() to Search Your Database By _id
router.get("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.findById({ _id: id });
        res.status(200).send({ msg: "person", person });
    } catch (error) {
        res.status(500).send("impossible to find person");
    }
});

/////////Perform Classic Updates by Running Find, Edit, then Save////////
router.put("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.findById({ _id: id });

        person.favoriteFoods.push("hamburger");
        person.save();
        res.status(200).send({ msg: "person updated", person });
    } catch (error) {
        res.status(500).send("impossible to update person");
    }
});

//Perform New Updates on a Document Using model.findOneAndUpdate()

router.put("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.findOneAndUpdate(
            { _id: id },
            { $set: { name: "John", age: 40 } }
        );
        res.status(200).send({ msg: "person updated", person });
    } catch (error) {
        res.status(500).send("impossible to update person");
    }
});

//Delete One Document Using model.findByIdAndRemove

router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.findByIdAndRemove({ _id: id });

        res.status(200).send({ msg: "person deleted", person });
    } catch (error) {
        res.status(500).send("impossible to delete person");
    }
});

//  Delete Many Documents with model.remove()

router.delete("/", async (req, res) => {
    try {
        const deletedPersons = await Person.remove({
            name: "Mary",
        });
        res.status(200).send({ msg: "persons deleted", deletedPersons });
    } catch (error) {
        res.status(500).send("impossible to delete person");
    }
});

//Chain Search Query Helpers to Narrow Search Results
router.get("/select", async (req, res) => {
    try {
        const person = await Person.find({
            favoriteFoods: { $all: ["sushi"] },
        })

            .limit(2)
            .select("-age")
            .sort("name");
        res.status(200).send({ msg: "persons found", person });
    } catch (error) {
        res.status(500).send("impossible to select person");
    }
});
module.exports = router;
