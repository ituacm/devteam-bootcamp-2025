import bcypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { sendMail } from '../util.js';


const router = new Router();

function sign(email, id) {
  return jwt.sign(
    { email, id },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );
}


router.post('/signup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (db.users[email])
    return res.status(400).send({
      message: `User with email ${email} already exists.`
    });

  const mail = await sendMail(email, 'Hesap oluşturuldu.', '');

  if (!mail)
    return res.status(404).send({
      message: `No user has been found with ${email}.`
    });

  const passwordHash = await bcypt.hash(password, 10);

  const userId = db.userCount[0];

  db.users[email] = {
    todos: [],
    passwordHash,
    id: userId
  };

  db.userCount[0]++;

  res.send({
    token: sign(email, userId)
  });
});


router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = db.users[email];

  if (!user)
    return res.status(404).send({
      message: 'No user has been found',
    });

  try {
    if (!await bcypt.compare(password, user.passwordHash))
      throw '';

    res.send({ token: sign(email, user.id) });
  } catch {
    res.status(401).send({
      message: 'Password validation failed.'
    });
  }
});


export default router;
