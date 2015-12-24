var path = require('path');
var webpack = require('webpack')

module.exports={
  devtool:'eval',
  entry:'./public/dev/right_index.js',
  output:{
    path:path.join(__dirname,'public/dev'),
    filename :'bundle.js',
  },
  module:{
    loaders:[{
      test: /\.js$/,
      loader:'babel',
      exclude : /node_modules/,
      include: __dirname,
    },
    {
      test:/\.jsx$/,
      loader:'babel',
      include:path.join(__dirname,'/public/dev'),
    }
  ]
  }
};
