import express from 'express';
import dotenv from 'dotenv';
import accountsRouter from './router/accounts.js';
import personalRouter from './router/personal.js';
import twoFaRouter from './router/2fa.js';


const app = express();

app.use(express.json());

dotenv.config({ quiet: true });

app.use(accountsRouter);
app.use('/me', personalRouter);
app.use('/me', twoFaRouter);

app.listen(process.env.PORT, () => {
  console.log('App started listening at port ' + process.env.PORT);
});
