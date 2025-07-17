const express = require('express')
const dotenv = require('dotenv');
const app = express()
dotenv.config()
const cors = require("cors")
require("./db/dbconnection")
const Article = require("./models/Articles")
const multer = require("multer")
const path = require("path")
const fs = require("fs");

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/public/images"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

// add blog 

app.post("/add-blog", upload.single("image"), async (req, resp) => {

    try {
        const { title, description, category } = req.body;
        console.log(req.body);
        console.log(req.file);
        const img = req.file.filename
        let blog = await Article.create({
            title: title,
            description: description,
            image: img,
            category: category
        })

        resp.send(blog)
        console.log(blog);
    } catch (err) {
        resp.send(err)
    }

});


// get all blog 
app.get("/test", (req, res) => {
    res.send("✅ Backend is working");
});


app.get("/", async (req, resp) => {
    try {
        let result = await Article.find({})
        if (result.length > 0) {
            resp.send(result)
        } else {
            resp.send("No blog found")
        }
    } catch (err) {
        resp.send({ "message": "failed to find all blogs", error: err })
    }
})


// get single blog 

app.get("/blog/:id", async (req, resp) => {
    try {
        let result = await Article.findOne({ _id: req.params.id });
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "message": "no blog found" })
        }
    } catch (err) {
        console.error("Error in MongoDB query:", err);
        resp.status(500).send({ "error": "Internal Server Error" });
    }
})

// update blog

app.put("/update-blog/:id", upload.none(), async (req, resp) => {

    try {
        console.log(req.body);
        let result = await Article.updateOne({ _id: req.params.id }, req.body)
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "message": "blog not updated" })
        }
    } catch (error) {
        resp.status(500).send("Internal server eroor")
    }



})


// delete single blog 

app.delete("/del/:id", async (req, resp) => {
    try {
        let blog = await Article.findById({ _id: req.params.id });
        if (blog?.image) {
            const imagePath = path.join(__dirname, "public", "images", blog.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Image deletion error:", err.message);
                } else {
                    console.log("Image deleted:", imagePath);
                }
            });
        }
        const deleteBlog = await Article.deleteOne({ _id: req.params.id });

        resp.json({ message: "Blog and image deleted", deleteBlog });


    } catch (err) {
        console.error("Error in MongoDB query:", err);
        resp.status(500).send({ "error": "Internal Server Error" });
    }

})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
})