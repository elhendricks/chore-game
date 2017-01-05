const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');

router
    .get('/', (req, res, next) => {
        //test commenta
        if (req.query.all) {
            User.find()
                .select('username description houseId')
                .populate({
                    path: 'houseId',
                    select: 'name'
                })
                .lean()
                .then(users => res.send(users))
                .catch(next);
        } else {
            User.findById(req.user.id)
                .lean()
                .then(user => {
                    if(!user) throw {
                        code: 404,
                        error: `user ${req.user.id} does not exist`
                    };
                    res.send(user);
                })
                .catch(next);
        }
    })

    .put('/', bodyParser, (req, res, next) => {
            User.findByIdAndUpdate(req.user.id, req.body, {new: true})
                .then(updated => res.send(updated))
                .catch(next);
    })

    .delete('/', (req, res, next) => {
        User.findByIdAndRemove(req.user.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });


module.exports = router;
