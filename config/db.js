const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('DB connected...');
};

module.exports = connectDB;
