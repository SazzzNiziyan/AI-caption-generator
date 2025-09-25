require("dotenv").config();
const app = require('./src/app');
const port = process.env.PORT || 3000;
const connectDB = require("./src/db/db")




connectDB()
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});