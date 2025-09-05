import { Router } from 'express';
import { authRequired } from '../middleware.js';
import db from '../db.js';


const router = new Router();

router.use(authRequired);

router.get('/', (req, res) => {
  res.send({
    email: req.user.email,
    id: req.user.id,
  });
});

router.post('/todos', (req, res) => {
  const text = req.body.text;

  const user = db.users[req.user.email];

  const todo = {
    date: new Date(),
    text,
  };

  user.todos.push(todo);

  res.send(todo);
});

router.get('/todos', (req, res) => {
  const user = db.users[req.user.email];

  res.send(user.todos);
});


export default router;
