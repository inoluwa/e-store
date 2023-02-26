/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Role } = require('../model/user');

dotenv.config();

const db = process.env.MONGO_URI;
console.log('db', db);
mongoose.connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to DB...');

    await seedRole();
  })
  .catch((err) => console.log(err));

async function seedRole() {
  const roles = [new Role({
    roleName: 'admin',
  }),
  new Role({
    roleName: 'customer',
  }),
  ];

  const checkRoles = await Role.find();
  if (checkRoles.length === 0) {
    roles.forEach(async (x) => {
      await x.save();
    });
  } else {
    console.log(checkRoles);
  }
}
