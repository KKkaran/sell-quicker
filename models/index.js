const User = require("./Users")
const Post = require("./Posts")
const Category = require("./Categories")
const Comment = require("./Comments")

//all the relationships go here
Category.hasMany(Post,{
    foreignKey:'category_id'
})
Post.belongsTo(Category,{
    foreignKey:'category_id'
})
User.hasMany(Post,{
    foreignKey:'creator_id'
})
Post.belongsTo(User,{
    foreignKey:'creator_id'
})
User.hasMany(Comment,{
    foreignKey:'user_id'
})
Comment.belongsTo(User,{
    foreignKey:'user_id'
})
Post.hasMany(Comment,{
    foreignKey:'post_id'
})
Comment.belongsTo(Post,{
    foreignKey:'post_id'
})

module.exports = {User,Post,Category,Comment}