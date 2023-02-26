const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Role, User } = require('../model/user');
const { hashMyPassword } = require('../helper/encrypt_password');

dotenv.config();

const db = process.env.MONGO_URI;
console.log('db', db);
mongoose.connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to DB...');
  })
  .catch((err) => console.log(err));
async function seedUser() {
  const hashPassword = await hashMyPassword('pelumi');
  const role = await Role.findOne({ roleName: 'admin' });
  const users = await User.find({ isDeleted: false });
  if (users.length === 0) {
    const user = new User({
      password: hashPassword,
      email: 'naomiadeniran426@gmail.com',
      firstName: 'Naomi',
      lastName: 'Oyewusi',
      address: 'no 36, moshalashi street, shomolu lagos',
      role: role.id,
    });

    const createUser = await user.save();
    if (createUser) {
      console.log('Admin User seeded');
    }
  }
}
seedUser();
