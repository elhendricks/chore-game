const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const House = require('../models/house');
const Chore = require('../models/chore');
const User = require('../models/user');

router
  .get('/', (req, res, next) => {
    House.find()
      .then(houses => res.send(houses))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    // const houseId = req.params.id;

    Promise
      .all([
        House
          .findById(req.params.id)
          .lean(),
        Chore
          .find({ houseId: "586ac91819eb61b190e9383f" })
          .select('name')
          .lean()
        // User
        //   .find(({ houseId: req.params.id }))
        //   .select('username')
        //   .lean()
      ])
      .then((arr) => {
        // console.log('array', arr);
        [house, chores, users] = arr;
        house.chores = chores;
        house.users = users;
        res.send(house);
      })
      .catch(next);
  })

  module.exports = router;