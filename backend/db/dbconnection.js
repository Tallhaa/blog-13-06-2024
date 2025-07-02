const mongoose = require('mongoose');

const main = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("db connected");
    } catch (error) {
        console.log(error);
    }

}
main().catch(err => console.log(err))

module.exports = main;
