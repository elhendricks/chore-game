const express = require('express');
const router = express.Router();
//import model(s)
const Chore = require('../models/chore.js');

//middleware
const bodyParser = require('body-parser').json();

router
    //get all
    // TODO: write query handler
    .get('/', (req, res, next) => {
        
        Chore.find()
            .lean()
            .then(chores => res.send(chores))
            .catch(next);
    })
    // other crud operations
    ;

module.exports = router;