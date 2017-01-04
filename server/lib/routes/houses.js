const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const House = require('../models/house');
const Chore = require('../models/chore');
const User = require('../models/user');

router
  .get('/', (req, res, next) => {
    //TYLER: we should break out into separate route because 
    //get / is getting all, and it makes sense to create a new
    //route to just get ONE object (the house)
    //TODO: Make separate route

      House.find()
      .then(houses => res.send(houses))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
      const houseId = req.params.id;
      Promise
      .all([
          House
          .findById(req.params.id)
          .lean(),
          Chore
          .find({ houseId })
          .select('name')
          .lean(),
          User
          .find(({ houseId }))
          .select('username')
          .lean()
      ])
      .then(([house, chores, users]) => {
          house.chores = chores;
          house.users = users;
          res.send(house);
      })
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
      new House(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .post('/house', bodyParser, (req, res, next) => {
      //TODO: Check if both name and code are provided
      const query = {};
      if (req.body.name) {
          query.name = req.body.name;
      }

      House.find(query)
            .then(house => {
                if (!house.length) {
                    throw {
                        code: 404,
                        error: `${req.body.name} not found.`
                    };
                }
                if (house.code === req.body.code) {
                    User.findByIdAndUpdate(req.user.id, {
                        houseId: house._id})
                            .then(user => res.send(user))
                                .catch(next);
                }
                else if (house.code !== req.body.code) {
                    throw {
                        code: 401,
                        error: 'Incorrect house password'
                    };
                }
            })
                .catch(next);
  })

  .delete('/:id', (req, res, next) => {
      House.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });

module.exports = router;