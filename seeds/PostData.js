const { Post } = require("../models")

const postData = [
  {
    title:"Apartment on Rent",
    description:"2Bhk availables",
    creator_id: 1,
    category_id : 2,
  },
  {
    title:"Audi 2015 on SALE!",
    description:"A Black 2015 AUDI A4 S-line is on sale for less than 10k. For more details: contact @ 8907896654.",
    creator_id: 2,
    category_id : 1,
  },
  {
    title:"Half eaten apple - looking to sell quick",
    description:"I have a brand new half eaten golden delicious apple. Mostly mint, barely used. Moving out to a smaller apartment so need to move it quick. $5 or best offer. NO LOW BALLS! contact me at shrimpTHIEF@quirky.ca",
    creator_id: 3,
    category_id : 3,
  }
];

const seedPosts = () => Post.bulkCreate(postData)



module.exports = {
  seedPosts : seedPosts,
};


// {
//   "product_name": "Baby Babbler",
//   "price": 10.00,
//   "category_id": 5,
//   "tagIds": [1, 5]
// }