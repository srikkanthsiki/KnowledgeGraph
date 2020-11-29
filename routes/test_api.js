const express = require('express');
const router = express.Router();
const neo4j_calls = require('./../neo4j_calls/neo4j_api');

router.get('/', async function (req, res, next) {
    res.status(200).send("Root Response from :8080/test_api")
    return 700000;
})

router.get('/neo', async function (req, res, next) {
    console.log("hi")
    let {noun} = req.query
    let {verb} = req.query
    let result
    if(noun){
    result = await neo4j_calls.get_Noun_Relations(noun);
    }else{
        result = await neo4j_calls.get_Verb_Relations(verb);
    }
    console.log("RESULT IS", result)
    res.status(200).send({
        result
    })
})

// router.post('/neo', async function (req, res, next) {
//     //Passing in "name" parameter in body of POST request
//     let {
//         name
//     } = req.body;
//     let string = await neo4j_calls.create_noun(name);
//     res.status(200).send("User named " + string + " created")
//     // return 700000;
// })


router.put('/neo', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let requestObj = req.body
    let string = await neo4j_calls.update_verb(requestObj);
    res.status(200).send("User named " + string + " created")

})

router.post('/neo', async function (req, res, next) {
    let requestObj = req.body
    let {
        noun2
    } = requestObj
    let resString;
    if (noun2 == undefined) {
        resString = await neo4j_calls.update_noun_verb_adjective(requestObj);
    } else {
        resString = await neo4j_calls.update_noun_verb_noun(requestObj);
    }
    res.status(200).send("Noun created/merged")

})


module.exports = router;