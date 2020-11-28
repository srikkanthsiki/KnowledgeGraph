const express = require('express');
const router = express.Router();
const neo4j_calls = require('./../neo4j_calls/neo4j_api');

router.get('/', async function (req, res, next) {
    res.status(200).send("Root Response from :8080/test_api")
    return 700000;
})

router.get('/neo', async function (req, res, next) {
    console.log("hi")
    let noun = req.query.noun
    let result = await neo4j_calls.get_Nodes_Relations(noun);
    console.log("RESULT IS", result)
    res.status(200).send({
        result
    })
})

router.post('/neo', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let {
        name
    } = req.body;
    let string = await neo4j_calls.create_noun(name);
    res.status(200).send("User named " + string + " created")
    // return 700000;
})


router.put('/neo', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let requestObj = req.body
    let string = await neo4j_calls.update_verb(requestObj);
    res.status(200).send("User named " + string + " created")

})

router.post('/neo/adj', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let requestObj = req.body
    let string = await neo4j_calls.update_nound_verb_adjective(requestObj);
    res.status(200).send("User named " + string + " created")

})


module.exports = router;