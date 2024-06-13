const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    category: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const Article = mongoose.model("articles", blogSchema);
module.exports = Article;
