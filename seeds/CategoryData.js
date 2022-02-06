const { Category } = require("../models")

const categoryData = [
  {
    category_name:"Housing"
  },
  {
    category_name:"Technology"

  },
  {
    category_name:"Automotive"

  },
  {
    category_name:"Furniture"
  },
  {
    category_name:"Entertainment"
  }
];

const seedCategory = () => Category.bulkCreate(categoryData);

module.exports = seedCategory;

