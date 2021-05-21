const express = require("express");
const apiRoutes = require("./routes/api");
const path = require("path");
const app = express();
const PORT = 3000;

app.use('/api',apiRoutes);
app.use(express.static(path.join(__dirname,"public")));



app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
