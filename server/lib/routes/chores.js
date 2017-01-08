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

        const date = moment().format('MMM YYYY');
        
        function updateCompleted(chore) {


            //update chore.completed

            if (!chore.completed) {
                chore.completed = {};
            } 
            
            if (!chore.completed[date]) {
                chore.completed[date] = 1;
            } else {
                chore.completed[date] ++;
            }

            var {completed} = chore;
            chore.completed = Object.create(null);
            chore.completed = completed;

            return chore.save();
        }

        var arr = req.body.map( id => {
            return Promise.all([
                Chore.findById(id)
                    .then(chore => {
                        return updateCompleted(chore);
                    }),
                UserChore.find({choreId: id, userId: req.user.id})
                    .then(chore => {
                        if (!chore.length) {
                            var data = {userId: req.user.id, choreId: id, completed: {}};
                            data.completed[date] = 1;
                            return new UserChore (data).save()
                                .then(newChore => {
                                    return newChore;
                                });
                        }
                        return updateCompleted(chore[0]);
                    })
            ]);
        });
        Promise.all(arr)
            .then(() => res.send(arr))
            .catch(next);
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
    });

module.exports = router;
