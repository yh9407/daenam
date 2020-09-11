import express from 'express';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import session from "express-session";
import mongoose from 'mongoose';
import api from './routes';
import bodyParser from 'body-parser';
// const fs = require("fs");
// const data = fs.readFileSync("./database.json");
// const conf = JSON.parse(data);
// const mysql = require("mysql");


const app = express();

app.use(bodyParser.json());
app.use('/api', api);

const port = 3000;
const devPort = 4000;

app.use('/', express.static(path.join(__dirname, './../dist')));


const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/Memo_app_tuts');

//mariaDB
// const connection = mysql.createConnection({
//     host: conf.host,
//     user: conf.user,
//     password: conf.password,
//     port: conf.port,
//     database: conf.database,
//     dateStrings: 'conf.dateStrings'
// });
// connection.connect();


app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
