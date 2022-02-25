const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// TODO ********************************************
router.get("/todos", auth, (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Todo.find({
      user: req.user.id
    })
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/todos", auth, (req, res, next) => {
  if (req.body.action) {
    const newTodo = new Todo({
      action: req.body.action,
      user: req.user.id
    });
    Todo.create(newTodo)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.put("/todos/:id", auth, async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);
  if (todo.user.toString() !== req.user.id) {
    return res.status(401).json({
      msg: 'Not authorized'
    });
  }
  if (req.body.action) {
    Todo.findByIdAndUpdate(req.params.id, {
        action: req.body.action
      })
      .then((data) => res.json('Todo Updated'))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.delete("/todos/:id", auth, async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);
  if (todo.user.toString() !== req.user.id) {
    return res.status(401).json({
      msg: 'Not authorized'
    });
  }

  Todo.findOneAndDelete({
      _id: req.params.id
    })
    .then((data) => res.json('Todo Deleted'))
    .catch(error => {
      res.json({
        error: error,
      })
    }).finally(next);



});


//USERS ********************************************
//SIGN UP
router.post('/users', async (req, res, next) => {
  
    try {
      const {
        name,
        email,
        password
      } = req.body;
      let user = await User.findOne({
        email
      });
      if (user) {
        throw Error ('Email already exists')
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      }, (err, token) => {
        if (err) throw err;
        res.json({
          token
        });
      });

    } catch (err) {
      console.error(err.message);
      res.json({
        error: "Server Error",
      });
    }


});

//AUTH ********************************************
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error')
  }
});


//LOGIN
router.post('/auth', async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;
      let user = await User.findOne({
        email
      });

      if (!user) {
        return res.status(400).json({
          msg: 'Invalid Credentials'
        })
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: 'Invalid Credentials'
        })
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      }, (err, token) => {
        if (err) throw err;
        res.json({
          token
        });
      });


    } catch (err) {
      console.error(err.message);
      res.json({
        error: "Server Error",
      });
    }
  
});

module.exports = router;