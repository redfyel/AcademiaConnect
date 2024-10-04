//create a mini express module here
let exp = require("express");
let examApp = exp.Router();
const { Db } = require("mongodb");


//add a body parser middleware
examApp.use(exp.json());

examApp.get('/tutorials/:subject_name', (async (req, res) => {}))


module.exports = examApp;