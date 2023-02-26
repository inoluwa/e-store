/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CategoryModel = require('../model/categories');

dotenv.config();

const db = process.env.MONGO_URI;
console.log('db', db);
mongoose.connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to DB...');

    await seedCategory();
  })
  .catch((err) => console.log(err));

async function seedCategory() {
  const categories = [new CategoryModel({
    Name: 'kitchen utensils',
  }),
  new CategoryModel({
    Name: 'bridal accessories',
  }),
  new CategoryModel({
    Name: 'hair products',
  }),
  new CategoryModel({
    Name: 'skincare products',
  }),
  ];

  const categoriesChecker = await CategoryModel.find();
  if (categoriesChecker.length === 0) {
    categories.forEach(async (x) => {
      await x.save();
    });
  } else {
    console.log(categoriesChecker);
  }
}
