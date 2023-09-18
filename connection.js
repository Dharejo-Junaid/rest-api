const mongoose = require("mongoose");

async function connectMongo(url) {
  await mongoose.connect(url);
}

module.exports = { connectMongo };