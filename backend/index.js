const express = require('express')
const dotenv = require('dotenv');
const app = express()
dotenv.config({ path: "./db/.env" })
const cors = require("cors")
require("./db/dbconnection")
const Article = require("./models/Articles")
const multer = require("multer")
const path = require("path")

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
        const { title, description, tags, category } = req.body;
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
        let deleteBlog = await Article.deleteOne({ _id: req.params.id });
        if (deleteBlog) {
            resp.send(deleteBlog);
        } else {
            resp.send({ "message": "blog not deleted" })
        }

    } catch (err) {
        console.error("Error in MongoDB query:", err);
        resp.status(500).send({ "error": "Internal Server Error" });
    }

})

app.listen(process.env.PORT, () => {
    console.log("App is running");
})