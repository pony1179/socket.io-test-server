
const arguments = process.argv;
const port = arguments[2] || 3000;
require('./app')(port);