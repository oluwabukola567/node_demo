
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/password_demo" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection
.on("open", () => {
    console.log("mongoose connection open");
})
.on("error", (err) => {
    console.log(`connection error: ${err.message}`);
})

require("./models/Registration");
const app = require("./app");
const server = app.listen(3000, () =>{
    console.log(`Express is running on port ${server.address().port}`);
})