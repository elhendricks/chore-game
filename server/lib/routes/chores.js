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
            .populate({
                path: 'houseId',
                select: 'name'
            })
            .lean()
            .then(chores => res.send(chores))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Chore(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    // other crud operations
    ;

module.exports = router;