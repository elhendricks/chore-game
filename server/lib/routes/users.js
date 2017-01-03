const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');

router
    .get('/', (req, res, next) => {
        User.find()
            .select('username description house')
            .populate({
                path: 'houseId',
                select: 'name'
            })
            .lean()
            .then(users => res.send(users))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        User.findById(req.params.id)
            .lean()
            .then(user => {
                if(!user) throw {
                    code: 404,
                    error: `user ${req.params.id} does not exist`
                };
                res.send(user);
            })
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        User.findByIdAndUpdate(req.params.id, req.body)
        .then(updated => res.send(updated))
        .catch(next);
    });

module.exports = router;
