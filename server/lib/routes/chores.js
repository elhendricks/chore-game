const express = require('express');
const router = express.Router();
//import model(s)
const Chore = require('../models/chore');
const UserChore = require('../models/user-chore');
const User = require('../models/user');
const ensureAuth = require('../auth/ensureAuth');

//middleware
const bodyParser = require('body-parser').json();

const moment = require('moment');

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
    .put('/many', bodyParser, (req, res, next) => {
        // assume we get our data as an array of chore IDs

        function updateCompleted(chore) {

            //update chore.completed

            if (!chore.completed) {
                chore.completed = {
                    'jan17': 1
                };
            } else if (!chore.completed['jan17']) {
                chore.completed['jan17'] = 1;
            } else {
                chore.completed['jan17'] ++;
            }
            return chore.save();
        }


        console.log(req.body);
        var arr = req.body.map( id => {
            return Promise.all([
                Chore.findById(id)
                    .then(chore => {
                        return updateCompleted(chore);
                    }),
                UserChore.findById(id)
                    .then(chore => {
                        if (!chore) {
                            chore = new UserChore ({userId: req.user.id, choreId: id});
                        }
                        return updateCompleted(chore);
                    })
            ]);
        });

        var successMessage = {'success': true};
        Promise.all(arr)
            .then(() => res.send(successMessage))
            .catch(next);

        // for each chore in req.body 
        // UserChore.find
        // Chore.find


    })

    .put('/:id', bodyParser, (req, res, next) => {
        Chore.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Chore.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })

module.exports = router;