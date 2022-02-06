const sequelize = require('../config/connection');
const seedCategory = require('./CategoryData');
const {seedPosts} = require('./PostData')
const seedUsers = require('./UserData');

const seedAll = async () => {
  console.log("inserting")
  await sequelize.sync({ force: true });

  await seedUsers()

  await seedCategory();
  
  await seedPosts();
  
  process.exit(0);
};

module.exports = seedAll()
