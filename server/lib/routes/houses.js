const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
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
    const houseId = req.params.id;

    Promise
      .all([
        House
          .findById(houseId)
          .lean(),
        Chore
          .find({ houseId })
          .select('name')
          .lean(),
        User
          .find(({ houseId }))
          .select('name')
          .lean()
      ])
      .then(([house, chores, users]) => {
        house.chores = chores;
        house.users = users;
        res.send(house);
      })
      .send(next);
  })