const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db.js');

const router = express.Router();

router.post('/register', (req, res) => {
   console.log('/reg');
   const { username, password } = req.body;

   // recieve an non-existent username and length8+ password,
   // then save to database as a new user with a hash salt11 encrypted password

   // hash password
   const hashedPwd = bcrypt.hashSync(password, 11);

   // save a new user and a hashed password to the database
   try {
      const insertUser = db.prepare(
         `INSERT INTO users (username, password), VALUES (?, ?)`
      );
      const result = insertUser.run(username, hashedPwd);

      // after user is created, add new todo to it
      const defaultTodo = 'Hello! Add your first todo';
      const insertTodo = db.prepare(
         `INSERT INTO todos (user_id, task) VALUES (?, ?)`
      );
      insertTodo.run(result.lastInsertRowid, defaultTodo);

      // create a jwt token
      const token = jwt.sign(
         { id: result.lastInsertRowid },
         process.env.JWT_SECRET,
         { expiresIn: '24h' }
      );


   } catch (err) {
      console.log(err);
   }

   res.status(201).json({ message: 'OK', payload: req.body });
});

router.post('/login', (req, res) => {
   // receive a username and password, find the user with a corresponding username in a database,
   // then generate a hash salt11 based on password and compare both. only then return jwt token
   const { username, password } = req.body;
   if (!username || !password)
      return res.status(400).json({ message: 'All field are required' });

   // database call fallback by trycatching
   try {
      const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
      const user = getUser.get(username);

      if (!user)
         return res.status(403).json({ message: 'Forbidden' });

      const isAuthValid = bcrypt.compareSync(password, user.password);
      if(!isAuthValid) return res.status(401).json({ message: 'Unauthenticated' });

      // create a jwt token
      const token = jwt.sign(
         { id: user.id },
         process.env.JWT_SECRET,
         { expiresIn: '24h' }
      );      

      return res.status(200).json({token})

   } catch (err) {
      console.log(err);
      res.sendStatus(503);
   }

   res.status(201).json({ message: 'OK', payload: req.body });
});

module.exports = router;
