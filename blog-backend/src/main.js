require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

const { PORT, MONGO_URI } = process.env;

mongoose
.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
     .then(() => {
         console.log('connected to mongoDB');
     })
     .catch(e => {
         console.error(e);
     });

import api from './api';

const app = new Koa();
const router = new Router();

router.use('/api', api.routes())

app.use(bodyParser());

const port = PORT || 4000;
app.listen(port, () => {
    console.log('listening to port %d', port);
});