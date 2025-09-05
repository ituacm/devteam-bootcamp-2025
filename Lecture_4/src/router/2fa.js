import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { authRequired, permissionRequired } from '../middleware.js';
import { sendMail } from '../util.js';
import db from '../db.js';


const router = new Router();

router.use(authRequired);

function sign(id, scope) {
  return jwt.sign(
    { id, scope },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// /2fa?scope=change_email,delete_account
router.get('/2fa', (req, res) => {
  const scope = req.query['scope'].split(',');

  const permissionToken = sign(req.user.id, scope);

  sendMail(
    req.user.email,
    'Yetki yükseltme tokenınız.',
    `${scope.join(', ')} yetkilerine sahip token: ${permissionToken}`
  );

  res.send({ message: 'Verification email sent.' });
});

router.patch('/email', permissionRequired('change_email'), (req, res) => {
  const oldEmail = req.user.email;
  const newEmail = req.body.email;

  db.users[newEmail] = db.users[oldEmail];
  delete db.users[oldEmail];

  res.send({ message: 'Email has been successfully changed.' });
});


export default router;
