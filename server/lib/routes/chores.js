const express = require('express');
const router = express.Router();
//import model(s)
const Chore = require('../models/chore.js');

//middleware
const bodyParser = require('body-parser').json();

router
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

    .get('/:id', (req, res, next) => {
        Chore.findById(req.params.id)
            .then(chore => res.send(chore))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Chore(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Chore.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;
