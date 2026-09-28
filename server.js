require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/api/users', users);

async function start() {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) throw new Error('Set MONGO_URI and JWT_SECRET in .env');
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`));
}

if (require.main === module) start().catch(error => { console.error(error); process.exit(1); });
module.exports = app;
