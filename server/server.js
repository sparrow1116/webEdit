
const express = require("express");
const exStatic = require("express-static");
 
const app = express();
 
app.use(exStatic('../dist'));

app.listen(3001);