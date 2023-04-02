const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');

const COIN = require('./models/COIN');
const apiRoutes = require('./routes/apiRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// static
app.use(express.static('dist'));

// Root
app.get('/', (req, res, next) => {
  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
});

app.use('/api', apiRoutes);

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, async () => {
      console.log('Server is running on port ', PORT);

      await COIN.deleteMany({}); // dev only

      //

      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const data = response.data;

      // data is an objects containing many objects, get the first 10 objects and save them to the database
      const coins = Object.values(data).slice(0, 10);
      for (let coin of coins) {
        const newCoin = new COIN({
          name: coin.name,
          last: coin.last,
          buy: coin.buy,
          sell: coin.sell,
          volume: coin.volume,
          base_unit: coin.base_unit
        });

        await newCoin.save();
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
