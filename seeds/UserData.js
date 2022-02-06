const { User } = require('../models');

const UserData = [
  {
    username:"Scott B",
    email:"scott@gmail.com",
    password:"scott123"
  },
  {
    username:"Karan Sodhi",
    email:"karan@gmail.com",
    password:"karan123"
  }, 
  {
    username:"Mike Ross",
    email:"mike@gmail.com",
    password:"mike123"
  }
];

const seedUsers = () => User.bulkCreate(UserData);

module.exports = seedUsers;
