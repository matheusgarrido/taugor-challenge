const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.join(__dirname, './build');
app.use(express.static(publicPath));
app.use('*', express.static(publicPath));

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Express running');
});
